import React from 'react';
import { SliderWrapper, SliderContainer, SliderRow } from './styles';
import { MovieDataProps } from './cardItem';
import SliderButton from './sliderButton';
import useSlider from './useSlider';
import useSizeElement from './useSizeElement';
import SliderContext from './context';

export interface SliderProps {
  children: React.ReactNode;
  activeSlide?: number;
}


const CarouselTwo = ({ children }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = React.useState<MovieDataProps | null>(
    null
  );

  const {width, elementRef} = useSizeElement();
    
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasPrev,
    hasNext,
  } = useSlider(width, React.Children.count(children));
  
  const contextValue = {
    elementRef,
    currentSlide,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <SliderWrapper>
        <SliderContainer>
          <SliderRow ref={containerRef} {...slideProps}>
            {children}
          </SliderRow>
        </SliderContainer>
        {hasPrev && <SliderButton onClick={handlePrev} buttonType="prev" />}
        {hasNext && <SliderButton onClick={handleNext} buttonType="next"/>}       
      </SliderWrapper>
      </SliderContext.Provider>
      
  );
};

export default CarouselTwo;

