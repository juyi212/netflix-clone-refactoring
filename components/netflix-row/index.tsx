import CarouselTwo from '@components/carousel2';
import CardItem, { MovieDataProps } from '@components/carousel2/cardItem';
import useAxios from 'axios-hooks';
import React, { PropsWithChildren } from 'react';
import { Container, Title } from './styles';

export interface SliderContextProps {
  onSelectSlide: (item: MovieDataProps) => void;
  onCloseSlide: () => void;
  elementRef: React.RefObject<HTMLDivElement>;
  // TODO: update shape when ready
  currentSlide: any;
}

export interface NetflixRowProps {
  title: string;
  request: string;
}

const NetflixRow: React.FC<NetflixRowProps> = ({ title, request }) => {
  const [{ data: movieData, loading }] = useAxios(request);
  
  
  return (
    <Container>
    <Title>{title}</Title>
    {loading && !movieData?.results.length ? 
      <>로딩중</>
      :
      <CarouselTwo>
      {
        movieData.results.map((movie: MovieDataProps) => (
          <CardItem movie={movie} key={movie.id}/>
          )
          )
        }
    </CarouselTwo>
      }
      </Container>
    
  )
}

export default NetflixRow;
