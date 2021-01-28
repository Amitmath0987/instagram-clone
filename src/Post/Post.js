import React ,{useState,useEffect}from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import {db} from '../firebase';
import firebase from 'firebase';
function Post({user,postId,username,caption,imageUrl}) {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');
    useEffect(() => {
       let unsubscribe;
       if(postId){
      unsubscribe =  db.collection('posts')
       .doc(postId)
       .collection('comments')
       .orderBy('timestamp','desc')
       .onSnapshot(snapshot => {
           setComments(snapshot.docs.map((doc) => ({id: doc.id,data: doc.data()})));
       });
       }
       return () => {
           unsubscribe();
       };
    },[postId]);
    const handleComment = (event) => {
        event.preventDefault();
        db.collection('posts')
        .doc(postId)
        .collection('comments')
        .add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
    }
    return (
        <div className="post">
        <div className="post__header">
        <Avatar 
            style={{marginRight: '10px'}}
            alt={username}
            src="Avatar"
        />
        <h3 style={{fontWeight: 500}}>{username}</h3>
        </div>
       
        <img className="post__image" alt="post"src={imageUrl}/>
        
        <div className='post__caption'><strong>{username}</strong> {caption}</div>
        <div  className={'post__comments'}>
            {
                comments.map((comm) => (
                    <p key={comm.id}><strong>{comm.data.username}</strong> {comm.data.text}</p>
                ))
            }
        </div>
        
            {user?.displayName ? (<form className='post__commentBox'>
            <input className={'post__input'} type="text" placeholder="Add a Comment..." value={comment} onChange={event => setComment(event.target.value)}/>
            <button className={'post__button'} onClick={handleComment} disabled={!comment}>post</button>
        </form>): null}
        
    </div>
        
    )
}

export default Post
