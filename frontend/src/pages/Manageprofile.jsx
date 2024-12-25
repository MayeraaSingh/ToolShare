import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess,} from '../redux/userSlice';
import {HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';


export default function DashProfile() {
  const {currentUser, error, loading} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading,setImageFileUploading] = useState(null);
  const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null);
  const [imageFileError, setImageFileError] = useState(null);
  const [showModal,setShowModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const dispatch = useDispatch();
  const filePickerRef = useRef();

  const handleImageChange  = (e) => {
    const file = e.target.files[0];
    if (file){
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect ( () => {
    if (imageFile) {
      uploadImage();
    }
  },[imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileError('Could not upload image');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData,profilePicture: downloadURL});
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Image is uploading, please wait')
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json',},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully");
      }
    } catch (error) {
        console.log(error);
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' 
        onClick={() => filePickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar 
              value={imageFileUploadProgress || 0} 
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top: 0,
                  left:0
                },
                path:{
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress/100})`,
                },
              }}
              />
          ) }
          <img 
            src={imageFileUrl || currentUser.profilePicture} 
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]
            ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />

        </div>
         {imageFileError && <Alert color='failure'>{imageFileError}</Alert> }
        <TextInput 
          type='text' 
          id='name' 
          placeholder='name' 
          defaultValue={currentUser.username}
          onChange={handleChange}/>
        <TextInput 
          type='email' 
          id='email' 
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange} />
        <TextInput 
          type='text' 
          id='flat' 
          placeholder='flat number' 
          onChange={handleChange}/>

        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled= {loading || imageFileUploading} >
          {loading ? 'loading...' : 'Update'}
        </Button>
      </form>
  </div>
  )
}
