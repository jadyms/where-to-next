import styled from "styled-components";

export const Header = styled.div`
  padding-bottom: 24px;
`;

export const HeaderBannerWrapper = styled.div`
  height: 260px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.blue};
`;

export const HeaderBanner = styled.div`
  display: flex;
  direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};

  h1 {
    font-weight: 500;
    font-size: 2.25rem /* 36px */;
    line-height: 2.5rem /* 40px */;
    text-align: center;

    /* padding-left: 10px; */

    @media (min-width: 640px) {
      font-size: 4.5rem /* 72px */;
      line-height: 1;
    }
  }
`;

export const Subtitle = styled.span`
  padding-top: 8px;
  padding-left: 8px;
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  text-align: center;

  a {
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.orange};
      text-decoration-line: underline;
    }
  }
`;

export const BannerImage = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 220px;

  @media (min-width: 640px) {
    width: 248px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const InputWrapperWhite = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.375rem /* 6px */;
`;

export const InputWrapperOrange = styled.div`
  margin-top: -2rem /* -32px */;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background-color: ${({ theme }) => theme.colors.orange};
    padding: 0.5rem /* 8px */;
    display: flex;
    border-radius: 0.5rem /* 8px */;
    align-items: center;
    justify-content: center;
  }
`;
