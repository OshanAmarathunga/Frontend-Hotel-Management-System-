import app from '../config/firebase'
import { getDownloadURL, getStorage,ref, uploadBytes } from 'firebase/storage';

const firebaseApp=app;
const storage = getStorage(firebaseApp, "gs://hotel-management-89-bae73.appspot.com");


export default async function uploadMedia(file){
    if(file==null){
        return 
    }
    const fileRef=ref(storage,file.name);
    try{
        const snapshot=await uploadBytes(fileRef,file);
        const url =await getDownloadURL(snapshot.ref);
        return url;
    }
    catch(e){
        console.error("error file uploding",e)
    }
    
}

