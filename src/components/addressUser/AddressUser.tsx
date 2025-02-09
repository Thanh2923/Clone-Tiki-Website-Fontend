"use client"
import Link from 'next/link'
import { useSelector,useDispatch } from 'react-redux'
import { AppDispatch,RootState } from '@/redux/store'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { fetchUsersById } from '@/redux/user/userThunk'
const AddressUser = () => {
   const dispatch = useDispatch<AppDispatch>();
   const {users} = useSelector((state:RootState)=>state.User);
   const {data:session} = useSession();
   useEffect(()=>{
     if(session){
        dispatch(fetchUsersById())
     }
    
},[session,dispatch] )
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
       <h3 className="font-semibold text-slate-800">{ users && users[0]?.name }</h3> | 
       <h3 className="font-semibold text-slate-800">{ users && users[0]?.phone }</h3> 
      
    </div>
    <span className="text-gray-500">
    { users && users[0]?.address }
    </span>
  </div>
  )
}

export default AddressUser
