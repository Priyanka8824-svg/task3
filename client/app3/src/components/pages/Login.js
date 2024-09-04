import {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {AI} from '../../axios/AxiosInstance'
import useAuth from '../../hooks/useAuth'
import {useNavigate} from 'react-router-dom'

function Login(){
  const { register,handleSubmit } = useForm()
  const {user,setUser,setAccessToken, setRefreshToken, setCSRFToken, setLoggedIn } = useAuth()
  const nav = useNavigate()

  async function loginUser( data ){
    try{
      const response = await AI.post('signin/',data)
      console.log( response )
      if(response.status==200){
        setAccessToken(response?.data?.access)
        setCSRFToken(response.headers["x-csrftoken"])
        
        async function verifyUser() {
            try {
                const res = await AI.get('user/info/')
                console.log( res )
                setUser({ username:res?.data?.username })
                setLoggedIn( true )
            }
            catch(error){
              console.log( error )
            }
        }
        await verifyUser()
        nav('/home/')
      }
    }
    catch(e){
      console.log( e )
    }
  }

  function seePassword() {
    let loginForm = document.getElementById("loginForm")
    if( loginForm.password.getAttribute('type') == 'text' ){
      loginForm.password.setAttribute('type','password')
    }
    else{
      loginForm.password.setAttribute('type','text')
    }
  }

  return(
    <div className="p-3 mt-2">
      <div className='mx-auto p-4 ps-5 pe-5 rounded' style={{width:'40%',background:'rgb(170,240,170)'}} >
        <h4 className="text-center mb-3"> Login Form </h4>

        <form onSubmit={handleSubmit(loginUser)} id="loginForm">
          <label> Username: </label>
          <input name='username' {...register('username')} type="text" className="form-control mb-2" 
                  placeholder="username here.." required/>
          
          <label> Password: </label>
          <input name='password' {...register('password')} type="password" className="form-control mb-2" 
                placeholder="password here.." required/>
          
          <input type="checkbox" id="seePw" onChange={seePassword} /> <label htmlFor="seePw" className='text-secondary'>
              see password</label><br/>

          <button type="submit" className="btn btn-outline-primary mt-3"> Submit </button>
          
        </form>
      </div>
    </div>
  )
}
export default Login







