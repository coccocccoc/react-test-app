import { useSelector } from "react-redux";
import { CustomCard, } from "../components/Style";
import { CustomContainer } from "../components/Style";

export const Home = () => {

  // console.log("HOME~~~~~~~")

  // // redux store에서 로그인 데이터 가져오기
  // useSelector(state => {
  //   console.log(state)
  //   return null
  // })

  return (
    <CustomCard>
      <CustomContainer>
        <h3>Home</h3>
      </CustomContainer>
    </CustomCard>
  )
}