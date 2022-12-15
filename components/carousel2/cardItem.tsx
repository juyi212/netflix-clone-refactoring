import { TMDB_BASE_IMG_URL } from '@constants/tmdb';
import React from 'react';
import {SliderContextProps } from '@components/netflix-row';
import { CardItemContainer } from './styles';
import SliderContext from './context';

export interface MovieDataProps {
  backdrop_path: string; // "/vmVeGFUTXEKwAUpFH9bZwow9zIk.jpg"
  first_air_date: string; // "2020-07-15"
  genre_ids: string[]; // (2) [18, 9648]
  id: number | string; // 105214
  name: string; // "Dark Desire"
  title: string; //
  origin_country: string[]; // ["MX"]
  original_language: string; // "es"
  original_name: string; // "Oscuro deseo"
  overview: string; // "Married Alma spends a fateful weekend away from home that ignites passion, ends in tragedy and leads her to question the truth about those close to her."
  popularity: number; // 260.365
  poster_path: string; // "/uxFNAo2A6ZRcgNASLk02hJUbybn.jpg"
  vote_average: number; // 7.3
  vote_count: number; // 2290
}

interface SliderItemProps {
  movie : MovieDataProps
}

const CardItem: React.FC<SliderItemProps> = ({ movie, ...props }) => {
  const context = React.useContext<Partial<SliderContextProps>>(SliderContext);
  const { onSelectSlide, currentSlide, elementRef } = context;
  
  return (
    <CardItemContainer ref={elementRef} {...props}>
      <img src={`${TMDB_BASE_IMG_URL}${movie.backdrop_path}`} alt={movie.name}/>
    </CardItemContainer>
  )
}

export default CardItem;