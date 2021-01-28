import React,{useState,useEffect}from 'react'
import './Post.css';
import { db } from '../firebase';
import Post from './Post';
import { Button } from '@material-ui/core';
import ImageUploader from '../ImageUpload/ImageUpload';

function Posts(props) {

    const [posts,setPost] = useState([]);
    useEffect(() => {
      db.collection('posts')
      .orderBy('timestamp','desc')
      .onSnapshot(snapshot => {
        setPost(snapshot.docs.map(doc => ({id:  doc.id,post: doc.data() })))
      })
    },[])
    

    return (
        <div>
        <div className="app__header">
        <img alt="Instagram" className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
        
    
        {props.isAuhtenticate?
          (
            <Button variant="contained" color="primary" onClick={props.signOut}>Logout</Button>
          ):(
            <div className='app__loginContainer'>
            <Button className={'login_button'} variant="contained" color="primary" onClick={props.setOpenSignIn}>Log in</Button>
            <Button className={'signUp__button'} style={{marginLeft: '5px'}}  variant='contained' color="primary" onClick={props.setOpen}>SignUp</Button>

            </div>
          )}
        </div>

        <div className="post__parent">
              {
                posts.map(({id,post}) => (
                  <Post 
                  user={props.isAuhtenticate}
                  key={id}
                  postId={id}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                  />
                ))
              }
              
        </div>
          
        {
          props.isAuhtenticate?.displayName ? <ImageUploader username={props.isAuhtenticate.displayName}/> :
          <h1 className="login__message">Login To Upload</h1>
        }
        
        </div>
    )
}

export default Posts
