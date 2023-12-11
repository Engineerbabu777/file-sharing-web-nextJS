'use client'

import React, { useState } from 'react'
import FilePreview from './FilePreview'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable
} from 'firebase/storage'
import { app } from '@/firebase'
import ProgressBar from './ProgressBar'
import { addDoc, collection, getFirestore, setDoc } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'

type Props = {}

export default function UploadForm ({}: Props) {
  const [file, setFile] = useState <any>(null)
  const [progress, setProgress] = useState<any>();
  const {user} = useUser();


  const storage = getStorage(app)
  const db = getFirestore(app);

  const saveDoc = async(file:any, fileUrl:any) => {
     const docId = Date.now().toString();
     await addDoc(collection(db,'uploaded-files'),{
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
        fileUrl: fileUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        password:'',
        id:docId,
        shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
     })
  }
  const uploadFile = async(file: any) => {
    const storageRef = ref(storage, 'file/' + file)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setProgress(progress)
      console.log('Upload is ' + progress + '% done')

      progress === 100&& getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        saveDoc(file,downloadURL)
      })
    })
  }

  const handleEvent = () => {
    if (file && file.size > 2000000) {
      alert('File size is too big')
      return
    }

    // ADD !!
    uploadFile(file)
  }

  return (
    <div className='mx-auto w-full flex justify-center flex-col items-center'>
      <div className='flex items-center justify-center w-full'>
        <label
          htmlFor='dropzone-file'
          className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg
              className='w-8 h-8 mb-4 text-blue-500 dark:text-blue-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 16'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
              />
            </svg>
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>
                <strong>Click to upload</strong>
              </span>{' '}
              or <strong>drag and drop</strong>
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            onChange={(e: any) => setFile(e?.target?.files[0])}
            id='dropzone-file'
            type='file'
            className='hidden'
          />
        </label>
      </div>

      {file && <FilePreview file={file} />}
      {file && (
        <button
          className='text-sm text-red-500 cursor-pointer'
          onClick={() => setFile(null)}
        >
          X
        </button>
      )}

      <button
        onClick={handleEvent}
        disabled={!file}
        className='p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400 '
      >
        Upload
      </button>
     {progress && <ProgressBar width={progress}/>}
    </div>
  )
}
