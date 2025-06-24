// 회원 정보를 관리하는 슬라이스

import { createSlice } from "@reduxjs/toolkit"

// state 초기값
// state에 저장할 값: login 데이터
const init = {
  token: null,
  user: null
}

// 인자: 슬라이스 이름, state 초기값, 리듀서 함수
// 리듀서 함수는 나중에 추가!
export const memberSlice = createSlice({
  name: 'memberSlice',
  initialState: init,
  reducers: {
    // 발급받은 토큰과 회원정보를 state에 저장
    login: (state, action) => {
      // store에 로그인 데이터를 저장
      // state 중에서 token 저장
      state.token = action.payload.token
      // state 중에서 user info 저장
      state.user = action.payload.user

      // 로컬 스토리지에도 로그인 데이터를 저장
      // key, value
      localStorage.setItem('token', action.payload.token)
      // user는 object로 이렇게 저장 못함
      // object -> json string 변환
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    logout: (state, action) => {
      // 모든 state 초기화
      state.token = null
      state.user = null
      
      // 로그아웃시 로컬 스토리지도 초기화
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } 
  }
})

// toolkit은 리듀서 함수를 액션 함수로 자동 생성함
// 외부에서 리듀서를 편하게 호출할 수 있도록 액션 함수를 내보내기
export const {login, logout} = memberSlice.actions

// actions는 object
// object에서 login과 logout 함수 꺼내기





// react redux
// store: app에서 state를 전역적으로 관리하는 저장소
// 여러 컴포넌트에서 state를 공유
// slice: 기능별로 나눠서 state를 관리
// 예: todo 기능의 slice, 계산기 기능의 slice

// memberSlice: 회원 정보를 관리하는 저장소