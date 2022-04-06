import React from "react";
import styled from "styled-components";

export const Title = styled.span`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
`;
