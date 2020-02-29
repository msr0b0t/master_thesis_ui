/* eslint-disable max-len */
import React from "react";
import { Grid, Header, Container, Card } from "semantic-ui-react";

const Use = () => (
	<Grid divided="vertically" style={{ margin: "2rem" }}>
		<Grid.Row centered columns={1}>
			<Grid.Column>
				<Container style={{ width: "1000px" }}>
					<Header as="h1">Need to use our API</Header>
					<Card fluid>
						<Card.Content>
							<Card.Description>
								{"Send a GET request to \"https://bot-detective.csd.auth.gr/api/predict/<the_username>?oauth_token=<your_oauth_token>&oauth_token_secret=<your_oauth_token_secret>\" with the username of your choice and the tokens of your Twitter account accordingly."}
							</Card.Description>
						</Card.Content>
					</Card>
				</Container>
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Use;
