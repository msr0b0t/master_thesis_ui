import React from "react";
import { Divider } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";

import AppHeader from "./AppHeader";
import Auth from "./Auth";
import { Home, Faq, Use, Publications, Datasets, Details } from "./screens";

function App() {
	return (
		<>
			<AppHeader />
			<Divider style={{ marginTop: "0rem" }} />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/faq" component={Faq} />
				<Route path="/use" component={Use} />
				<Route path="/publications" component={Publications} />
				<Route path="/datasets" component={Datasets} />
				<Route path="/auth" component={Auth} />
				<Route path="/details/:username" component={Details} />
			</Switch>
		</>
	);
}

export default App;
