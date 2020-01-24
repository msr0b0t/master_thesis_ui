import React, { useState } from "react";
import { Form, Header, Grid, Progress, Button, Modal, Dropdown, Checkbox, Icon } from "semantic-ui-react";
import useFetch from "use-http";

import ReasonList from "./ReasonList";

function App() {
	const [username, setUsername] = useState("");
	const [request, response] = useFetch("https://bot-detective.herokuapp.com");
	// const [request, response] = useFetch("http://localhost:5000");

	const [dropdownOption, setDropdownOption] = useState(null);
	const [reasons, setReasons] = useState(new Map());
	const [isModalOpen, setIsModalOpen] = useState(false);

	const options = [
		{ key: 1, text: "Human", value: 1 },
		{ key: 2, text: "Bot", value: 2 },
		{ key: 3, text: "Human Using Automation", value: 3 },
		{ key: 4, text: "Organization", value: 4 },
	];

	React.useEffect(() => {
		if (response.data) {
			const tmp = new Map();
			response.data.pos.forEach((e) => tmp.set(e, true));
			response.data.neg.forEach((e) => tmp.set(e, true));
			setDropdownOption(null);
			setReasons(tmp);
		}
	}, [response.data]);

	return (
		<Grid divided="vertically" style={{ margin: "7rem" }}>
			<Grid.Row centered columns={1}>
				<Grid.Column>
					<Form
						loading={request.loading}
						onSubmit={() => request.get(`/predict/${username.startsWith("@") ? username.slice(1) : username}`)}
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
								<span style={{ color: "teal" }}>{response.data.avg_user_score}</span>
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
							<Modal
								open={isModalOpen}
								onClose={() => setIsModalOpen(false)}
								trigger={(
									<Button
										color="purple"
										floated="right"
										style={{ marginTop: "11%" }}
										onClick={() => setIsModalOpen(true)}
									>
										{"Feedback"}
									</Button>
								)}
							>
								<Modal.Header>Help us improve</Modal.Header>
								<Modal.Content>
									<Modal.Description>
										<h4>{`I believe the account ${username} is:`}</h4>
										<Dropdown
											placeholder="Choose One"
											fluid
											selection
											options={options}
											value={dropdownOption}
											onChange={(e, { value }) => setDropdownOption(value)}
										/>
										<h4>I aggre with:</h4>
										{[...reasons.entries()].map(([reason, isChecked], ind) => (
											<Checkbox
												checked={isChecked}
												label={reason}
												key={ind}
												onChange={() => {
													const tmp = new Map(reasons);
													tmp.set(reason, !tmp.get(reason));
													setReasons(tmp);
												}}
											/>
										))}
									</Modal.Description>
								</Modal.Content>
								<Button
									color="teal"
									floated="right"
									style={{ margin: "2%" }}
									onClick={() => {
										setIsModalOpen(false);
										const userSelection = options.find((el) => el.value === dropdownOption) && options.find((el) => el.value === dropdownOption).text;
										request.post("/feedback", { user_selection: userSelection, reasons: [...reasons], analysis_id: response.data.analysis_id });
									}}
								>
									<Icon name="checkmark" />
									{"  Send"}
								</Button>
							</Modal>
						</Grid.Column>
					</Grid.Row>
				</>
			)}
		</Grid>
	);
}

export default App;
