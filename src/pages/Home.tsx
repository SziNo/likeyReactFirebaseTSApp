import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import Post from '../components/Post'

export interface Post {
  id: string
  userId: string
  title: string
  username: string
  description: string
}

const Home = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null)

  const postsRef = collection(db, 'posts')

  const getPosts = async () => {
    const data = await getDocs(postsRef)
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    )
  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <main>
      {postsList?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  )
}

export default Home
