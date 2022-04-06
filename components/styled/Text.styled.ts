import React from "react";
import styled from "styled-components";

export const Text = styled.span`
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.colors.darkGray};
`;
