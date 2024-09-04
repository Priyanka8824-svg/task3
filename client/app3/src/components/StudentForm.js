import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {NavLink,useNavigate,useParams} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {AI} from '../axios/AxiosInstance'
import useAI2 from '../hooks/useAI2'



function StudentForm(){
	const { user, setUser, accessToken,setAccessToken,
        setCSRFToken, loggedIn, setLoggedIn } = useAuth()
	const {handleSubmit,register} = useForm()
	const nav = useNavigate()
	const AI2 = useAI2()
	
	async function saveStudentsData(data){
		try {
			const res = await AI2.post('student/create/',data)
			if( res.status == 201 ){
				console.log('data saved',res)
				nav('/students/')
			}
		}
		catch(e) {
			console.log(e)
			alert("Something went wrong.!")
		}
	}

	return(
		<div className="p-3 mt-2 w-50 mx-auto p-4 ps-5 pe-5 rounded" style={{width:'40%',background:'rgb(170,240,170)'}}>	
			<h4 className="text-center mb-3">Student Form</h4>
			<form onSubmit={handleSubmit(saveStudentsData)}  class="row g-3" >
			  <div class="col-md-6">
			    <label for="inputRn" class="form-label">Roll</label>
			    <input type="number" class="form-control" {...register('roll_number')} id="inputRn" required/>
			  </div>

			  
			  <div class="col-md-6">
			    <label for="inputName" class="form-label">student_name</label>
			    <input type="text" class="form-control" {...register('student_name')} id="inputName" required/>
			  </div>

			  <div class="col-md-6">
			    <label for="inputEducation" class="form-label">education</label>
			    <input type="text" class="form-control" {...register('education')} id="inputEducation" required/>
			  </div>

			  
			  <div class="col-md-6">
			    <label for="inputCollege" class="form-label">college</label>
			    <input type="text" class="form-control" {...register('college')} id="inputCollege" required/>
			  </div>

			  <div class="col-6">
			    <button type="submit" class="btn btn-outline-success">Submit</button>
			  </div>
			</form>

		</div>
	)
}


export default StudentForm










