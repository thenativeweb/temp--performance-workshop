import { sortMessages } from '../utils/sortMessages';
import { Message } from './Message';
import styled from 'styled-components';

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
  const sortedMessages = sortMessages(messages);
  const hasMessages = sortedMessages.length > 0;
  const newestMessage = sortedMessages.at(0);
  const olderMessages = sortedMessages.slice(1);

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
              (message) => <Message key={JSON.stringify(message)} message={message} config={config} />
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
            (message) => <Message key={JSON.stringify(message)} message={message} />
          )
        }
      </Messages>
    </Container>
  );
};

export {
  MessageBoard,
};
export default MessageBoard;
