import { CustomCard, CustomContainer } from "../components/Style"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from "react";
import { Context } from '../index';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/memberSlice";

// 사용자가 작성한 로그인 데이터를 이용하여 로그인 처리

const Login = () => {

  // 로그인 데이터를 저장할 변수
  const [user, setUser] = useState({})

  // 저장소에서 host 가져오기
  const { host } = useContext(Context)

  const navigate = useNavigate()

  // redux dispatch 함수 가져오기
  const dispatch = useDispatch()

  // 사용자가 입력필드에 값을 입력하면 이벤트 발생
  const handlerChange = (event) => {
    
    // 입력필드에서 필요한 데이터만 추출
    const { name, value } = event.target
    
    // user 데이터 업데이트
    const newUser = { ...user }
    
    // 변경된 프로퍼티만 교체
    // name을 key로 사용
    // ex) newUser[id] = 'admin'
    newUser[name] = value

    setUser(newUser)
  }

  // 이벤트 함수 추가
  const handleSubmit = async (event) => {

    event.preventDefault()
    
    // login api 호출
    // 인증이 필요없는 아무나 사용할 수 있는 api => 헤더에 인증 정보 x
    // api의 바디데이터 (json 데이터)
    // javascript의 object: json 데이터

    // 인자: 주소, 바디데이터, 헤더
    const response = await axios.post(`${host}/login`, user)

    // API를 정상적으로 호출했으면 200 OK 코드가 반환됨
    // 로그인이 끝났으면 홈 화면으로 이동
    // 로그인 후 처리
    // 발급받은 토큰을 react app에 저장한 다음에, 다른 페이지에서 사용
    if (response.status === 200) {

      // dispatch를 사용하여 token state를 업데이트
      // dispatch에 액션(명령)을 전달하여 리듀서 함수 호출
      // 작업에 필요한 데이터를 함께 전달 (토큰과 회원 정보)
      dispatch(login(response.data))

      // react app 내부에서 페이지 이동
      navigate('/')
    }

  }

  return (
    <CustomCard>
      <CustomContainer>
        <h3>Login</h3>
        {/* form 태그에 submit 이벤트 추가 */}
        <Form onSubmit={handleSubmit}>
        {/* 폼 안의 버튼을 클릭하면 submit 이벤트 발생 */}
        {/* 폼 데이터를 서버에 전송 */}
          <Form.Group className="mb-3" controlId="member.id">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name="id" onChange={handlerChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="member.password">
            <Form.Label>패스워드</Form.Label>
            <Form.Control type="password" name="password" onChange={handlerChange} />
          </Form.Group>

          <Button variant="secondary" type="submit">로그인</Button>

        </Form>


      </CustomContainer>
    </CustomCard>
    
  )
}

export default Login