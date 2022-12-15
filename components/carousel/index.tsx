import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import Card from '@components/card';
import { Container, StyledSlider, MovieDetailContainer } from './styles';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { UserContext } from '@layouts/User';
import { TMDB_BASE_URL, TMDB_API_KEY } from '@constants/tmdb';
import useAxios from 'axios-hooks';

const settings = {
  slide: 'div',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    // 반응형 웹 구현 옵션
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 6,
      },
    },
  ],
};
interface ContentProps {
  from: string;
  category?: string;
  genre_id?: string;
  country?: string;
  header: string;
  request? : string;
}
export const API_KEY_PARAM = `api_key=${TMDB_API_KEY}`;

function useCategorySWR(category?: string, genre_id?: string, country?: string, userNo?: string) {
  return useSWR(() => {
    if (category === 'Trending') {
      return `${TMDB_BASE_URL}trending/all/week?${API_KEY_PARAM}&language=en-US`;
    } else if (category === 'category_movie') {
      return `${process.env.REACT_APP_SERVICE_PORT}/movie/category_movie?genreId=${genre_id}&userNo=${userNo}`;
    } else {
      return `${process.env.REACT_APP_SERVICE_PORT}/movie/country_movie?oriCountry=${country}&userNo=${userNo}`;
    }
  }, fetcher);
}

const Carousel = React.memo(({ from, category, genre_id, country, header, request }: PropsWithChildren<ContentProps>) => {
  // const context = useContext(UserContext);
  // const userNo = context?.userData.user.uNo;
  // const { data: movieData, error, mutate } = useCategorySWR(category, genre_id, country);

  const [{ data: movieData, loading }] = useAxios(request? request : `${TMDB_BASE_URL}trending/all/week?${API_KEY_PARAM}&language=en-US`);
  

  return (
    <Container>
      <h1> {header} </h1>
      <StyledSlider {...settings}>
        {movieData?.results.map((movie: Object, index: string) => {
          return <Card from={from} movie={movie} key={index} />;
        })}
      </StyledSlider>
    </Container>
  );
});

export default Carousel;
