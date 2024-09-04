import {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {AI} from '../axios/AxiosInstance'
import {NavLink,useNavigate,useParams} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAI2 from '../hooks/useAI2'

function Students(){
	const { user, setUser, accessToken,setAccessToken,
        setCSRFToken, loggedIn, setLoggedIn } = useAuth()
	const [students,setstudents] = useState([])
	const nav = useNavigate()
	const AI2 = useAI2()

	async function getStudentsData(){
		try {
			const res = await AI2.get('student/list/')
			if( res.status == 200 ){
				setstudents( res.data )
			}
		} catch(e) {
			console.log(e)
		}
	}

	async function deleteStudentsData(id){
		if ( window.confirm(`Do you wants to delete ${id} record ?`) ){
			try {
				const res = await AI2.delete(`student/delete/${id}/`)
				if( res.status == 204 ){
					console.log('deleted')
					await getStudentsData()
				}
			} catch(e) {
				console.log(e)
				alert("Something went wrong.!")
			}
		}
	}



	useEffect( ()=>{ getStudentsData() } , [] )

	return(
		<div className="p-3 mt-2">
 
			<div className="p-2">
			
				<table className="table table-bordered table-striped text-center">	
					<thead>
						<tr className="table-secondary" key="row-1">
							<th colSpan="9" className="text-center fs-5">Student Data</th>
						</tr>
						<tr key='row-2'>
							<th>roll</th>
							<th>name</th>
							<th>education</th>
							<th>college</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							students.map( e =>
								<tr key={e.id}>
									<td>{e.roll_number}</td>
									<td>{e.student_name}</td>
									<td>{e.education}</td>
									<td>{e.college}</td>
									<td>
										{
											loggedIn ?
												<>
												<NavLink className="btn btn-outline-secondary" to={`/students/update/${e.id}/`}>Update</NavLink>
												<button className="btn btn-outline-danger ms-2"
												 onClick={ ()=>{deleteStudentsData( e.id )} } type='button'>
												 	Delete
												</button>
												</>
											:
											<>
												--
											</>
										}
										
									</td>
								</tr>
							)
						}
					</tbody>
				</table>
				
			</div>
		</div>
	)
}


export default Students















