import React,{useState} from 'react';
import { Button } from '@material-ui/core'
import './ImageUploader.css';
import firebase from 'firebase';
import {storage,db } from '../firebase';

function ImageUpload({username}) {
const [caption,setCaption] = useState('');
const [image,setImage] = useState(null);
const [progress,setprogress] = useState(0);

const handleChange = (e) => {
    if(e.target.files[0]){
        setImage(e.target.files[0]);
    }
}
const handleUpload = (event) => {
    // event.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // progress functionality....
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setprogress(progress);
        },
        (error) => {
            alert(error.message);
        },
        () => {
            storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                // post image inside db....
                db.collection('posts').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: username
                });

                setprogress(0);
                setCaption('');
                setImage(null);
            });
            
        }

    );
};
    return (
        <div className='img__uploader'>
            <progress value={progress} max='100'/>
            <input type="text" placeholder="Enter a caption" value={caption} onChange={event => setCaption(event.target.value)} />
            <input type="file" onChange={handleChange}/>
            <Button size="small" variant="contained" color="primary" onClick={handleUpload} disabled={!caption || !image}>Upload Post</Button>
            
        </div>
    )
}

export default ImageUpload
