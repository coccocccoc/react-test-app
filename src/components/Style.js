// 로그인, 회원가입, 게시물 관리 화면에서 사용할 공통 스타일
import styled from "styled-components";


export const CustomCard = styled.div`
  width: 1150px;
  height: 800px;
  background-color: white;
  border-radius: 16px;
  border: none;
  padding: 24px;
  margin: 50px;
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.15);
`

export const CustomContainer = styled.div`
  width: 100%;
  height: 100%;
  /* 자석 아이템 */
  display: flex;
  flex-direction: column;
  gap: 10px;
`