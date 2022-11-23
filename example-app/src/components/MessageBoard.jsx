import React, { useMemo } from 'react';
import { sortMessages } from '../utils/sortMessages';
import styled from 'styled-components';
import { Message } from './Message';

const Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: stretch;
	padding: 1rem;
`;

const NewestMessage = styled.div`
	margin-bottom: 2rem;
`;

const Messages = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: stretch;

	& > * {
		margin-bottom: 1rem;
	}
`;

const Headline = styled.h2`
	text-align: left;
`;

const MessageBoard = ({
	messages,
	config,
}) => {
	//const startTime = Date.now();

	//const logElapsedTime = () => {
	//	console.log(Date.now() - startTime);
	//}

	//const sortedMessages = sortMessages(messages);

	// logElapsedTime();

	const hasMessages = useMemo(
		() => messages.length > 0,
		[ messages ],
	);
	const newestMessage = useMemo(
		() => messages.at(0),
		[ messages ],
	);
	const olderMessages = useMemo(
		() => messages.slice(1),
		[ messages ],
	);

	if (!hasMessages) {
		return <p>There are no messages yet :/</p>
	}

	if (!config.highlightNewestMessage) {
		return (
			<Container>
				<Headline>Messages</Headline>
				<Messages>
					{
						[newestMessage, ...olderMessages].map(
							(message) => (
								<Message
									key={message.author + message.text}
									message={message}
								/>
							)
						)
					}
				</Messages>
			</Container>
		);
	}

	return (
		<Container>
			<Headline>Newest message</Headline>
			<NewestMessage>
				<Message message={newestMessage} />
			</NewestMessage>
			<Headline>Older messages</Headline>
			<Messages>
				{
					olderMessages.map(
						(message) => (
							<Message
								key={message.author + message.text}
								message={message}
							/>
						)
					)
				}
			</Messages>
		</Container>
	);
};

const MemoizedMessageBoard = React.memo(MessageBoard);

export {
	MemoizedMessageBoard as MessageBoard,
};
