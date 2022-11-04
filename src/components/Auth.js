import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)

   const url = 'http://localhost:4000'
 
   const submitHandler = e => {
       e.preventDefault()
       

       const body = {
        username,
        password
       }

       axios.post(register ? `${url}/register` : `${url}/login`, body)
       .then(({data}) => {
        authCtx.login(data.token, data.exp, data.userId)
        console.log("AFTER AUTH", data)
       })
       .catch(err => {
        setPassword('')
        setUsername('')
       })
   }
 
   return (
       <main>
        
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type='type'
                   placeholder='username'
                   values={username}
                   onChange={e => setUsername(e.target.value)}/>
               <input
                   className='form-input'
                   type='type'
                   placeholder='password'
                   values={password}
                   onChange={e => setPassword(e.target.value)}
                   />
                   
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>{register ? 'Login' : 'Sign Up'}</button>
       </main>
   )
}
 
export default Auth