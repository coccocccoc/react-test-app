import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";


const LayoutDiv = styled.div`
  background-color: #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Layout = () => {
  
  return (
    <LayoutDiv>
      <Header></Header>
      <Outlet></Outlet> 
    </LayoutDiv>
  )
}

export default Layout;