import React from 'react';
import { auth, provider } from 'config/firebase';
import './Login.css';
import { useStateValue } from 'context';

const Login: React.FC = () => {
  const [, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch({
          type: 'set_user',
          user: {
            uid: user?.uid,
            name: user?.displayName,
            photoURL: user?.photoURL,
          },
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">mitchstachat.</h1>
        <h3 className="login__text">Sign in to Mitchstachat</h3>
        <button onClick={signIn} className="login__google">
          <div className="login__googleIconWrapper">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
            />
          </div>
          <p>
            <strong>Sign In with Google</strong>
          </p>
        </button>
      </div>
    </div>
  );
};

export default Login;
