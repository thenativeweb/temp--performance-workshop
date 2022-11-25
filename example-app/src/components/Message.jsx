import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: #222;
  border-radius: 10px;
  padding: 1rem;
`;

const Author = styled.div`
  font-weight: bold;
`;

const Text = styled.p`
  border-left: 1px solid #444;
  padding-left: 1rem;
  margin-left: .5rem;
`;

const Message = ({ message }) => {
  return (
    <Container>
      <Author>@ { message.author }</Author>
      <Text>{ message.text }</Text>
    </Container>
  )
};

export {
  Message,
};
