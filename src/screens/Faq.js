/* eslint-disable max-len */
import React from "react";
import { Grid, Header, Container, List, Icon } from "semantic-ui-react";

const Faq = () => (
	<Grid divided="vertically" style={{ margin: "2rem" }}>
		<Grid.Row centered columns={1}>
			<Grid.Column>
				<Container style={{ width: "1000px" }}>
					<Header as="h1">FAQ</Header>
					<List bulleted>
						<List.Item href="#q1">What is a Twitter bot?</List.Item>
						<List.Item href="#q2">What is Bot Detective?</List.Item>
						<List.Item href="#q3">Who is behind Bot Detective and how can I contact them?</List.Item>
						<List.Item href="#q4">Why do I have to login to Twitter and grant Bot Detective these permissions?</List.Item>
						<List.Item href="#q5">How should I interpret a bot score?</List.Item>
						<List.Item href="#q6">How do the explanations list help me?</List.Item>
						<List.Item href="#q7">How can I leave feedback?</List.Item>
						<List.Item href="#q8">Why do the results change?</List.Item>
					</List>
					<Header as="h2" id="q1">What is a Twitter bot?</Header>
					<p style={{ textAlign: "justify" }}>
						{"According to "}
						<a href="https://en.wikipedia.org/wiki/Twitter_bot">Wikipedia</a>
						{" a Twitter bot is a type of bot software that controls a Twitter account via the Twitter API. The bot software may autonomously perform actions such as tweeting, re-tweeting, liking, following, unfollowing, or direct messaging other accounts. The automation of Twitter accounts is governed by a set of automation rules that outline proper and improper uses of automation. Proper usage includes broadcasting helpful information, automatically generating interesting or creative content, and automatically replying to users via direct message. Improper usage includes circumventing API rate limits, violating user privacy, spamming, and sockpuppeting."}
					</p>
					<Header as="h2" id="q2">What is Bot Detective?</Header>
					<p style={{ textAlign: "justify" }}>
						{"Bot Detective is a Web service that was developed in the context of the thesis of Maria Kouvela, in fulfillment of the requirements for the degree of Master of Data & Web Science, under the supervision of PhD Candidate Ilias Dimitriadis and Professor Athena Vakali. Bot Detective takes into account both the efficient detection of bot users and the interpretability of the results as well. Our main contributions are summarized as follows:"}
					</p>
					<p style={{ textAlign: "justify" }}>
						{"i) We propose a novel explainable bot-detection approach, which, to the best of authors’ knowledge, is the first one to offer interpretable, responsible, and AI driven bot identification in Twitter. Bot Detective uses a Random Forest classifier and follows an explainable AI state of the art method to provide justifications of high granularity, since explanations are offered for all relevant features that have contributed in the Bot Detective's scoring."}
					</p>
					<p style={{ textAlign: "justify" }}>
						{"ii) We provide a publicly available bot detection Web service which integrates an explainable machine learning framework along with users feedback functionality under an effective crowdsourcing mechanism. This service covers the growing demand for bot detection services and it offers extended crowdsourcing functionalities and XAI capabilities which advance existing state of the art tools, such as the "}
						<a href="https://botometer.iuni.iu.edu/">Botometer</a>
						{"."}
					</p>
					<p style={{ textAlign: "justify" }}>
						{"iii) We share a new labelled dataset, annotated by exploiting Twitter’s rules and existing tools, which we use to build the proposed service. The dataset consists of thousands of tweets collected using Twitter’s official API and labelled with the use of Botometer and by taking into account that many of the authors of the posting accounts were, at a later time, deactivated by Twitter."}
					</p>
					<p style={{ textAlign: "justify" }}>
						{"Although several AI driven bot detection methods have been implemented, the justification of bot classification and charaterization remains quite opaque and AI decisions lack in ethical responsibility. Most of these approaches operate with AI black-boxed algorithms and their efficiency is often questionable."}
					</p>
					<Header as="h2" id="q3">Who is behind Bot Detective and how can I contact them?</Header>
					<p style={{ textAlign: "justify" }}>
						{"Bot Detective is an ongoing project of the"}
						<a href="https://datalab.csd.auth.gr/"> Datalab </a>
						{"at Aristotle University of Thessaloniki, Greece. "}
						<Icon name="envelope outline" />
						{"   datalab@csd.auth.gr"}
						<br />
						{"Team members: Maria Kouvela "}
						<Icon name="envelope outline" />
						{"   mvkouvela@csd.auth.gr , Ilias Dimitriadis "}
						<Icon name="envelope outline" />
						{"   idimitriad@csd.auth.gr , Athena Vakali "}
						<Icon name="envelope outline" />
						{"   avakali@csd.auth.gr"}
					</p>
					<Header as="h2" id="q4">Why do I have to login to Twitter and grant Bot Detective these permissions?</Header>
					<p style={{ textAlign: "justify" }}>
						{"Every time you subject an account on Bot Detective, the server needs to make requests to the Twitter API in order to collect the necessary information and for the model to make the predictions requested. Getting information from the Twitter API requires some special tokens, which are available to logged in Twitter users only. By logging in and granting Bot Detective permissions to access public data you provide your account's tokens to use in our service. The API requests are read-only, they make no changes to your account. Your private tokens are never uploaded to our server and thus we have no way of using them after you leave the website."}
					</p>
					<Header as="h2" id="q5">How should I interpret a bot score?</Header>
					<p style={{ textAlign: "justify" }}>
						{"Bot Detective produces a score on a 0-5 scale, based on the likelihood of an account being a bot. Higher scores are more bot-like. A score in the middle of the scale means that our Machine Learning model is uncertain about the classification."}
					</p>
					<Header as="h2" id="q6">How do the justifications help me?</Header>
					<p style={{ textAlign: "justify" }}>
						{"Our service places emphasis on delivering explainable and comprehensive bot detection characterizations based on the principle that providing meaningful explanations is not just a matter of understanding or gaining user’s trust, but rather it is a matter of social responsibility, which is also imposed by EU laws as well. The goal of the explainability module is to convert the predictions of the classifier into justifications understandable by humans."}
					</p>
					<Header as="h2" id="q7">How can I leave feedback?</Header>
					<p style={{ textAlign: "justify" }}>
						{"Every time you subject a Twitter account on Bot Detective, a feedback button is presented on the screen along with Bot Detective's score and justification results. By providing us with feedback you help us improve our model. The information you provide is anonymous and no personal data is collected."}
					</p>
					<Header as="h2" id="q8">Why do the results change?</Header>
					<p style={{ textAlign: "justify" }}>
						{"Since the content and posting activity of accounts in Twitter change over time, the results that Bot Detective outputs will also change. The server that runs in the background collects the 20 most recent tweets' information of an inputed account every time, that then the Machine Learning model uses to make its predictions."}
					</p>
				</Container>
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Faq;
