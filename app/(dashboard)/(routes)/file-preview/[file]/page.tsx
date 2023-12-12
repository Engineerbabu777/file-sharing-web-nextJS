'use client';

import { app } from "@/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";


export default function FilePreview({params}:{params:any}) {


    const db = getFirestore(app);
    const [fileInfo, setFileInfo] = useState<any>(null);
    useEffect(() => {
        if(params?.file){
            getFileInfo()
        }
    },[params]);


    const getFileInfo = async() => {
        const docRef = doc(db,'uploaded-files',params.file);
        const docSnap = await getDoc(docRef);
        if(docSnap?.exists()){
            setFileInfo(docSnap.data());
        }
    }


    return(<>
    
    </>)
}