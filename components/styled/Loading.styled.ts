import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: ${({ theme }) => `4px solid ${theme.colors.blue}`};
  border-right: ${({ theme }) => `4px solid ${theme.colors.blue}`};
  border-bottom: ${({ theme }) => `4px solid ${theme.colors.blue}`};
  border-left: ${({ theme }) => `8px solid ${theme.colors.orange}`};
  background: transparent;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
`;

export default Loading;
