/* eslint-disable max-len */
import React from "react";
import { Grid, Header, Container, Card } from "semantic-ui-react";

const Publications = () => (
	<Grid divided="vertically" style={{ margin: "2rem" }}>
		<Grid.Row centered columns={1}>
			<Grid.Column>
				<Container style={{ width: "1000px" }}>
					<Header as="h1">Publications</Header>
					<Card fluid style={{ marginTop: "3rem" }}>
						<Card.Content>
							<Card.Header><a href="https://ieeexplore.ieee.org/document/8609623">LOCAST: Optimal Location Casting by Crowdsourcing and Open Data Integration</a></Card.Header>
							<Card.Description>
								Konstantinos Platis, Ilias Dimitriadis, Athena Vakali
								<br />
								WI 2018
							</Card.Description>
						</Card.Content>
					</Card>
					<Card fluid>
						<Card.Content>
							<Card.Header><a href="https://ieeexplore.ieee.org/document/8421373">Demo: Diligent — An OSN Data Integration System Based on Reactive Microservices</a></Card.Header>
							<Card.Description>
							Alexandros Tsilingiris, Ilias Dimitriadis, Athena Vakali, Georgios Andreadis
								<br />
								SMARTCOMP 2018
							</Card.Description>
						</Card.Content>
					</Card>
					<Card fluid>
						<Card.Content>
							<Card.Header><a href="https://ieeexplore.ieee.org/document/8609623">A crowdsourcing approach to advance collective awareness and social good practices</a></Card.Header>
							<Card.Description>
								Ilias Dimitriadis, Vasileios G. Psomiadis, Athena Vakali
								<br />
								WI (Companion) 2019
							</Card.Description>
						</Card.Content>
					</Card>
				</Container>
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Publications;
