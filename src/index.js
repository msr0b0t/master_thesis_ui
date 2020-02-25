import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./globalContext";

const initialState = { userInfo: null };
const reducer = (state, action) => {
	if (action.type === "changeUserInfo") {
		const { userInfo } = action;
		return { ...state, userInfo };
	}
	return state;
};

ReactDOM.render(
	<Router>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</Router>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
