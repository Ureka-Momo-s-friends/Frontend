import React from "react";
import styled from "@emotion/styled";
import Bottombar from "components/Main/Bottombar";
import ProfileHeader from "components/Profile/ProfileHeader/Header";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
`;

function ProfileLayout({ children }) {
  return (
    <Wrapper>
      <ProfileHeader />
      {children}
      <Bottombar />
    </Wrapper>
  );
}

export default ProfileLayout;
