import {useState} from 'react' 
import useAI2 from '../hooks/useAI2'

function Navbar(){
	const nav = useNavigate()
	const { user, setUser, accessToken,setAccessToken,
        setCSRFToken, loggedIn, setLoggedIn } = useAuth()
    const AI2 = useAI2()

	async function logoutUser () {
		if ( window.confirm(`Do you wants log out ?`) ){
			try{
		    	const res = await AI2.post('logout/')
		    	console.log( res )
		  	}
		    catch(e){
		    	console.log(e)
	    	}
	    	finally {
	            setUser({ username:null })
	            setAccessToken(null)
	            setCSRFToken(null)
	            setLoggedIn(null)
	            nav(`/login/`)
	        }
	    }
	}

	return(
		<>

			<nav className="navbar navbar-expand-lg bg-body-tertiary fs-5">
			  <div className="container-fluid">
			    
				<NavLink className="navbar-brand fs-4" 
						style={{fontFamily:'cursive',fontStyle:'oblique',fontWeight:'1000'}} 
						to="/home"> StudentApp </NavLink>
			    
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
							aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			      
				  <span className="navbar-toggler-icon"></span>
			    </button>

			    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			      <div className="navbar-nav">
			    
				    <NavLink className="nav-link active" aria-current="page" to="/home/"> Home </NavLink>
			      	{
			      		loggedIn ?
			      			<>
						     	<NavLink className="nav-link" to="/students/"> Students </NavLink>
				      			<NavLink className="nav-link" to="/students/add/"> Add Students </NavLink>
			        		</>
			        		:
			        		<>
						     	<NavLink className="nav-link disabled" to="/students/"> Students </NavLink>
				      			<NavLink className="nav-link disabled" to="/students/add/"> Add Students </NavLink>			        			
			        		</>

			      	}			        
			      </div>

			      <div className="navbar-nav ms-auto">
			      	{
			      		loggedIn ?
			      			<>
						        <NavLink className="nav-link text-danger" > -{user.username}- </NavLink>
				        		<NavLink className="nav-link" onClick={logoutUser}> Logout </NavLink>
			        		</>
			        		:
			        		<>
						      	<NavLink className="nav-link" to="/login/"> Login </NavLink>
						        <NavLink className="nav-link" to="/signup/"> SignUp </NavLink>	
			        		</>
			      	}
			      </div>
			    </div>
			  </div>
			</nav>
		</>
	)
}
export default Navbar
















