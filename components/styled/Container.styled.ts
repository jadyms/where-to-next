import styled from "styled-components";
import { Header } from "./Header.styled";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1536px;
  overflow: clip;
  margin: 0 auto;
  background-color: white;

  > * {
    width: 100%;
    height: 100%;
  }
`;
