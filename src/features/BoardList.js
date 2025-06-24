// 게시물 목록 화면

import { Link, useNavigate } from "react-router-dom";
import { CustomCard, CustomContainer } from "../components/Style"
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../index";
import { useSelector } from "react-redux";

// 가짜 데이터
// API를 호출해서 데이터베이스에 있는 진짜 데이터 가져오기!
// const data = [
//   {no:1, title:"1번", content:"1번입니다", writer:"마돈나" ,regDate:"2025-06-01"},
//   {no:2, title:"2번", content:"2번입니다", writer:"코로나" ,regDate:"2025-05-24"},
//   {no:3, title:"3번", content:"3번입니다", writer:"사우나" ,regDate:"2025-06-07"},
// ]

const BoardList = () => {

  const navigate = useNavigate()

  // 게시물 리스트는 일반변수라서 화면에 변화 없음
  // state로 변경
  let [data, setData] = useState(null)

  // 저장소에서 API 주소 꺼내기
  // 구조 분해
  const { host } = useContext(Context)

  const token = useSelector(state => state.member.token)
  
  // API 호출
  // await은 async 함수 안에서만 사용 가능
  // api를 호출하고 응답받는 함수
  // api 기본 주소를 전역으로 관리 ( http://localhost:8080 )
  // 다른 컴포넌트에서도 써야하니까...
  // axios에서 주소 변경
  // 회원이 사라지면 발급한 토큰을 사용할 수 없게 됨

  // api를 호출할 때 토큰 교체
  const apicall = async() => {

    // axios ajax fetch 와 같이 api를 호출하는 함수는 비동기 함수
    // 비동기 함수를 사용할 때는 await async 키워드를 함께 사용

    const respone = await axios.get(`${host}/board/list`, {
      headers: {
        Authorization: token
      }
    })

    // 상태 업데이트. 응답 메시지에서 데이터만 꺼내기
    setData(respone.data)
  }
  // API 호출 -> 상태 업데이트 -> 컴포넌트 리렌더링 -> 다시 API 호출..
  // apicall()

  // 해결방법: useEffect 사용
  // API 직접 호출x
  // 인자: 수행할 코드, 실행 주기
  // 빈 배열은 컴포넌트가 처음 로드될 때 한번만 실행하겠다는 의미
  // 게시물 리스트 조회나 상세 화면은 화면을 띄우는 시점에서 api 호출
  useEffect(() => {
    apicall()
  }, [])

  return (
    <CustomCard>
      <CustomContainer>

        <Row>
          <Col sm={8}>
            <h3>게시물 리스트</h3>
          </Col>
          <Col sm={4}>
            <Button variant="primary" onClick={()=>{
              navigate('/board/register')
            }}>게시물 등록</Button>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>

          <tbody>
            {/* data 게시물 리스트가 없을 때 오류 처리 */}
            {/* 논리곱 연산자는 첫번째 식이 true 일때만 두번째 식을 실행함 */}
            {/* 따라서 게시물 리스트가 없으면 tr태그 생성이 안됨 */}
            { data!=null && data.map( (board)=>{
              return <tr key={board.no}>
                <td><Link to={'/board/read/'+board.no}>{board.no}</Link></td>
                <td>{board.title}</td>
                <td>{board.writer}</td>
                <td>{board.regDate}</td>
              </tr>
            } ) }
            
          </tbody>
        </Table>

      </CustomContainer>
    </CustomCard>
    
  )
}

export default BoardList