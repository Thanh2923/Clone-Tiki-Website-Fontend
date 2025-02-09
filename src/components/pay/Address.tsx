import Link from "next/link"

const Address = () => {
  return (
    <div className="w-full mb-3 rounded-lg bg-white p-3">
      <div className="grid mb-3 grid-cols-12">
        <div className="col-span-9">
           <h3 className="text-lg text-gray-400">Giao tới</h3>
        </div>
        <div className="col-span-3">
             <Link href="/address" className="text-blue-500" >Thay đổi</Link>
        </div>
      </div>
      <div className="flex gap-2 mb-2 grid-cols-2">
         <h3 className="font-semibold text-slate-800">Nguyễn Văn Thành</h3> | 
         <h3 className="font-semibold text-slate-800">069695695656</h3> 
        
      </div>
      <span className="text-gray-500">
      02 đường số 22, Phường An Phú, Quận 2, HCM, Phường An Phú, Thành phố Thủ Đức, Hồ Chí Minh
      </span>
    </div>
  )
}

export default Address
