/* eslint-disable max-len */
import React from "react";
import { Form, Header, Grid, Progress, Button, Modal, Dropdown, Checkbox, Icon, TextArea, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useFetch from "use-http";
import localforage from "localforage";
import queryString from "query-string";

import { useGlobalState } from "../globalContext";

import ReasonList from "../ReasonList";

const Home = () => {
	const [username, setUsername] = React.useState("");
	const [state, updateState] = useGlobalState();
	const [request, response] = useFetch(process.env.REACT_APP_SERVER_URL, { timeout: 600000 });

	const [dropdownOption, setDropdownOption] = React.useState(null);
	const [likertOption, setLikertOption] = React.useState(null);
	const [text, setText] = React.useState("");
	const [reasons, setReasons] = React.useState(new Map());
	const [isModalOpen, setIsModalOpen] = React.useState(false);

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
		}
	}, [response.data]);

	React.useEffect(() => {
		let didCancel = false;
		localforage.getItem("user_info").then((info) => {
			if (!didCancel) updateState({ type: "changeUserInfo", userInfo: info });
		});
		return () => didCancel = true;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Grid divided="vertically" style={{ margin: "2rem" }}>
			<Grid.Row centered columns={1}>
				<Grid.Column>
					<Form
						loading={request.loading}
						onSubmit={() => request.get(`/predict/${username.startsWith("@") ? username.slice(1) : username}?${
							queryString.stringify(state.userInfo)}`)}
						style={{ alignItems: "center", display: "flex", flexDirection: "column" }}
					>
						<img src={require("../bot_detective.svg")} alt="logo" />
						<Header as="h1">Bot Detective</Header>
						<Container style={{ width: "1000px", backgroundColor: "#fbfeff", padding: "2rem", border: "1px solid #d6eefd", borderRadius: "0.3rem" }}>
									Bot Detective checks the activity of a Twitter account and assigns it a score based on the likelihood of the account being a bot. Higher scores are more bot-like. Explainable hints are detailed per Twitter account with emphasis on the most relevant.
							<br />
									Use of this service requires Twitter authentication and permissions. (
							<a href="/faq#q4">Why?</a>
							)
							<br />
									If something is not working or you have questions, please contact us only after reading the
							<a href="/faq"> FAQ</a>
									.
							<br />
									Bot Detective is an ongoing project of the
							<a href="https://datalab.csd.auth.gr/"> Datalab </a>
									at Aristotle University of Thessaloniki, Greece.
							<br />
									Team members: Maria Kouvela - Ilias Dimitriadis - Athena Vakali
							<br />
						</Container>
						<Header as="h2">Check if a Twitter account is a bot</Header>
						{state.userInfo ? (
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
						) : (
							<Button
								color="twitter"
								onClick={() => request.get("/req4req")
									.then(({ oauth_token, oauth_token_secret } = {}) => {
										localforage.setItem("oauth_token_secret", oauth_token_secret)
											.then(() => {
												if (oauth_token) {
													window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;
												} else {
													throw new Error("oauth_token is undefined!");
												}
											})
											.catch(console.error);
									})}
							>
								<Icon name="twitter" />
								{"Login with Twitter"}
							</Button>
						)}
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
					<Grid.Row centered columns={1}>
						<Grid.Column>
							<Button
								as={"a"}
								href={`https://twitter.com/intent/user?screen_name=${username}`}
								target="_blank"
								animated="fade"
								color="purple"
								style={{ marginLeft: "34.5%", width: "7.3rem" }}
							>
								<Button.Content visible>{"Profile"}</Button.Content>
								<Button.Content hidden><Icon name="user" /></Button.Content>
							</Button>
							<Button
								as={"a"}
								href={`https://twitter.com/intent/tweet?text=I just checked if @${username} is a bot. Check it yourself at https://bot-detective.csd.auth.gr!`}
								target="_blank"
								animated="fade"
								color="purple"
								style={{ width: "7.3rem" }}
							>
								<Button.Content visible>{"Tweet"}</Button.Content>
								<Button.Content hidden><Icon name="twitter" /></Button.Content>
							</Button>
							<Button
								as={Link}
								to={`/details/${username}`}
								animated="fade"
								color="purple"
								style={{ width: "7.3rem" }}
							>
								<Button.Content visible>{"Details"}</Button.Content>
								<Button.Content hidden><Icon name="chart bar" /></Button.Content>
							</Button>
							<Button animated="fade" color="purple" style={{ width: "7.3rem" }} onClick={() => setIsModalOpen(true)}>
								<Button.Content visible>{"Feedback"}</Button.Content>
								<Button.Content hidden><Icon name="write" /></Button.Content>
							</Button>
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
							<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
										request.post("/feedback", {
											user_selection: userSelection,
											reasons: [...reasons],
											analysis_id: response.data.analysis_id,
											likert: likertOption,
											suggestions: text });
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
};

export default Home;
