/* eslint-disable react/prop-types */
import React from "react";

const StateContext = React.createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={React.useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);
export const useGlobalState = () => React.useContext(StateContext);
export default StateContext;
