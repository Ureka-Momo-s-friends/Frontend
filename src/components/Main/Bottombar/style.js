import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Layer = styled.div`
  width: 100%;
  height: 56px;
  position: sticky;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
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
  justify-content: center;
  height: 100%;
`;
