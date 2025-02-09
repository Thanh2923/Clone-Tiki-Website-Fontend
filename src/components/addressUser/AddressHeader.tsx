"use client"
import { useSelector,useDispatch } from 'react-redux'
import { AppDispatch,RootState } from '@/redux/store'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FiMapPin } from "react-icons/fi";
import { fetchUsersById } from '@/redux/user/userThunk'
const AddressHeader = () => {
   const dispatch = useDispatch<AppDispatch>();
   const {users} = useSelector((state:RootState)=>state.User);
   const {data:session} = useSession();
   useEffect(()=>{
     if(session){
        dispatch(fetchUsersById())
     }
    
},[session,dispatch] )
  return (
   <div className='address mt-3 hidden lg:flex items-center gap-1'>
     <FiMapPin className='font-bold text-xl' /> Giao đến:
     <p className='underline font-semibold text-gray-500'>{users && users[0]?.address ? users[0]?.address : "Q.Thanh Khê, Đà Nẵng"}</p>
   </div>
  )
}

export default AddressHeader
