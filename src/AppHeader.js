import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import localforage from "localforage";
import useFetch from "use-http";

import { useGlobalState } from "./globalContext";

const AppHeader = (props) => {
	const { location: { pathname } } = props;
	const [request] = useFetch(process.env.REACT_APP_SERVER_URL, { timeout: 600000 });
	const [state, updateState] = useGlobalState();

	React.useEffect(() => {
		let didCancel = false;
		localforage.getItem("user_info").then((info) => {
			if (!didCancel) updateState({ type: "changeUserInfo", userInfo: info });
		});
		return () => didCancel = true;
	});

	return (
		<Menu text size="huge" color="teal" style={{ margin: "unset" }}>
			<Menu.Item
				as={Link}
				to="/"
				style={{ marginLeft: "5rem", fontWeight: "bold" }}
				position="left"
				name="home"
				active={pathname === "/"}
			>
				{"Bot Detective"}
			</Menu.Item>
			<Menu.Item
				as={Link}
				to="/faq"
				name="faq"
				active={pathname === "/faq"}
				style={{ fontWeight: "bold" }}
			>
				{"FAQ"}
			</Menu.Item>
			<Menu.Item
				as={Link}
				to="/use"
				name="use"
				active={pathname === "/use"}
				style={{ fontWeight: "bold" }}
			>
				{"API"}
			</Menu.Item>
			<Menu.Item
				as={Link}
				to="/publications"
				name="publications"
				active={pathname === "/publications"}
				style={{ fontWeight: "bold" }}
			>
				{"Publications"}
			</Menu.Item>
			<Menu.Item
				as={Link}
				to="/datasets"
				name="datasets"
				active={pathname === "/datasets"}
				style={{ fontWeight: "bold" }}
			>
				{"Bot Datasets"}
			</Menu.Item>
			<Menu.Item
				name="login"
				active
				onClick={() => request.get("/req4req")
					.then(({ oauth_token, oauth_token_secret } = {}) => {
						localforage.setItem("oauth_token_secret", oauth_token_secret)
							.then(() => {
								if (oauth_token) {
									window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;
								} else {
									throw new Error("oauth_token is undefined!");
								}
							})
							.catch(console.error);
					})}
				color="blue"
				style={{ fontWeight: "bold", marginRight: "5rem", ...(state.userInfo ? { display: "none" } : {}) }}
			>
				<Icon name="twitter" />
				{"Login"}
			</Menu.Item>
			<Menu.Item
				name="logout"
				active
				onClick={() => {
					localforage.clear()
						.then(() => updateState({ type: "changeUserInfo", userInfo: null }))
						.catch(console.error);
				}}
				color="blue"
				style={{ fontWeight: "bold", marginRight: "5rem", ...(!state.userInfo ? { display: "none" } : {}) }}
			>
				<Icon name="twitter" />
				{"Logout"}
			</Menu.Item>
		</Menu>
	);
};

AppHeader.propTypes = {
	location: PropTypes.object.isRequired,
};

export default withRouter(AppHeader);
