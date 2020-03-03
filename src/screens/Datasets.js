import React from "react";
import { Grid, Header, Container, Button, Card, Icon } from "semantic-ui-react";

const Datasets = () => (
	<Grid divided="vertically" style={{ margin: "2rem" }}>
		<Grid.Row centered columns={1}>
			<Grid.Column>
				<Container style={{ width: "1000px" }}>
					<Header as="h1">Bot datasets</Header>
					<Card fluid style={{ marginTop: "3rem" }}>
						<Card.Content>
							<Card.Description>
								<p><b>{"bot-detective-2020"}</b></p>
								<p>
									<b>{"Description: "}</b>
									{"Tweets and their authors annotated using "}
									<a href="https://botometer.iuni.iu.edu/">
										{" "}
										{"Botometer"}
									</a>
									{"."}
								</p>
								<Button
									as="a"
									color="teal"
									download="bot-detective-2020"
									href="/downloads/dataset.zip"
								>
									{"Download 3.1GB"}
									&emsp;
									<Icon name="download" />
								</Button>
							</Card.Description>
						</Card.Content>
					</Card>
				</Container>
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Datasets;
