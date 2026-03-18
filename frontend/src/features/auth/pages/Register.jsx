import { Link, useNavigate } from 'react-router-dom'
import FormGroup from '../components/FormGroup'
import "../styles/register.scss"
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {

  const {loading,handelRegister} = useAuth()
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const navigate = useNavigate()

  const handelSubmit = async (e)=>{
    e.preventDefault();
    await handelRegister({email,username,password})
    navigate('/')
  }
  return (
    <main className='register-page'>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handelSubmit}>
                <FormGroup 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                label="Email" placeholder="Enter your email" />
                <FormGroup 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                label="Username" placeholder="Enter your username" />
                <FormGroup 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                label="Password" placeholder="Enter your password" />
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div> 
    </main>
  )
}

export default Register