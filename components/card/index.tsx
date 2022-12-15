import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Header, Image, Box, Detail, HeaderFirst } from './styles';
import { AiOutlineCheckCircle, AiOutlineDownCircle } from 'react-icons/ai';
import { BsHandThumbsUp, BsHandThumbsUpFill, BsPlusCircle } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TMDB_BASE_IMG_URL } from '@constants/tmdb'

interface ContentProps {
  from?: string;
  movie: any;
  
  // mutate: () => void;
}

const Card = React.memo(({ from, movie }: PropsWithChildren<ContentProps>) => {
  const [like, setLike] = useState(false);
  const [zzim, setZzim] = useState(false);

  // const onChangeZzim = useCallback(() => {
  //   if (zzim) {
  //     setZzim(false);
  //     axios
  //       .delete(`${process.env.REACT_APP_SERVICE_PORT}/user/delete_movie_zzim?movieId=${movie.id}&userNo=${uId}`)
  //       .then((res) => {
  //         mutate();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     setZzim(true);
  //     axios
  //       .post(`${process.env.REACT_APP_SERVICE_PORT}/user/insert_movie_zzim?movieId=${movie.id}&userNo=${uId}`)
  //       .then((res) => {
  //         mutate();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [zzim]);

  const onChangeLike = useCallback(() => {
    if (like) {
      setLike(false);
    } else {
      setLike(true);
    }
  }, [like]);

  useEffect(() => {
    if (movie?.isZzim === 'Y') {
      setZzim(true);
    } else if (movie?.isZzim === 'N') {
      setZzim(false);
    }
  }, [movie.isZzim, zzim]);

  return (
    <Box>
      {/* <Link
        to={`${from}/${movie.id}`}
        state={{
          uId,
        }}
      > */}
        <Image
          alt="d"
          src={`${TMDB_BASE_IMG_URL}${movie.backdrop_path}`}
        />
      {/* </Link> */}
      <Detail className="detail">
        <Header>
          <HeaderFirst>
            {/* <div onClick={onChangeZzim}>
              {zzim ? <AiOutlineCheckCircle size="28" color="red" /> : <BsPlusCircle size="28" />}
            </div> */}
            <div onClick={onChangeLike}>{like ? <BsHandThumbsUpFill size="28" /> : <BsHandThumbsUp size="28" />}</div>
          </HeaderFirst>
          {/* <Link
            to={`${from}/${movie.id}`}
            state={{
              uId,
            }}
          > */}
            <AiOutlineDownCircle size="32" color="white" />
          {/* </Link>  */}
        </Header>
      </Detail>
    </Box>
  );
});

export default Card;
