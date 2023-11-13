import {createContext, useEffect} from "react";
import PropTypes from "prop-types";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../utils/firebase.js";
import {useDispatch} from "react-redux";
import {authActions} from "../redux/slices/auth.js";
import {  signOut } from "firebase/auth";
import {message} from "antd";


export const FirebaseAuthContext = createContext({
    signFirebaseOut: () => {},
});

 const AuthProvider = ({children}) => {
    
    const dispatch = useDispatch();
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(uid);
                dispatch(authActions.setCurrentUser(user));
                dispatch(authActions.setIsLoggedIn(true));
                // ...
            } else {
                dispatch(authActions.setCurrentUser(null));
                dispatch(authActions.setIsLoggedIn(false));
                // User is signed out
                // ...
            }
        });
        return () => {
            unsubscribe();
        }
    }, [dispatch]);
    
    const signFirebaseOut = () => {
        console.log("signOut");
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signOut successful");
            message.success("Sign-out successful");
        }).catch((error) => {
            // An error happened.
            console.log(error);
            message.error("Sign-out failed");
        });
    }

    return (
        <FirebaseAuthContext.Provider value={{
            signFirebaseOut,
        }}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthProvider;