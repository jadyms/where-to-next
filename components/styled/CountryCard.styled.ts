import styled from "styled-components";

export const CountryCardStyled = styled.div`
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  border-radius: 0.375rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const Pill = styled.span`
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  padding: 0.25rem;
  white-space: nowrap;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
`;

export const CardHeader = styled.div`
  display: flex;
  img {
    height: 32px;
    width: 40px;
    object-fit: contain;
    border-radius: 0.375rem;
  }

  div {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;

  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;
`;
