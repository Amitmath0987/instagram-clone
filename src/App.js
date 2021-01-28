import React,{useState,useEffect} from 'react'
import './App.css';
// import {Route,Switch} from 'react-router-dom';
import {auth} from './firebase'
import Posts from './Post/Posts';
import { Modal,makeStyles,Button} from '@material-ui/core';
import Loader from './Loader/Loader';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  // Post uploader.....
  // Modal related styles...
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  // end of styles.....
  const [open,setOpen] = useState(false);
  const [opensignIn,setOpenSignIn] = useState(false);
  // Signup related code...
  const [username,setUsername]  = useState('');
    const [email,setEmail]  = useState('');
   const [password,setPassword] = useState('');
   const [error,setError] = useState();
   const [user,setUser] = useState(null);
   const[loading,setLoader] = useState(false)
    // Authentication for SignUp.......

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authuser => {
        if(authuser){
            // user has logged in...
            console.log(authuser)
            setUser(authuser)
        } else{
            // user has logfed out...
            setUser(null)
        }
        
    })
        return () => {
            // performs some cleanup actions..
            unsubscribe();
        }
},[user,username]);

   const signupHandler =(event) => {
    event.preventDefault();
    setLoader(true);
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authuser) => {
        return authuser.user.updateProfile({
            displayName: username
        }),
        setLoader(false),
        setOpen(false),
        setPassword(''),
        setEmail(''),
        setUsername('')
    })
    .catch(error => {setError(error.message,
      setLoader(false))});
   }
   const signInHandler =(event) => {
    event.preventDefault();
    setLoader(true);
    auth.signInWithEmailAndPassword(email,password)
    .then(
      setOpenSignIn(false)
    )
    .catch(error => {setError(error.message)
    })
    setEmail('');
    setPassword('');
    setLoader(false);
   }
   let modal = null
  if(loading){
    modal = <Loader />
  }
  return (
    <div className='app'>
    <Modal 
    open={open}
    onClose={() => setOpen(false)}>
      <div style={modalStyle} className={classes.paper}>
      <div className='login'>
      <img className='loginHeader' alt="Instagram" src="https://st2.depositphotos.com/5520090/12361/v/600/depositphotos_123616274-stock-illustration-sketch-instagram-modern-camera-logo.jpg" />
      <h2 style={{fontWeight: '400',color: '#8e8e8e'}}>Sign up to see photos and videos from your friends.</h2>
          {modal}
      <form className="login__form">

      <input value={email} onChange={(event) => setEmail(event.target.value)} className='Login__input'  type="text"placeholder='Enter email'/>

      <input value={username} onChange={(event) => setUsername(event.target.value)} className='Login__input' type='text' placeholder='FullName'/>

      <input  value={password} onChange={(event) => setPassword(event.target.value)}className='Login__input'  type="password"placeholder='Password'/>

     <Button type='submit' variant='contained' color="primary" onClick={(event) => signupHandler(event)}>Signup</Button>
      
      </form>
      <p style={{color:'salmon'}}>{error}</p>
      </div>
        
      </div>
      </Modal>
        {/********** Login Modal **********/}

        <Modal 
        open={opensignIn}
        onClose={() => setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
          <div className='login'>
          <img className='loginHeader' alt="Instagram" src="https://st2.depositphotos.com/5520090/12361/v/600/depositphotos_123616274-stock-illustration-sketch-instagram-modern-camera-logo.jpg" />
          <h2 style={{fontWeight: '400',color: '#8e8e8e'}}>Login to see photos and videos from your friends.</h2>
            {modal}
          <form className="login__form">

          <input value={email} onChange={(event) => setEmail(event.target.value)} className='Login__input'  type="text"placeholder='Enter email'/>

          <input  value={password} onChange={(event) => setPassword(event.target.value)}className='Login__input'  type="password"placeholder='Password'/>

         <Button type='submit' variant='contained' color="primary" onClick={(event) => signInHandler(event)}>Log in</Button>
          
          </form>
          <p style={{color:'salmon'}}>{error}</p>
          </div>
          </div>
        </Modal>
    <Posts setOpen={() => setOpen(true)
    }
    isAuhtenticate={user}
    signOut={() => auth.signOut()}
    setOpenSignIn={() => setOpenSignIn(true)}
    />
    
    
    </div>
  );
}

export default App;
