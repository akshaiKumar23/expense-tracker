import "./index.css";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { userGetUserInfo } from "../../hooks/useGetUserInfo";
const Auth = () => {
  const { isAuth } = userGetUserInfo();
  const navigate = useNavigate();
  const signInWitGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };

    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
    console.log(results);
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <p className="login-heading">Sign in with Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWitGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
