import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { CustomCard, CustomContainer } from '../components/Style';
import Button from 'react-bootstrap/Button';
import { Context } from '../index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 사용자 데이터 등록 처리

const Reigster = () => {

  // 사용자가 입력한 회원 데이터를 저장할 변수
  const [member, setMember] = useState({})

  // context에서 host 가져오기
  const { host } = useContext(Context)
  
  // navigate: 페이지 이동시 사용
  const navigate = useNavigate()

  // 함수 추가
  const handleSubmit = async (event) => {
    event.preventDefault() // 페이지 이동 방지
    // 사용자가 입력한 데이터를 서버에 전송

    // 회원 등록 API 호출
    // API 메소드 종류에 따라서 axios 함수 선택
    // 실제 주소: localhost:8080/register
    // 인자: 주소, 바디데이터(json/xml 데이터), 헤더

    // javascript의 object는 json 구조체
    // API의 파라미터 형식과 member의 타입이 일치하므로 바로 대입

    // 회원가입 api는 인증정보 필요 없음. 따라서 헤더 없음
    const response = await axios.post(`${host}/register`, member)

    // 회원가입이 끝났으면 로그인 화면으로 이동
    // api 호출에 성공했으면 201 코드 반환됨
    // 요청이 끝났으면 로그인 화면으로 이동
    if (response.status === 201) {
      // react 내부에서 페이지 이동 (localhost:3000은 없어도 됨)
      navigate('/login')
    }
    
  }

  // 함수 추가
  // 사용자가 입력 필드에 내용을 변경하면 이벤트 발생
  // 입력한 내용을 꺼내서 member에 저장
  const handlerChange = (event) => {
    
    // 엘리먼트에서 필요한 프로퍼티만 추출
    const { name, value } = event.target
    
    // board에 변경된 내용 업데이트

    // 기존 member 복제
    const newMember = { ...member }

    // 특정 프로퍼티만 교체
    // ex) newMember[id] = 'user'
    newMember[name] = value

    setMember(newMember)

  }


  return (
    <CustomCard>
      <CustomContainer>
        <h3>Reigster</h3>
        {/* 폼 안에 버튼을 클릭하면 submit 이벤트 발생 */}
        {/* 사용자가 입력한 데이터를 서버에 전송 */}
        {/* form 안에 데이터를 전송할 때는 name이 있어야 함 */}
        {/* name => key */}
        <Form onSubmit={handleSubmit}>
          {/* 각 입력필드에 name 속성 추가 */}
          {/* Group컴포넌트 : div 태그 */}
          <Form.Group className="mb-3" controlId="member.id">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name='id' onChange={handlerChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="member.password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" name='password' onChange={handlerChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="member.neme">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" name='name' onChange={handlerChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="member.check">
            <Form.Check
              type="radio"
              label="사용자"
              id="member.role1"
              name='role'
              value="ROLE_USER"
              onChange={handlerChange}
          />
          <Form.Check
              type="radio"
              label="관리자"
              id="member.role2"
              name='role'
              value="ROLE_ADMIN"
              onChange={handlerChange}
          />
          </Form.Group>

          <Button variant="secondary" type='submit'>등록</Button>

        </Form>
        
      </CustomContainer>
    </CustomCard>
    
  )
}

export default Reigster;