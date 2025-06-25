import { CustomCard, CustomContainer } from '../components/Style'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 새로운 게시물 정보를 입력받는 화면
// 게시물 데이터 : 번호, 제목, 내용, 작성자, 등록일, 수정일
// 번호는 자동 생성되므로 입력하지 않음
// 제목, 내용은 입력받고, 작성자, 등록일과 수정일은 자동으로 생성되므로 입력하지 않음
// 게시물 등록 버튼을 클릭하면 서버로 데이터를 전송하여 게시물을 등록

// 게시물 등록 이벤트 처리

const BoardRegister = () => {

  // 게시물 데이터를 담을 state 생성
  // object {}로 초기화
  const [board, setBoard] = useState({})

  // context에서 host 꺼내기
  const { host } = useContext(Context)
  
  // 일반 함수에서 사용x. 컨포넌트 함수에서 사용 가능
  // navigate: 페이지 이동시 사용
  const navigate = useNavigate()

  // redux store에서 로그인 데이터(토큰) 가져오기
  const token = useSelector(state => state.member.token)

  // 이벤트 함수 정의
  // 버튼 클릭시 페이지 이동 방지
  const handlerSubmit = async (event) => {
    event.preventDefault()

    // 먼저 파라미터로 게시물 데이터 만들기
    // 중요! 파라미터의 형식: json 문자열 or 폼 데이터
    // 제목, 내용, 파일
    // 사용자가 입력한 데이터를 꺼내서 폼데이터 생성
    // json X, 폼데이터 O
    const formData = new FormData()
    formData.append('title', board.title)
    formData.append('content', board.content)
    formData.append('uploadFile', board.uploadFile)

    // axios 객체에서 post 함수 호출 - post 메소드
    // post 인자: 주소, 게시물 데이터, 헤더

    // ex) https://resilient-figolla-b4c13b.netlify.app/api/board/register
    const response = await axios.post(`${host}/board/register`, formData, {
      headers: {
        Authorization: token
      }
    })

    // API 호출 후 처리
    // 게시물 등록이 끝났으면 게시물 리스트로 이동
    if (response.status === 201) {
      // api랑 상관 없음. 리액트 내부 주소
      navigate('/board/list')
    }
  }

  // 함수 추가
  // 사용자가 입력 필드에 값을 입력하면 이벤트가 발생됨
  // 등록 화면에서는 등록 버튼을 클릭할 때 API가 호출됨
  const handlerChange = (event) => {
    // 이벤트가 발생한 엘리먼트에서 필요한 데이터 추출
    // name, value, files (파일 첨부 필드인 경우)
    // console.log(event.target.name, event.target.value, event.target.files)

    // 구조 분해 문법을 사용해서 event 객체에 있는 데이터 추출
    const { name, value, files } = event.target

    // board 상태에 저장할 데이터 만들기
    // 이전에 추가한 데이터가 유지되지 않음
    // 기존의 게시물 데이터를 유지하기 위해서
    // 기존 게시물 데이터를 복제한 다음에 새로운 프로퍼티 추가!
    let newBoard = { ...board }

    // ex) {'title':'aa', 'content':'bb', 'uploadFile':~}

    // object에 데이터 추가하는 방법
    // 프로퍼티의 key는 입력필드의 name을 사용
    // 프로퍼티의 value는 value를 사용
    if (name === 'uploadFile') {
      // file list 배열에서 첫번째 요소를 꺼내서 저장
      newBoard[name] = files[0]
    } else {
      newBoard[name] = value
    }

    // 상태 업데이트
    setBoard(newBoard)
  }


  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 등록</h3>
        {/* onSubmit 이벤트 추가 */}
        <Form onSubmit={handlerSubmit}>
          {/* 제목 */}
          <Form.Group className="mb-3" controlId="board.title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name='title' onChange={ handlerChange }/>
          </Form.Group>
          {/* 내용 */}
          <Form.Group className="mb-3" controlId="board.content">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={3} name='content' onChange={ handlerChange }/>
          </Form.Group>
          {/* 파일 첨부 */}
          <Form.Group className="mb-3" controlId="board.uploadFile">
            <Form.Label>이미지</Form.Label>
            <Form.Control type="file" name='uploadFile' onChange={ handlerChange }/>
          </Form.Group>

          {/* 등록 버튼 */}
          <Button variant="secondary" type='submit'>등록</Button>

        </Form>

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardRegister