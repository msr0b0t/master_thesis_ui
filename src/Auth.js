
import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import useFetch from "use-http";
import localForage from "localforage";

const Auth = (props) => {
	const [allDone, setAllDone] = React.useState(false);
	const [request] = useFetch(process.env.REACT_APP_SERVER_URL, { timeout: 600000 });

	const { location } = props;

	React.useEffect(() => {
		let didCancel = false;
		const { oauth_token, oauth_verifier } = queryString.parse(location.search);
		localForage.getItem("oauth_token_secret").then((oauth_token_secret) => {
			if (oauth_token_secret && !didCancel) {
				request.post("/req2acc", { oauth_token, oauth_token_secret, oauth_verifier })
					.then((results) => {
						if (results.ok && !didCancel) {
							Promise.all([
								localForage.setItem("user_info", {
									oauth_token: results.oauth_token,
									oauth_token_secret: results.oauth_token_secret,
									user_id: results.user_id,
									screen_name: results.screen_name,
								}),
								localForage.removeItem("oauth_token_secret"),
							]).then(() => setAllDone(true)).catch((error) => { console.error(error); setAllDone(true); });
						}
					})
					.catch((error) => { console.error(error); setAllDone(true); });
			}
		});
		return () => { didCancel = true; };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);


	return (allDone ? <Redirect to="/" /> : (
		<Dimmer active>
			<Loader indeterminate>Preparing Files</Loader>
		</Dimmer>
	));
};

Auth.propTypes = { location: PropTypes.object.isRequired };
Auth.whyDidYouRender = true;

export default Auth;
