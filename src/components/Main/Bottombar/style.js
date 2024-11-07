import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Layer = styled.div`
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 9;
  border-top: 1px solid #ddd;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #ddd;

  &.active {
    color: #6263fb;
    path {
      stroke: #6263fb;
    }
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
