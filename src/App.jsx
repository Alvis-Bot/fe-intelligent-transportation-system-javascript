import ThemeProvider from "./theme/index.jsx";

import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store.js";
import Router from "./router/index.jsx";
import AuthProvider from "./context/FirebaseContext.jsx";


function App() {

    return (
        <>
            <ThemeProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <Provider store={store}>
                        <AuthProvider>
                            <Router/>
                        </AuthProvider>
                    </Provider>
                </PersistGate>
            </ThemeProvider>
        </>
    )
}

export default App
