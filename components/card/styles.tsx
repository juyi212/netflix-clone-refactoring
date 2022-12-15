import styled from '@emotion/styled';

export const Box = styled.div`
  z-index: 1;
  transition: transform 300ms ease 100ms;
  position: relative;
  background-color: black;
  border-radius: 12px;
  img {
    height: 100%;
    width: 100%;
    vertical-align: top;
  }
  &:hover {
    cursor: pointer;
  }
`;


export const Detail = styled.div`
  width: 100%;
  display: none;
  padding: 10px;
  background-color: black;
`;

export const Image = styled.img`
  width: 100%;
  height: 140%;
  object-fit: fill;
  border-radius: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderFirst = styled.div`
  display: flex;
  & div {
    padding-left: 10px;
  }
`;
