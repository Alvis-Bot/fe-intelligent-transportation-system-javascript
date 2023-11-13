import {lazy, Suspense} from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";
import {Navigate, useRoutes} from "react-router-dom";
import {useSelector} from "react-redux";
import {DEFAULT_PATH} from "../../config.js";
import AuthLayout from "../layout/AuthLayout.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";

const Loadable = (Component) => {
    const LoadableComponent = (props) => (
        <Suspense fallback={<LoadingScreen/>}>
            {<Component {...props} />}
        </Suspense>
    );

    // Add the displayName
    LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;

    return LoadableComponent;
};

console.log('DEFAULT_PATH', DEFAULT_PATH);
export default function Router() {
    const {isLoggedIn} = useSelector(state => state.auth)

    return useRoutes([
        {
            path: "/auth",
            element: !isLoggedIn ? <AuthLayout/> : <Navigate to={DEFAULT_PATH} replace/>,
            children: [
                {
                    path: "login", element: <LoginPage/>
                }
            ]
        },
        {
            path: '/',
            element: isLoggedIn ? <DashboardLayout/> : <Navigate to="/auth/login" replace/>,
            children: [
                {element: <Navigate to={DEFAULT_PATH} replace/>, index: true},
                {path: 'map', element: <MapPage/>},
                {path: '*', element: <Navigate to="/404" replace/>},
                {path: '404', element: <Page404/>}
            ]

        },

        {path: '*', element: <Navigate to="/404" replace/>},
    ])

}

const LoginPage = Loadable(lazy(() => import('../pages/LoginPage.jsx')))
const DashboardPage = Loadable(lazy(() => import('../pages/dashboard/DashboardPage.jsx')))
const MapPage = Loadable(lazy(() => import('../pages/dashboard/MapPage.jsx')))
const Page404 = Loadable(lazy(() => import('../components/Page404.jsx')))