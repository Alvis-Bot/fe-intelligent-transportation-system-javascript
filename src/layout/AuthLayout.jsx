import styled from "styled-components";
import {Button, Card, Layout, Typography} from "antd";

const {Title} = Typography;
const {Content} = Layout;
import image from "../assets/images/bg-signup.jpg";
import {FacebookOutlined, GithubOutlined, GoogleOutlined} from "@ant-design/icons";
import LoginForm from "../components/forms/LoginForm.jsx";
import {Outlet} from "react-router-dom";




const LoginHeader = styled.div`
  height: 550px;
  width: 100%;
  margin-top: -62.8px;
  padding-top: 137.8px;
  border-radius: 12px;
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

`

const LoginHeaderOverlay = styled.div`
  color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% + 1px);
  background: linear-gradient(45deg,
  rgba(0, 0, 0, 0.03) 0%,
  rgba(0, 0, 0, 0.3) 100%);


`


const AuthLayout = () => {


    return (
        <>
            <Layout
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    backgroundColor: "#f0f2f5",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <LoginHeader>
                    <LoginHeaderOverlay
                        className="content">
                        <Title style={{color: "white"}}>LOGIN</Title>
                        <p style={{
                            //text lg
                            color: "white",
                            textAlign: "center",
                            maxWidth: "600px"

                        }}>
                            Đăng nhập để sử dụng các tính năng của hệ thống
                        </p>
                    </LoginHeaderOverlay>
                </LoginHeader>
                <Outlet/>
            </Layout>
        </>

    )
}

export default AuthLayout