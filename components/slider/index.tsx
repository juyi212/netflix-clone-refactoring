import { TMDB_BASE_IMG_URL } from '@constants/tmdb';
import React from 'react';
import { SliderContainer, ImageBox, Image } from './styles';

interface Props {
  translateValue: number;
  bannerData: any;
}

const Slider: React.FC<Props> = ({ translateValue, bannerData }) => {

  return (
    <SliderContainer>
      <ImageBox translateValue={translateValue !== 0 ? translateValue : null}>
        {bannerData?.results.map((banner: any) => {  
          return <Image key={banner.id} src={`${TMDB_BASE_IMG_URL}${banner.backdrop_path}`} />;
        })}
      </ImageBox>
    </SliderContainer>
  );
};

export default Slider;
