import React from "react";
import { Grid, Header, Container } from "semantic-ui-react";

const Datasets = () => (
	<Grid divided="vertically" style={{ margin: "2rem" }}>
		<Grid.Row centered columns={1}>
			<Grid.Column>
				<Container style={{ width: "1000px" }}>
					<Header as="h1">
						{"Sorry, we are still working on this. "}
						<span role="img" aria-label="mary">👷‍♀️</span>
					</Header>
				</Container>
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Datasets;
