import React from "react";
import styled from "styled-components";
import { BackLink } from "./CountryDetails.styled";

export const Page404 = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.orange};
  padding: 0.5rem /* 8px */;
  display: flex;
  border-radius: 0.5rem /* 8px */;
  align-items: center;
  justify-content: center;

  div {
    padding: 2rem /* 8px */;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.blue};
    border-radius: 0.5rem /* 8px */;
    width: 75%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* ${BackLink} {
    padding-top: 2px;
  } */
`;
