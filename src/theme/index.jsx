import {ConfigProvider} from "antd";
import {createGlobalStyle} from "styled-components";
import PropTypes from "prop-types";


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ,

  #root {
    height: 100vh;
  }

  .custom-dropdown-item {
    border-radius: 0 !important;
    padding: 15px 24px !important;
    font-size: 16px;

    & > span svg {
      font-size: 18px;
    }
  }

  .menu-item-custom {
    position: relative;
    width: 100% !important;
    margin: 0 !important;
    border-radius: 0 !important;
    padding: 30px 24px !important;
    & > svg {
      position: absolute;
      top: 50%;
      right: 30px;

      transform: translateY(-50%);
      font-size: 20px;
    }
  }

  .custom-header-item {
    text-transform: uppercase;
    font-weight: 600;
  }

  .ant-tabs-tab {
    color: antiquewhite !important;
  }

  .ant-tabs-nav-wrap {
    border-bottom: 0px solid #f0f0f0;
  }

`;





const ThemeProvider= ({children}) => {


    return (
        <ConfigProvider
            //default large
            componentSize={"large"}
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                    borderRadius: 4
                }
            }}>
            <GlobalStyle/>
            {children}
        </ConfigProvider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired

}

export default ThemeProvider