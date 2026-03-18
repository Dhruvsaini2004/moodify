import FormGroup from "../components/FormGroup";
import "../styles/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate()
  const { loading, handelLogin } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handelSubmit = async (e) => {
    e.preventDefault();
    await handelLogin({ email, password });
    navigate('/')
  };

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <FormGroup 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          label="Email" 
          placeholder="Enter your email" />
          <FormGroup 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          label="Password" 
          placeholder="Enter your password" />
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
