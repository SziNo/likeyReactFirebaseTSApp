import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
    navigate('/')
  }

  return (
    <section className='login'>
      <p
        style={{
          fontSize: '24px',
          color: '#6d03dd',
          marginBottom: '1rem',
        }}
      >
        Sign In With Google To Continue:
      </p>
      <button className='login-btn' onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </section>
  )
}

export default Login
