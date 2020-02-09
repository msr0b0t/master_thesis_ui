/* eslint-disable max-len */
import React, { useState } from "react";
import { Form, Header, Grid, Progress, Button, Modal, Dropdown, Checkbox, Icon, TextArea } from "semantic-ui-react";
import useFetch from "use-http";

import ReasonList from "./ReasonList";

function App() {
	const [username, setUsername] = useState("");
	const [request, response] = useFetch(process.env.REACT_APP_SERVER_URL);

	const [dropdownOption, setDropdownOption] = useState(null);
	const [likertOption, setLikertOption] = useState(null);
	const [text, setText] = useState("");
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
			if (response.data.pos) response.data.pos.forEach((e) => tmp.set(e, true));
			if (response.data.neg) response.data.neg.forEach((e) => tmp.set(e, true));
			setDropdownOption(null);
			setLikertOption(null);
			setText("");
			setReasons(tmp);
			setUsername(null);
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
			{(response.data && (response.data.pos || response.data.neg)) && (
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
										<h4>{`I believe the account @${username} is:`}</h4>
										<Dropdown
											placeholder="Choose One"
											fluid
											selection
											options={options}
											value={dropdownOption}
											onChange={(e, { value }) => setDropdownOption(value)}
										/>
										<h4>{`The provided explanations helped me understand why the account @${username} has been characterized as a bot or not-bot:`}</h4>
										<Form>
											<Form.Group inline style={{ textAlign: "center" }}>
												<Form.Radio
													label="Strongly Disagree"
													name="radioGroup"
													value="5"
													checked={likertOption === "5"}
													onChange={(e, { value }) => setLikertOption(value)}
												/>
												<Form.Radio
													label="Disagree"
													name="radioGroup"
													value="4"
													checked={likertOption === "4"}
													onChange={(e, { value }) => setLikertOption(value)}
												/>
												<Form.Radio
													label="Neutral"
													name="radioGroup"
													value="3"
													checked={likertOption === "3"}
													onChange={(e, { value }) => setLikertOption(value)}
												/>
												<Form.Radio
													label="Agree"
													name="radioGroup"
													value="2"
													checked={likertOption === "2"}
													onChange={(e, { value }) => setLikertOption(value)}
												/>
												<Form.Radio
													label="Strongly Agree"
													name="radioGroup"
													value="1"
													checked={likertOption === "1"}
													onChange={(e, { value }) => setLikertOption(value)}
												/>
											</Form.Group>
										</Form>
										<h4>I agree with:</h4>
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
										<Form style={{ marginTop: "2rem" }}>
											<TextArea placeholder="Send us your suggestions" value={text} onChange={(e, { value }) => setText(value)} />
										</Form>
									</Modal.Description>
								</Modal.Content>
								<Button
									color="teal"
									floated="right"
									style={{ margin: "2%" }}
									onClick={() => {
										setIsModalOpen(false);
										const userSelection = options.find((el) => el.value === dropdownOption) && options.find((el) => el.value === dropdownOption).text;
										request.post("/feedback", { user_selection: userSelection, reasons: [...reasons], analysis_id: response.data.analysis_id, likert: likertOption, suggestions: text });
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
