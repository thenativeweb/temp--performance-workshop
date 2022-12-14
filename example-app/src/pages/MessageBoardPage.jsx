import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Logo } from '../components/Logo';
import { MessageBoard } from '../components/MessageBoard';
import { Profile } from '../components/Profile';

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

const MessageBoardPage = () => {
  const [ profile, setProfile ] = useState({
    userName: "Margaret Hamilton",
    accountType: "Ultimate",
    bio: "American computer scientist, systems engineer, and business owner. Ex director of the Software Engineering Division of the MIT Instrumentation Laboratory.",
    role: "Supervisor"
  });

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
          messages={[
            {
              author: "Grace Hopper",
              text: "Found a bug",
            },
            {
              author: "Grace Hopper",
              text: "Optimized the COBOL libraries",
            },
            {
              author: "Adele Goldberg",
              text: "Fixed a compiler bug",
            },
          ]}
        />
      </Content>
      <Sidebar>
        <h2>Your Profile</h2>
        <Profile
          config={config}
          profile={profile}
          onProfileEdited={
            (updatedProfile) => setProfile(updatedProfile)
          }
        />
      </Sidebar>
    </Layout>
  )
};

export {
  MessageBoardPage,
};
