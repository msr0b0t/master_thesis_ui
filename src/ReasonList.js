import React from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";

const ReasonList = ({ list, color }) => (
	<Card.Group>
		{list.map((el, ind) => (<Card key={ind} fluid color={color} header={el} />))}
	</Card.Group>

);

ReasonList.propTypes = { list: PropTypes.array, color: PropTypes.string };
ReasonList.defaultProps = { list: [], color: "teal" };

export default ReasonList;
