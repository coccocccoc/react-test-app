import { CustomCard, CustomContainer } from "../components/Style"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// 게시물 수정 화면 :
// 1. 게시물의 모든 데이터 출력
// 2. 특정 데이터 수정 가능

// 게시물 데이터 : 번호, 제목, 내용, 작성자, 등록일, 수정일
// 수정이 가능한 필드

// 가짜 데이터
// const board = {no :1, title:"1번", content:"1번입니다", writer:"마돈나" ,regDate:"2025-06-01", modDate:"2025-06-02"}

// 게시물 수정 화면
// 기존 게시물 데이터 조회
// 일부 데이터 수정 가능
// 수정 버튼을 클릭하면 게시물 데이터 업데이트

const BoardModify = () => {

  // board를 state로 변경
  let [board, setBoard] = useState(null)
  
  // api를 호출해서 데이터베이스에 있는 게시물 데이터 꺼내오기

  // api 기본 주소 가져오기
  const { host } = useContext(Context)

  // URL 주소에 포함되어 있는 no 파라미터 꺼내기
  const params = useParams()

  // navigate: 페이지 이동에 사용하는 도구
  const navigate = useNavigate()
  
  // store에서 token 가져오기
  const token = useSelector(state => state.member.token)

  // axios를 사용해서 api 호출
  const apicall = async () => {
    // ex) board/read?no=1
    // 인자: URL 주소, 헤더(토큰)
    const response = await axios.get(`${host}/board/read?no=${params.no}`, {
      headers: {
        Authorization: token
      }
    })

    // 상태 업데이트
    if (response.status === 200) {
      setBoard(response.data)
    }
  }
  
  // 컴포넌트가 처음 로드될 때 한번만 api를 호출
  useEffect(() => {
    apicall()
  }, [])

  // 사용자가 입력필드에서 값을 바꾸면 실행됨
  // 사용자가 입력한 내용을 다시 board state에 업데이트
  // 그러묜 변경된 내용이 화면에 나타남
  const handlerChange = (event) => {

    // 이벤트가 발생한 엘리먼트에서 필요한 데이터만 추출
    const { name, value, files } = event.target
    
    // 기존 게시물 복사
    const newBoard = { ...board }
    
    // 특정 프로퍼티만 교체
    // 예: newBoard[title] = 'abc'
    // newBoard[]
    if (name === 'uploadFile') {
      newBoard[name] = files[0]
    } else {
      newBoard[name] = value
    }
    

    // 상태 업데이트
    setBoard(newBoard)

  }

  const handleSubmit = async (event) => {
    event.preventDefault() // 페이지 이동 방지
    
    // api를 호출하여 게시물 수정 처리
    // axios의 함수는 메소드 종류를 보고 선택
    // 인자: 주소, 바디데이터, 헤더

    // 파라미터의 형식
    // 1. URL 파라미터
    // 2. 바디데이터 - JSON OR XML 데이터
    // 3. 바디데이터 - 폼데이터

    // 게시물 데이터를 폼데이터로 생성
    const formData = new FormData()
    formData.append('no', board.no)
    formData.append('title', board.title)
    formData.append('content', board.content)
    // 파일은 값이 있으면 담기
    if (board.uploadFile != null) {
      formData.append('uploadFile', board.uploadFile)
    }
    

    // axios는 내부에서 promise 객체를 사용함
    // 원래는 promise가 api를 호출하고 기다렸다가 응답을 받아야 하는데
    // await가 없기 때문에 응답을 받지 못한채로 promise 객체를 받음
    const response = await axios.put(`${host}/board/modify`, formData, {
      headers: {
        Authorization: token
      }
    })

    // API 호출 후 처리
    // 수정이 끝났으면 상세화면으로 이동
    // api가 정상적으로 호출이 되었다면 204 코드 반환
    if (response.status === 204) {
      // 실제 랜더링: /board/read/1
      navigate(`/board/read/${board.no}`)
    }

  }

  // 
  const handleRemove = async () => {
    // 게시물 삭제 api 호출

    // 인자: 주소, 헤더
    // 주소 예시: localhost:8080/board/remove?no=1
    const response = await axios.delete(`${host}/board/remove?no=${board.no}`, {
      headers: {
        Authorization: token
      }
    })

    // API 요청에 성공했으면 상세x 리스트o
    if (response.status === 204) {
      // react 내부 주소
      navigate('/board/list')
    }
  }

  
  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 수정</h3>
        {/* 폼 안에 버튼을 클릭하면 submit 이벤트가 발생 */}
        {/* 사용자가 수정한 게시물 데이터가 서버로 전송 */}
        {
          board !== null &&
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="board.no">
            <Form.Label>번호</Form.Label>
            <Form.Control type="text" value={board.no} readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" value={board.title} name="title" onChange={ handlerChange }/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="board.content">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={3} value={board.content} name="content" onChange={ handlerChange }/> 
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.writer">
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text" value={board.writer} readOnly/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="board.uploadFile">
            <Form.Label>이미지</Form.Label>
            <Form.Control type="file" name='uploadFile' onChange={ handlerChange }/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.regDate">
            <Form.Label>등록일</Form.Label>
            <Form.Control type="text" value={board.regDate} readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.modDate">
            <Form.Label>수정일</Form.Label>
            <Form.Control type="text" value={board.modDate} readOnly />
          </Form.Group>

          <Button variant="secondary" type="submit">저장</Button>
          <Button variant="danger" onClick={handleRemove}>삭제</Button>

        </Form>
        }


        

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardModify