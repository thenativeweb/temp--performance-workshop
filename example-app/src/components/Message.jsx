import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: #222;
	border-radius: 10px;
	padding: 1rem;
`;

const MessageAuthor = styled.div`
	font-weight: bold;
`;

const MessageText = styled.p`
	border-left: 1px solid #444;
	padding-left: 1rem;
	margin-left: .5rem;
`;

const Message = ({ message }) => {
	return (
		<MessageContainer>
			<MessageAuthor>@ { message.author }</MessageAuthor>
			<MessageText>{ message.text }</MessageText>
		</MessageContainer>
	)
};

export {
	Message
};
