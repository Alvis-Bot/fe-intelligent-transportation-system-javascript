import {Avatar, Breadcrumb, Button, Col, Dropdown, Menu, message, Row, Space} from "antd";
import PropTypes from "prop-types";
import {LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {FirebaseAuthContext} from "../context/FirebaseContext.jsx";
import styled from "styled-components";
import {Layout} from "antd";
import logo from "../assets/images/logo.ico";

const {Header} = Layout;

const items = [{
    label: 'Thông tin cá nhân', key: '1', icon: <UserOutlined/>, className: 'custom-dropdown-item',
}, {
    label: 'Đăng xuất', key: '2', icon: <LogoutOutlined/>, className: 'custom-dropdown-item',
},];

const items1 = [
    {
        label: 'Trang chủ',
        key: '1',
        className: 'custom-header-item',
    },
    {
        label: 'Bản đồ',
        key: '2',
        className: 'custom-header-item',
    }
]
const AntHeader = ({name}) => {


    const {signFirebaseOut} = useContext(FirebaseAuthContext)

    const handleMenuClick = (e) => {
        console.log(e.key);
        switch (e.key) {
            case '1':
                message.info("Thông tin cá nhân");
                break;
            case '2':
                signFirebaseOut()
                break;
            default:
                break;
        }
    }
    return (<Header
        style={{
            background: "#001529",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "30px",

        }}
    >
        {/*LOGO*/}
        <div
            style={{
                display: "flex",
                alignItems: "center",
            }}
            className="logo">
            <img src={logo} style={{
                width: "50px",
                height: "50px",
                marginRight: "10px"
            }}
                 alt="logo"/>
            <span style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                // uppercase: "capitalize"
                textTransform: "uppercase"
            }}>
                ALPHACODE
            </span>
        </div>
        {/*MENU*/}
        <Menu
            style={{
                width: "100%"
            }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
        />

        {/*USER*/}
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: "10px"
            }}
        >
            <Avatar
                style={{
                    cursor: "pointer"
                }}
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="avatar"
            />
            <Dropdown
               menu={{
                    items,
                    onClick: handleMenuClick,
               }}
                trigger={["click"]}
                placement="bottomRight"
            >
                <Button
                    type="text"
                    style={{
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "uppercase"
                    }}
                >
                    Alvis Kuo
                </Button>
            </Dropdown>
        </div>
    </Header>)
}

AntHeader.propTypes = {
    name: PropTypes.string.isRequired
}


export default AntHeader