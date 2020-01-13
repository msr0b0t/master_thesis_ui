import React from "react";
import { Form, Header, Grid, Progress } from "semantic-ui-react";
import useFetch from "use-http";

import ReasonList from "./ReasonList";

function App() {
	const [username, setUsername] = React.useState("");
	const [request, response] = useFetch(`https://bot-detective.herokuapp.com/predict/${username.startsWith("@") ? username.slice(1) : username}`);

	console.log(response.data);

	return (
		<Grid divided="vertically" style={{ margin: "7rem" }}>
			<Grid.Row centered columns={1}>
				<Grid.Column>
					<Form
						loading={request.loading}
						onSubmit={() => request.get()}
						style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
					>
						<img src={require("./bot_detective.svg")} alt="logo" />
						<Header as="h1">Bot Detective</Header>
						<Header as="h2">Check if a Twitter account is a bot</Header>
						<Form.Input
							action={{
								color: "teal",
								labelPosition: "right",
								icon: "search",
								content: "Check account",
								type: "submit",
							}}
							name="username"
							placeholder="@username"
							value={username}
							onChange={(e, { value }) => setUsername(value)}
						/>
					</Form>
				</Grid.Column>
			</Grid.Row>
			{response.data && (
				<>
					<Grid.Row centered columns={1}>
						<Grid.Column>
							<Header as="h1" style={{ textAlign: "center" }}>
								{"Score: "}
								<span centered style={{ color: "teal" }}>{response.data.avg_user_score}</span>
								<br />
								<Progress style={{ width: "50%", marginLeft: "25%" }} value={response.data.avg_user_score} total="5" progress="ratio" />
							</Header>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row centered columns={2}>
						<Grid.Column>
							<Header as="h2" color="purple" style={{ textAlign: "center" }}>Why bot?</Header>
							<ReasonList list={response.data.pos} color="purple" />
						</Grid.Column>
						<Grid.Column>
							<Header as="h2" color="teal" style={{ textAlign: "center" }}>Why NOT bot?</Header>
							<ReasonList list={response.data.neg} color="teal" />
						</Grid.Column>
					</Grid.Row>
				</>
			)}
		</Grid>
	);
}

export default App;
