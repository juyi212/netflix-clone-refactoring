import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Header, SecondaryNav, StyledLink, DropDown, DropDownContents, SearchContainer, SearchInput } from './styles';
import gravatar from 'gravatar';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineQuestionCircle, AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '@layouts/User';
import useDebounce from '@utils/debounce';

const Nav = React.memo(() => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const [search, setSearch] = useState<string>('');
  const debouncedValue = useDebounce(search, 500);

  // const onClickLogout = useCallback(() => {
  //   if (context.userData) {
  //     axios
  //       .get(`http://3.39.105.32:9000/netflix-clone/user/logout?uId=${context.userData.uId}`)
  //       .then((res) => {
  //         localStorage.removeItem('user');
  //         context.mutateUsers(undefined);
  //         navigate('/login');
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [context.userData]);

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [search],
  );

  useEffect(() => {
    if (search) {
      navigate({
        pathname: '/search',
        search: `?input=${search}`,
      });
    }
  }, [debouncedValue]);

  useEffect(() => {
    const header = document.querySelector('.header');
    if (header) {
      const headerHeight = header?.getBoundingClientRect().height;
      window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
          header.setAttribute('style', 'background-color:rgba(0,0,0,.8);');
        } else {
          header.setAttribute('style', 'background: transparent;');
        }
      });
    }
  }, []);

  return (
    
    <Header className="header">
      <div className="logo">
        <StyledLink to={'/home'} style={{ color: 'red' }}>
          NETFLIX
        </StyledLink>
      </div>
      {/* userData ??? ??????  */}
      {context.userData && (
        <>
          <div className="main-nav">
            <StyledLink to="/home">???</StyledLink>
            <StyledLink to="/movie"> ??????????????? </StyledLink>
            <StyledLink to="/my-list">?????? ?????? ?????????</StyledLink>
          </div>
          <SecondaryNav>
            <SearchContainer>
              <AiOutlineSearch className="searchIcon" style={{ color: 'white' }} size="24" />
              <SearchInput
                type="text"
                value={search}
                placeholder="????????? ??????????????????."
                onChange={onChangeSearch}
                // onKeyPress={onKeyUpHandler}
              />
            </SearchContainer>
            <DropDown>
              <img
                className="profile-image"
                src={gravatar.url('dea830@naver.com', { s: '28px', d: 'retro' })}
                alt={'gg'}
              />
              <DropDownContents>
                <div>
                  <BsPersonCircle size="24" style={{ marginRight: '10px' }} />
                  <StyledLink to="/profile">??????</StyledLink>
                </div>
                <div>
                  <AiOutlineQuestionCircle size="24" style={{ marginRight: '10px' }} />
                  <StyledLink to="/help">????????????</StyledLink>
                </div>
                <br></br>
                <div>?????????????????? ????????????</div>
              </DropDownContents>
            </DropDown>
          </SecondaryNav>
        </>
      )}
    </Header>
  );
});

export default Nav;
