import React, { useEffect, useState, useCallback, useContext } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { UserContext } from '@layouts/User';
import useAxios from 'axios-hooks';
import requests from '@utils/requests';
import { ImageBox, SliderContainer, Image, ImageWrapper } from './styles';
import { TMDB_BASE_IMG_URL } from '@constants/tmdb';


const Banner = () => {
  const context = useContext(UserContext);
  const [{data:bannerData}] = useAxios(requests.fetchNetFlixOriginal)

  const [translateValue, setTranslateValue] = useState<number>(0);

  const moveRight = useCallback(() => {
    setTranslateValue((prev) => {
      if (translateValue !== 100 * (bannerData?.length - 1)) {
        return prev + 100;
      } else return 0;
    });
  }, [translateValue]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      moveRight();
    }, 4000);
    return () => {
      clearInterval(imageInterval);
    };
  }, [translateValue]);


  return (
    <div style={{ marginBottom: '30px' }}>
    <SliderContainer>
      <ImageBox translateValue={translateValue !== 0 ? translateValue : null}>
        {bannerData?.results.map((banner: any) => {
          return (
            <ImageWrapper>
              <Image src={`${TMDB_BASE_IMG_URL}${banner.backdrop_path}`} />
            </ImageWrapper>
            )
        })}
      </ImageBox>
    </SliderContainer>
    </div>
  );
};

export default Banner;
