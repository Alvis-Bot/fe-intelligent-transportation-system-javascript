import React from 'react'
import {Layout, Menu} from 'antd';
import PropTypes from "prop-types";
const {Sider} = Layout;
import {useLocation, useNavigate} from "react-router-dom";
import {InstagramLogo, Signpost} from "phosphor-react";


const AntMapSider = ({ setChangeMenu }) => {


    const navigate = useNavigate()
    const {pathname} = useLocation();

    const handleMenuClick = (e) => {
        switch (e.key) {
            case 'map':
                setChangeMenu('camera');
                navigate('/map');
                break;
            case 'direction':
                setChangeMenu('direction');
                navigate('/map');
                break;
            default:
                break;
        }

    };

    const getDefaultSelectedKeys = (pathname) => {
        const pathParts = pathname.split('/');
        const firstPathSegment = pathParts[1];

        console.log(firstPathSegment);

        switch (firstPathSegment) {
            case 'map':
                return ['map'];
            case 'direction':
                return ['map'];
            default:
                return [];
        }
    };


// Sử dụng hook useLocation để lấy pathname

    const defaultSelectedKeys = getDefaultSelectedKeys(pathname);
    return (
        <Sider
            theme={'dark'}
            trigger={null} collapsible collapsed={true}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}
                onClick={handleMenuClick}
                items={[
                    {
                        key: 'map',
                        icon: <InstagramLogo size={24} />,
                        label: 'Tình trạng giao thông',
                        className: 'menu-item-custom'
                    },
                    {
                        key: 'direction',
                        icon:<Signpost size={24} />,
                        label: 'Chỉ đường',
                        className: 'menu-item-custom'
                    },
                    // {
                    //     key: '3',
                    //     icon: <UploadOutlined />,
                    //     label: 'nav 3',
                    // },
                ]}
            />
        </Sider>
    )
}

AntMapSider.propTypes = {
    setChangeMenu: PropTypes.func,
}

export default AntMapSider