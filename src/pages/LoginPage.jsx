import {Button, Card, Divider} from "antd";
import {FacebookOutlined, GithubOutlined, GoogleOutlined} from "@ant-design/icons";
import styled from "styled-components";
import LoginForm from "../components/forms/LoginForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import OTPForm from "../components/forms/OTPForm.jsx";
const LoginCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  border-radius: 12px;
  margin-top: -190px;
  margin-bottom: 20px;
`

const LoginGateways = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;

`


const LoginPage = () => {
    const { isSending } = useSelector(state => state.app)


    return (
        <LoginCard
            title={<h5>Login With</h5>}
            bordered={false}
        >
            <LoginGateways>
                <Button
                    style={{

                        backgroundColor: "#24292e",
                        borderColor: "#24292e"
                    }}
                    type="primary" shape="circle" icon={<GithubOutlined style={{color: "white"}}/>}/>
                <Button
                    style={{

                        backgroundColor: "#4285f4",
                        borderColor: "#4285f4"
                    }}
                    type="primary" shape="circle" icon={<GoogleOutlined/>}/>
                <Button
                    style={{

                        backgroundColor: "#3b5998",
                        borderColor: "#3b5998"
                    }}
                    type="primary" shape="circle" icon={<FacebookOutlined/>}/>
            </LoginGateways>
            <Divider>Or</Divider>
            {
                isSending ? <OTPForm/> : <LoginForm/>
            }

        </LoginCard>
    )
}

export default LoginPage