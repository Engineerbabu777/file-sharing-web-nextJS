


export default function ProgressBar ({width=40}:{width:any}) {
  return <>
  <div className="bg-gray-400 w-full  mt-3 rounded-full h-4">
    <div className="p-1 h-4 bg-primary py-0.4   rounded-full text-[10px] text-center " style={{width:`${width}%`}}>
      {`${Number(width).toFixed(0)}%`}
    </div>

  </div>
  </>
}
