import "./index.css";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Auth = () => {
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
    console.log("akshai");
  };
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
