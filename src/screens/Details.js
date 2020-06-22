/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Container, Icon, Card, Image, Dimmer, Table, Loader } from "semantic-ui-react";
import useFetch from "use-http";
import queryString from "query-string";
import localforage from "localforage";
import Plotly from "plotly.js/lib/core";
import createPlotlyComponent from "react-plotly.js/factory";

import { useGlobalState } from "../globalContext";
import get from "../get";

Plotly.register([require("plotly.js/lib/bar")]);

const Plot = createPlotlyComponent(Plotly);

const Details = (props) => {
	const { match: { params: { username } } } = props;
	const [request, response] = useFetch(process.env.REACT_APP_SERVER_URL, { timeout: 600000 });
	const [state, updateState] = useGlobalState();

	React.useEffect(() => {
		let didCancel = false;
		localforage.getItem("user_info").then((info) => {
			if (!didCancel) updateState({ type: "changeUserInfo", userInfo: info });
		});
		return () => didCancel = true;
	}, []);

	React.useEffect(() => {
		if (state.userInfo && !response.data) request.get(`/details/${username}?${queryString.stringify(state.userInfo)}`);
	}, [state.userInfo, username]);

	if (request.loading) {
		return (
			<Dimmer active>
				<Loader size="massive">Fetching User Details</Loader>
			</Dimmer>
		);
	}

	return (
		<Grid divided="vertically" style={{ margin: "2rem" }}>
			<Grid.Row centered columns={1}>
				<Grid.Column>
					<Container style={{ width: "1000px" }}>
						<Card fluid>
							<Image src={get(response.data, "background_image")} wrapped ui={false} />
							<Card.Content>
								<Grid divided="vertically" verticalAlign="middle">
									<Grid.Row columns={2}>
										<Grid.Column width={2} style={{ height: "6rem" }}>
											<Image src={get(response.data, "image")} style={{ height: "100%", borderRadius: "500rem" }} />
										</Grid.Column>
										<Grid.Column floated="left" width={8}>
											<Header as="h1" style={{ display: "inline-block" }}>
												{`@${username}`}
											</Header>
											{get(response.data, "verified", false) && (
												<Icon name="check circle" color="blue" size="large" style={{ verticalAlign: "unset" }} />
											)}
										</Grid.Column>
									</Grid.Row>
								</Grid>
								<Grid divided="vertically" style={{ margin: "2rem" }}>
									<Grid.Row centered columns={2}>
										<Grid.Column floated="left">
											<Table basic="very" collapsing>
												<Table.Body>
													<Table.Row>
														<Table.Cell><Header as="h3">Screen name</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "screen_name")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Display name</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "display_name")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Twitter user ID</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "twitter_user_id")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Description</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "description")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Location</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "location")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">URL</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "url")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Date joined</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "date_joined")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Most recent post</Header></Table.Cell>
														<Table.Cell>
															<Header as="h4" style={{ fontWeight: "normal" }}>
																{get(response.data, "most_recent_post")}
															</Header>
														</Table.Cell>
													</Table.Row>
												</Table.Body>
											</Table>
										</Grid.Column>
										<Grid.Column floated="right">
											<Table basic="very" collapsing>
												<Table.Body>
													<Table.Row>
														<Table.Cell><Header as="h3">Tweets</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "tweets")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Following</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "following")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Followers</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "followers")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Likes</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "likes")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Lists</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "lists")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Tweet language</Header></Table.Cell>
														<Table.Cell><Header as="h4" style={{ fontWeight: "normal" }}>{get(response.data, "tweet_language")}</Header></Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Tweets this week</Header></Table.Cell>
														<Table.Cell>
															<Header as="h4" style={{ fontWeight: "normal" }}>
																{get(response.data, "tweets_this_week")}
															</Header>
														</Table.Cell>
													</Table.Row>
													<Table.Row>
														<Table.Cell><Header as="h3">Retweet ratio</Header></Table.Cell>
														<Table.Cell>
															<Header as="h4" style={{ fontWeight: "normal" }}>
																{`${get(response.data, "retweet_ratio", 0)}%`}
															</Header>
														</Table.Cell>
													</Table.Row>
												</Table.Body>
											</Table>
										</Grid.Column>
									</Grid.Row>
								</Grid>
								<Grid divided="vertically">
									<Grid.Row columns={2}>
										<Grid.Column>
											<Header as="h2">Tweets by day of week</Header>
											<Plot
												data={[
													{
														x: [
															"Mon",
															"Tues",
															"Wed",
															"Thurs",
															"Fri",
															"Sat",
															"Sun",
														],
														y: get(response.data, "tweets_by_day_of_week", []),
														type: "bar",
														mode: "lines",
													},
												]}
												layout={{
													showlegend: false,
													autosize: true,
													xaxis: {
														autorange: true,
														title: "Day",
														showgrid: true,
														zeroline: false,
													},
													yaxis: {
														title: "Tweets",
														showgrid: true,
														zeroline: false,
													},
													margin: { t: 10, l: 40, r: 30, b: 70 },
												}}
												style={{ width: "100%", height: "24rem" }}
												config={{ displayModeBar: false, responsive: true }}
												useResizeHandler
											/>
										</Grid.Column>
										<Grid.Column>
											<Header as="h2">Tweets by hour of day</Header>
											<Plot
												data={[
													{
														x: [
															"12:00 am",
															"01:00 am",
															"02:00 am",
															"03:00 am",
															"04:00 am",
															"05:00 am",
															"06:00 am",
															"07:00 am",
															"08:00 am",
															"09:00 am",
															"10:00 am",
															"11:00 am",
															"12:00 pm",
															"01:00 pm",
															"02:00 pm",
															"03:00 pm",
															"04:00 pm",
															"05:00 pm",
															"06:00 pm",
															"07:00 pm",
															"08:00 pm",
															"09:00 pm",
															"10:00 pm",
															"11:00 pm",
														],
														y: get(response.data, "tweets_by_hour_of_day", []),
														type: "bar",
														mode: "lines",
													},
												]}
												layout={{
													showlegend: false,
													autosize: true,
													xaxis: {
														autorange: true,
														title: "Hour",
														showgrid: true,
														zeroline: false,
														nticks: 5,
													},
													yaxis: {
														title: "Tweets",
														showgrid: true,
														zeroline: false,
													},
													margin: { t: 10, l: 40, r: 30, b: 70 },
												}}
												style={{ width: "100%", height: "24rem" }}
												config={{ displayModeBar: false, responsive: true }}
												useResizeHandler
											/>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Card.Content>
						</Card>
					</Container>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

Details.propTypes = { match: PropTypes.object.isRequired };
export default Details;
