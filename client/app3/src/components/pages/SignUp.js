import {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {NavLink,useNavigate,useParams} from 'react-router-dom'
import {AI} from '../../axios/AxiosInstance'

function SignUp(){
	const {handleSubmit,register} = useForm()
	const nav = useNavigate()
	
	async function saveData(data){
		try {
			const res = await axios.post('http://127.0.0.1:8000/signup/',data)
			if( res.status == 201 ){
				console.log('data saved',res)
				nav('/login/')
			}
		} 
		catch(e) {
			console.log(e);
			alert('something went wrong..!')
		}
	}

	function seePassword() {
	    let signupForm = document.getElementById("signupForm")
	    if( signupForm.password.getAttribute('type') == 'text' ){
			signupForm.password.setAttribute('type','password')
	    }
	    else{
			signupForm.password.setAttribute('type','text')
	    }
	}

	return(
		<div className="p-3 mt-2">
		<div className='mx-auto p-4 ps-5 pe-5 rounded' style={{width:'40%',background:'rgb(170,240,170)'}}>	
			<h4 className="text-center mb-3"> SignUp Form </h4>

			<form onSubmit={handleSubmit(saveData)} id="signupForm">
				<label> Username: </label>
				<input type="text" {...register('username')}  placeholder="username here.."  
						className="form-control mb-2" required/>

				<label> Password: </label>
				<input type="password" {...register('password')} placeholder="password here.." 
					className="form-control mb-2" required/>

				<label> Email: </label>
				<input type="email" {...register('email')}  placeholder="email here.."  
						className="form-control mb-2" required/>

				<input type="checkbox" id="seePw" onChange={seePassword} /> <label htmlFor="seePw" 
					className='text-secondary'> see password </label><br/>
				<button className="btn btn-outline-success mt-2"> Submit </button>
			</form>
		</div>
		</div>
	)
}
export default SignUp



