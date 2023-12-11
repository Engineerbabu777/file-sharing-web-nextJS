import Image from 'next/image'

export default function FilePreview ({ file }: { file: any }) {
  return (
    <>
      <div className="flex items-center flex-col gap-2">
        {/* <Image 
        src={"/file.png"}
        width={50}
        height={50}
        alt={"file"}
        /> */}
        <h2>{file?.name}</h2>
        <h2 className="text-[12px] text-gray-400">
          {file?.type} / {(file?.size / 1024 / 1024).toFixed(2)}MB
        </h2>
      </div>
    </>
  )
}
