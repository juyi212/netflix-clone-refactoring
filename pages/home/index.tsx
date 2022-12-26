import Banner from '@components/banner';
import useSWR from 'swr';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Outlet } from 'react-router-dom';
import requests from '@utils/requests';
import NetflixRow from '@components/netflix-row';
import styled from 'styled-components';
import useInfiniteScroll from '../../utils/useInfiniteScroll';

interface carouselListType {
  title: string, 
  request: string,
}

const carouselList: carouselListType[] = [
  { title: '달달한 코미디', request: requests.fetchComedy},
  { title: '지금 뜨고 컨텐츠', request: requests.fetchDocumentaries},
  { title: '우아아아', request: requests.fetchHorror},
  { title: '으아아', request: requests.fetchTrending},
  { title: '달달한 코미디2', request: requests.fetchTopRated},
  { title: '달달한 코미디3', request: requests.fetchComedy},
  { title: '달달한 코미디3', request: requests.fetchComedy},
  { title: '달달한 코미디3', request: requests.fetchComedy},
  
  
  
]

const Home = React.memo(() => {
  // const { data: userData, mutate: revalidateUser } = useSWR(
  //   `${process.env.REACT_APP_SERVICE_PORT}/user/info`,
  //   userfetcher,
  //   { refreshInterval: 5000 },
  // );
  const [array, setArray] = useState<Array<carouselListType>>([]);

  const target = useRef<HTMLDivElement>(null)
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true)

  const { count } = useInfiniteScroll({
    target: target,
    targetArray: array,
    threshold: 0.25,
    endPoint: 4
  });
  console.log(count)

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && pageNum < 3) {
      setPageNum(pageNum + 1);
    }
  };


  
    useEffect(() => {
      // API 호출 부분 - 실제로는 count를 이용해 API를 호출
      setIsLoading(true);
      setTimeout(() => {
        setArray([...array, ...carouselList]);
        setIsLoading(false);
      }, 1000);
      console.log(array)
    }, [count]);

    // useEffect(() => {
    //   setArray(carouselList)
    // },[count])
  

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   if (pageNum > 2) {
  //     window.removeEventListener('scroll', handleScroll);
  //   }
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [pageNum]);

  // if (!userData) {
  //   return <Navigate replace to="/login" />;
  // }
  return (
    <div>
      <Outlet />
      <Banner />
      <div>

      <Container ref={target}>      
        {
          array.map((list:carouselListType) => (
            <NetflixRow title={list.title} request={list.request} />
            ))
          }
      </Container>
      {isLoading && <div>로딩중!!!!!!!!!!!!!!!!!!!!!</div>}
      </div>
      
      {/* {pageNum > 0 && (
        <>
        <NetflixRow title={'달달한 코미디2'} request = {requests.fetchComedy} />
        <NetflixRow title={'지금 뜨고 컨텐츠'} request = {requests.fetchTrending} />
        </>
        )
      }       */}
    </div>
  );
});

export default Home;

const Container = styled.div`
  margin-top: -250px;
`
