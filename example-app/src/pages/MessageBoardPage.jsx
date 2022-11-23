import { Composer } from '../components/Composer';
import { Logo } from '../components/Logo';
import { MessageBoard } from '../components/MessageBoard';
import { Profile } from '../components/Profile';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Layout = styled.div`
	width: 100vw;
	height: 100vh;
	margin: 0;

	display: grid;
	grid-template-columns: auto 40%;
	grid-template-rows: 80px auto;
`;

const Nav = styled.div`
	grid-column: 1 / span 2;
	grid-row: 1;
	border-bottom: 3px solid #222;
	padding: 0 1rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const Content = styled.div`
	grid-column: 1;
	grid-row: 2;
`;

const Sidebar = styled.div`
	grid-column: 2;
	grid-row: 2;

	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 1rem;

	border-left: 1px solid black;
`;

const Headline = styled.h2`
	margin-bottom: 0;
`;

const Cards = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 0;

	& > :not(:first-child) {
		margin-top: 1rem;
	}
`;

const MessageBoardPage = () => {
	const [ profile, setProfile ] = useState({
		userName: "Margaret Hamilton",
		accountType: "Ultimate",
		bio: "American computer scientist, systems engineer, and business owner. Ex director of the Software Engineering Division of the MIT Instrumentation Laboratory.",
		role: "Supervisor"
	});

	const [ messages, setMessages ] = useState([]);

	useEffect(
		() => {
			fetch('http://localhost:4000/messages').
			then(
				response => response.json()
			).
			then(
				data => setMessages(data)
			);
		},
		[]
	);

	const handleMessageSent = ({ profile, text }) => {
		const payload = {
			author: profile.userName,
			text,
		};

		fetch('http://localhost:4000/messages', {
			method: 'post',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			}
		}).
		then(
			() => fetch('http://localhost:4000/messages')
		).
		then(
			response => response.json()
		).
		then(
			data => setMessages(data)
		);
	};

	const config = {
		showTags: true,
		highlightNewestMessage: true,
	};

	return (
		<Layout>
			<Nav>
				<Logo />
				<Headline>Awesome Work Message Board</Headline>
			</Nav>
			<Content>
				<MessageBoard
					config={config}
					messages={messages}
				/>
			</Content>
			<Sidebar>
				<h2>Your Profile</h2>
				<Cards>
					<Profile
						config={config}
						profile={profile}
						onProfileEdited={
							(updatedProfile) => setProfile(updatedProfile)
						}
					/>
					<Composer
						profile={ profile }
						onMessageSent={ handleMessageSent }
					/>
				</Cards>
			</Sidebar>
		</Layout>
	)
};

export {
	MessageBoardPage,
};
