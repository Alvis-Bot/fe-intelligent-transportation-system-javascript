import {Layout, Tabs, theme} from "antd";
import AntMapSider from "../components/AntMapSider.jsx";
import {useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import AntHeader from "../components/AntHeader.jsx";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import StickyBox from "react-sticky-box";

const {Header, Sider, Content} = Layout;

const items =[
    //tabs
    {
        label: 'Thông tin cá nhân',
        key: '1',
        icon: <UserOutlined/>,
        className: 'custom-dropdown-item',
    },
    {
        label: 'Đăng xuất',
        key: '2',
        icon: <LogoutOutlined/>,
        className: 'custom-dropdown-item',
    },

]

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const {pathname} = useLocation();


    const renderTabBar = (props, DefaultTabBar) => (
        <StickyBox
            offsetTop={0}
            offsetBottom={20}
            style={{
                color: "white",
                zIndex: 1,
            }}
        >
            <DefaultTabBar
                {...props}


            />
        </StickyBox>
    );
    return (
        <Layout
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <AntHeader name={pathname}/>

            <Layout>

                {/*<AntSider collapsed={collapsed}/>*/}
                <Outlet/>
            </Layout>
        </Layout>
    )
}
export default DashboardLayout