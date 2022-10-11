import { useEffect, useState } from 'react'
import {
  doc,
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { db, auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Post as IPost } from '../pages/Home'

interface Props {
  post: IPost
}

interface Like {
  likeId: string
  userId: string
}

const Post = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null)

  const [user] = useAuthState(auth)
  const { post } = props

  const likesRef = collection(db, 'likes')
  const likesDoc = query(likesRef, where('postId', '==', post.id))

  const getLikes = async () => {
    const data = await getDocs(likesDoc)
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    )
  }

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      })
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where('postId', '==', post.id),
        where('userId', '==', user?.uid)
      )
      const likeToDeleteData = await getDocs(likeToDeleteQuery)
      const likeId = likeToDeleteData.docs[0].id
      const likeToDelete = doc(db, 'likes', likeId)
      await deleteDoc(likeToDelete)
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const isLiked = likes?.find((like) => like.userId === user?.uid)

  useEffect(() => {
    getLikes()
  }, [])

  return (
    <section>
      <div className='title'>
        <h1>{post.title}</h1>
      </div>
      <div className='body'>
        <p>{post.description}</p>
      </div>
      <div className='footer'>
        <p>@{post.username}</p>
        <button onClick={isLiked ? removeLike : addLike}>
          {isLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p> Likes: {likes?.length}</p>}
      </div>
    </section>
  )
}

export default Post
