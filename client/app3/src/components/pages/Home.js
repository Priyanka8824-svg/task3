import useAuth from '../../hooks/useAuth'

function Home(){
  const { user, setUser } = useAuth()

  return(
    <>
      <h3 className="text-center" >Home</h3>
    </>
  )
}
export default Home







