import { CustomCard, CustomContainer } from '../components/Style'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { useSelector } from 'react-redux';
import "../App.css"



const BoardDetail = () => {

  const navigate = useNavigate()

  // 일반 변수에 데이터를 담아도 화면에는 변화 없음
  // state로 변경
  let [board, setBoard] = useState(null);

  // API를 호출하여 실제 게시물 데이터 가져오기
  // ex) /board/read?no=1
  // API를 호출하기 위해서 게시물 번호가 필요함!
  // URL 주소에 포함된 파라미터 추출
  const params = useParams()

  // axios는 비동기 함수로 응답을 기다렸다가 받아야 함
  // await는 async 함수 안에서만 사용 가능

  // context 저장소에서 host 가져오기
  // object 구조 분해
  const { host } = useContext(Context)
  
  const token = useSelector(state => state.member.token)

  const IMG_PATH = '/images'

  const apicall = async () => {
    // axios로 api 호출
    // ex) http://localhost:8080/board/read?no=1
    const response = await axios.get(`${host}/board/read?no=${params.no}`, {
      headers: {
        Authorization: token
      }
    })

    // 응답을 받은 후에 처리
    if (response.status === 200) {
      // 요청에 성공했으면 게시물 데이터 저장
      // board = response.data
      // 상태 업데이트
      setBoard(response.data)
    } else {
      // 요청에 실패했으면 에러메시지 출력
      console.log(`api error: ${response.status} ${response.statusText}`)
    }
  }
  // api 직접 호출 x
  // 컴포넌트가 처음에 생성될 때 한번만 api를 호출
  useEffect(() => {
    apicall()
  }, [])

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 상세</h3>

        { board!==null &&  
          <Form>
          <Form.Group className="mb-3" controlId="board.no">
            <Form.Label>번호</Form.Label>
            <Form.Control type="text" value={board.no} readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" value={board.title} readOnly/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="board.content">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={3} value={board.content} readOnly/> 
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.writer">
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text" value={board.writer} readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.regDate">
            <Form.Label>등록일</Form.Label>
            <Form.Control type="text" value={board.regDate} readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.modDate">
            <Form.Label>수정일</Form.Label>
            <Form.Control type="text" value={board.modDate} readOnly />
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.modDate">
            <img src={`${board.imgPath}`}></img>
          </Form.Group>
          

          <Button variant="secondary" onClick={()=>{
            navigate(`/board/modify/${board.no}`)
          }}>수정</Button>

        </Form>

        }
      </CustomContainer>
    </CustomCard>
    
  )
}

export default BoardDetail