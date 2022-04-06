import styled from "styled-components";

export const ListGrid = styled.ul<{ columns?: number }>`
  width: 100%;
  height: calc(100vh - 260px);
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  width: 100%;
  padding-bottom: 20px;
  gap: 0.5rem /* 8px */;
  overflow-y: auto;

  @media (min-width: 640px) {
    grid-template-columns: ${({ columns }) =>
      `repeat(${columns || 2}, minmax(0, 1fr))`};
  }
`;
