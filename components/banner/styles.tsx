import styled from '@emotion/styled';

export const SliderContainer = styled.div`
  position: relative;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  margin: 0;
`;

type ImageBoxProps = {
  translateValue: number | null;
};

export const ImageBox = styled.div<ImageBoxProps>`
  display: flex;
  transition: 1s;
  transform: ${({ translateValue }) => `translateX(-${translateValue}vw)`};
`;

export const Image = styled.img`
  width: 100vw;
  height: 100vh;
  z-index: -100;
  object-fit: cover;
  object-position: center center;
  opacity: 0.4;
`;

export const ImageWrapper = styled.div`
  height: 120vh;
  z-index: -6;
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
