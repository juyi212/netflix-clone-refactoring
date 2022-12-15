import Banner from '@components/banner';
import useSWR from 'swr';
import React, { useEffect, useState } from 'react';

import { Link, Navigate, Outlet } from 'react-router-dom';
import userfetcher from '@utils/userfetcher';
import requests from '@utils/requests';
import Carousel2 from '@components/carousel2';
import NetflixRow from '@components/netflix-row';
import CarouselTwo from '@components/carousel2';
import styled from 'styled-components';

const Home = React.memo(() => {
  // const { data: userData, mutate: revalidateUser } = useSWR(
  //   `${process.env.REACT_APP_SERVICE_PORT}/user/info`,
  //   userfetcher,
  //   { refreshInterval: 5000 },
  // );
  const [pageNum, setPageNum] = useState(1);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && pageNum < 3) {
      setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (pageNum > 2) {
      window.removeEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNum]);

  // if (!userData) {
  //   return <Navigate replace to="/login" />;
  // }
  return (
    <div>
      <Outlet />
      <Banner />
      <Container>

      {pageNum > 0 && (
        <>
        <NetflixRow title={'달달한 코미디2'} request = {requests.fetchComedy} />
        <NetflixRow title={'지금 뜨고 컨텐츠'} request = {requests.fetchTrending} />
        </>
        )
      }      
              
      {pageNum > 1 && (
        <>
        <NetflixRow title={'호러..홀뤼'} request = {requests.fetchHorror} />
        <NetflixRow title={'귀여운 애니'} request = {requests.fetchAnime} />
        </>
      )}
      {/* {pageNum > 2 && (
        <>
        <Carousel from={'/home'} header={'힐링의 음악 컨텐츠'} category={'category_movie'} genre_id={'18'} /> 
        <Carousel from={'/home'} header={'빠질 수 없는 아메리카'} category={'_'} genre_id={'18'} country={'미국'} /> 
        </>
      )} */}
      </Container>
    </div>
  );
});

export default Home;

const Container = styled.div`
  margin-top: -300px;

`
