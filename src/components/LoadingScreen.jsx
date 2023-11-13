import {Spin} from "antd";
import {Content} from "antd/es/layout/layout.js";

const LoadingScreen = () => {
	return (
		<Content style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
			width: "100%",
		}} className="loading-screen">
			<Spin size="large"/>
		</Content>
	)
}

export default LoadingScreen
