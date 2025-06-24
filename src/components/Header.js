// 메뉴바를 포함하고 있는 헤더 만들기

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react'
import styled from 'styled-components';
import {logout} from '../store/memberSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const HeaderDiv = styled.div`
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.15);
`

const Header = () => {

  // redux에서 dispatch
  const dispatch = useDispatch()

  const navigate = useNavigate()

  // redux store에서 사용자 정보 가져오기
  const user = useSelector(state => {
    return state.member.user
  })

  // 이벤트 함수 추가
  // logout 링크를 클릭하면 이벤트 발생
  const handelClick = (event) => {

    event.preventDefault()

    // dispatch를 사용해서 리듀서 함수 호출
    dispatch(logout())
    // 로그아웃시 홈화면으로 이동
    navigate('/')
  }

  return (
    <HeaderDiv>
      <Navbar expand="lg" className="">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* 사이트 메뉴 */}
            <Nav className="me-auto">

              {/* 로그인이 안됐으면 로그인, 회원가입 표시 */}
              {
                user === null &&
                <>
                  {/* Nav.Link는 a태그로 렌더링되어 페이지가 새로고침되며 이동함 */}
                  {/* spa와 맞지 않음 */}
                  {/* as에 router의 link 컴포넌트 넣기 */}
                  {/* router의 link 컴포넌트가 동작함 */}
                  <Nav.Link as={Link} to="/login">login</Nav.Link>
                  <Nav.Link as={Link} to="/register">register</Nav.Link>
                </>
              }

              {/* 로그인이 됐으면 로그아웃, 게시물, 회원 관리, 홈 표시 */}
              {
                user != null &&
                <>
                  <Nav.Link as={Link} to="/logout" onClick={handelClick}>logout</Nav.Link>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/board/list">board</Nav.Link>
                </>
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderDiv>
  )
}

export default Header


// react bootstrap에서 제공하는 link 컴포넌트가 링크를 클릭하면 새로고침 되는 것으로 보임!

// redux store는 index.html을 다시 로드하면 초기화 됨
// 이전에 저장했던 로그인 데이터가 날아감