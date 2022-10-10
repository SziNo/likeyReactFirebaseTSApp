import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

interface CreateFormData {
  title: string
  description: string
}

const Form = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    title: yup.string().required('You must add a title.'),
    description: yup.string().required('You must add a description.'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  })

  const postsRef = collection(db, 'posts')

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      //   title: data.title,
      //   description: data.description,
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    })

    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder='Title...' {...register('title')} />
      <p style={{ color: 'red', margin: '3px' }}>{errors.title?.message}</p>
      <textarea placeholder='Description...' {...register('description')} />
      <p style={{ color: 'red', margin: '3px' }}>
        {errors.description?.message}
      </p>
      <input type='submit' className='submit-form' />
    </form>
  )
}

export default Form
