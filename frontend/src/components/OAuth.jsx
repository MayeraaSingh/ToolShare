import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import axios from 'axios';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
    console.log('[OAuth] Rendering OAuth component');
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const idToken = await resultsFromGoogle.user.getIdToken();
            const res = await axios.post('/api/users/google', {
                    idToken: idToken,
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }, {
                    withCredentials: true,
                })
            if (res.status === 200){
                dispatch(registerSuccess(res.data.user));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    } 
  return (
    <Button 
        className="w-full h-12 items-center flex"
        type='button' 
        gradientDuoTone='purpleToBlue' 
        outline 
        onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}