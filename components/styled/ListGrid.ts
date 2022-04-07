import styled from "styled-components";

export const ListGrid = styled.ul<{ columns?: number }>`
  width: 100%;
  max-height: calc(100vh - 284px);
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  width: 100%;
  gap: 0.5rem /* 8px */;
  overflow-y: auto;
  padding-top: 10px;

  @media (min-width: 640px) {
    grid-template-columns: ${({ columns }) =>
      `repeat(${columns || 2}, minmax(0, 1fr))`};
  }
`;
