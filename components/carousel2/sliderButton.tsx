import React from 'react';
import { GrFormNext } from 'react-icons/gr';
import { SliderButtonContainer } from './styles';

interface SilderButtonProps {
  onClick: () => void;
  buttonType: string;
}


const SliderButton = ({onClick, buttonType}: SilderButtonProps) => {
  return (
    <SliderButtonContainer onClick={onClick} buttonType={buttonType}>
      <span style={{color: 'white'}}>
        <GrFormNext />
      </span>
    </SliderButtonContainer>
  )
}

export default SliderButton;