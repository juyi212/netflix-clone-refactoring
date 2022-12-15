import styled, { css } from "styled-components";

interface buttonStyle {
  buttonType: string;
}

export const SliderWrapper = styled.div`
  padding: 40px 0;
  overflow: hidden;
  position: relative;
`

export const CardItemContainer = styled.div`
  flex: 0 0 18%;
  transition: transform 300ms ease 100ms;
  margin: 0 2px;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    vertical-align: top;
  }
  &:hover {
    cursor: pointer;
  }
`

export const SliderContainer =styled.div `
  display: flex;
  position: relative;

  :hover  ${CardItemContainer} {
    transform: translateX(-25%);
  }
  ${CardItemContainer} {
    :hover {
      transform: scale(1.5) !important;
      z-index: 10;
    }
  }
  ${CardItemContainer} {
    :hover ~ ${CardItemContainer} {
      transform: translateX(25%);
    }
  }
`

export const SliderRow = styled.div`
  display: flex;
  padding: 0 55px;
  transition: transform 300ms ease 100ms;
  width: 100%;
`

export const SliderButtonContainer = styled.button<buttonStyle>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 55px;
  background: rgba(0,0,0,0.5);
  border: 0;
  outline: 0;
  padding: 0;
  margin: 40px 0;
  z-index: 4;
  color: white;
  right: 0;
  &:hover {
    cursor: pointer;
  }
  ${
    (p) => 
      p.buttonType === 'next' 
      ? css`
      svg {
        transform: rotateZ(180deg);
      }
      right: 0;
    `
  : css`
      svg {
        transform: rotateZ(0deg);
      }
      right: unset;
    `}
  }
`

