import React from "react";
import styled from "styled-components";
import { ChevronLeft } from "@styled-icons/material-outlined";

export const CountryDetailsStyled = styled.div`
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  border-radius: 0.375rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 0.375rem;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.gray};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const GridContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  align-items: center;
  word-break: break-all;

  @media (min-width: 640px) {
    padding-top: 0px;
  }
`;

export const SubHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.gray};
  margin: 8px 0;
  padding: 8px 0;

  h1 {
    font-weight: 500;
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
    color: ${({ theme }) => theme.colors.blue};
    text-align: center;
  }
`;

export const NoData = styled.div`
  width: 100%;
  margin: 8px 0;
  padding: 8px 0;

  h2 {
    font-weight: 500;
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
    color: ${({ theme }) => theme.colors.orange};
    text-align: center;
  }
`;

export const IconChevronLeft = styled(ChevronLeft)`
  width: 24px;
  height: 24px;
`;
export const BackLink = styled.a`
  display: flex;
  margin: 8px 0;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue};
  &:hover {
    color: ${({ theme }) => theme.colors.orange};
  }
  & > ${IconChevronLeft} {
    padding-left: 8px;
  }
`;
