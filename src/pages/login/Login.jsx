import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import { signup, login, googleLogin, resetPassword } from '../../config/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currState === "Sign up") {
        const user = await signup(username, email, password);
        toast.success("Account created successfully! Check your email for verification.");
        navigate("/chat");
      } else {
        const user = await login(email, password);
        if (!user.emailVerified) {
          toast.warning("Please verify your email before logging in.");
          return;
        }
        toast.success("Login successful!");
        navigate("/chat");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
      toast.success(`Welcome ${user.displayName || "User"}!`);
      navigate("/chat");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.warning("Please enter your email first.");
      return;
    }
    try {
      await resetPassword(email);
      toast.info("Password reset email sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className="logo" />
      <div className="glow">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{currState}</h2>

          {currState === 'Sign up' && (
            <input
              type="text"
              placeholder="Username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="E-mail"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type='submit'>
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          <button
            type='button'
            className='google-btn'
            onClick={handleGoogleLogin}
          >
            <img src={assets.google_logo} alt="" />
            Continue with Google
          </button>

          <div className="login-term">
            <input type="checkbox" className="checkbox" required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          <div className="login-forget">
            <p className="login-toggle">
              {currState === "Sign up" ? (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setCurrState("Login")}>Login here</span>
                </>
              ) : (
                <>
                  Create an account{" "}
                  <span onClick={() => setCurrState("Sign up")}>Click here</span>
                </>
              )}
            </p>

            {currState === "Login" && (
              <p onClick={handleResetPassword} className="reset-link">
                Forgot Password?
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
