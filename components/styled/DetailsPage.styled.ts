import React from "react";
import styled from "styled-components";
import { ListGrid } from "./ListGrid";

export const ContentContainer = styled.div`
  max-height: calc(100% - 270px);
  max-width: 1280px;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;

  ${ListGrid} {
    overflow-y: visible;
  }
`;
