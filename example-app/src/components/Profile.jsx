import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem;
  
  border: 1px solid #222;
  border-radius: 10px;
`;

const UserName = styled.h3``;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  font-size: small;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  &:not(:last-child) {
    margin-right: 1rem;
  }
  
  padding: 0.3rem 0.6rem;
  border-radius: 40px;
  background-color: darkslateblue;
  color: white;
`;

const Bio = styled.p`
  font-size: small;
`;

const BioInput = styled.textarea`
  min-height: 100px;
  margin: 1rem 0;
  font-family: sans-serif;
  background-color: inherit;
  color: inherit;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  min-width: 100px;
  border: none;
  outline: none;
  border-radius: 40px;
  background-color: #222;
  color: inherit;
  padding: 0.5rem 1rem;
    
    transition: background-color 0.2s ease-out;
    
    &:hover {
      background-color: #2f2f2f;
    }
`;

const Profile = ({
  profile,
  onProfileEdited,
  config,
}) => {
  const tags = [
    profile.accountType,
    profile.role,
  ];

  const [ isEditingBio, setIsEditingBio ] = useState(false);
  const [ updatedBio, setUpdatedBio ] = useState(profile.bio);

  return (
    <Container>
      <UserName>@ { profile.userName }</UserName>
      {
        config.showTags && (
          <Tags>
            {
              tags.map(
                tag => <Tag key={tag}>{ tag }</Tag>
              )
            }
          </Tags>
        )
      }
      {
        isEditingBio
          ? (
            <BioInput
              value={ updatedBio }
              onChange={
                (event) => setUpdatedBio(event.target.value)
              }
            />
          )
          : (
            <Bio>{ profile.bio }</Bio>
          )
      }
      <Buttons>
        {
          isEditingBio
            ? (
              <>
                <Button
                  type="button"
                  onClick={
                    () => {
                      setIsEditingBio(false);
                      onProfileEdited({
                        ...profile,
                        bio: updatedBio,
                      })
                    }
                  }
                >
                  Save changes
                </Button>
                <Button
                  type="button"
                  onClick={
                    () => {
                      setIsEditingBio(false);
                      setUpdatedBio(profile.bio);
                    }
                  }
                >
                  Cancel
                </Button>
              </>
            )
            : (
              <Button
                type="button"
                onClick={ () => setIsEditingBio(true) }
              >
                Edit bio
              </Button>
            )
        }
      </Buttons>
    </Container>
  );
};

export {
  Profile,
};
