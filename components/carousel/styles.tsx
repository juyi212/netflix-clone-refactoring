import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@components/card/styles';

export const MovieDetailContainer = styled.div`
  width: 250px;
  height: 250px;
  z-index: 6;
`;

export const Container = styled.div`
  padding: 0 15px;
  position: relative;
  z-index: 1;
  & h1 {
    margin: 0 0 0 20px;
  }
`;

export const StyledSlider = styled(Slider)`
  margin: 0 20px;
  .slick-list {
    transition: transform 300ms ease 100ms;
  }
  .slick-slide {
    padding-top: 50px;
    // padding-right: 20px;
    padding-bottom: 50px;
    
    height: 300px;
  }


    :hover  ${Box} {
      transform: translateX(-25%);
    }
    ${Box} {
      :hover {
        transform: scale(1.5) !important;
        z-index: 10;
      }
    }
    ${Box} {
      :hover ~ ${Box} {
        transform: translateX(25%);
      }
    }
  
  
`;
