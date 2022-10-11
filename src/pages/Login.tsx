import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    navigate('/')
  }

  return (
    <section className='login'>
      <p>Sign In With Google To Continue </p>
      <button className='login-btn' onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </section>
  )
}

export default Login
