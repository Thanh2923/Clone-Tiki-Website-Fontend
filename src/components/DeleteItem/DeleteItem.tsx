import React from 'react'

interface DeLeteItem {
    onDelete:()=>void,
    onCancel:()=>void 
}

const DeleteItem:React.FC<DeLeteItem> = ({onDelete,onCancel}) => {
  return (
    <div className='w-full flex justify-center items-center fixed top-0 left-0 h-full bg-slate-900 bg-opacity-30  z-50'>
           
              <div className='lg:w-[25%] w-[50%] p-5 rounded-lg shadow-lg lg:h-[20%] h-[15%]  bg-white'>
                  <h2 className='text-slate-800 font-semibold text-md mb-5 '>Bạn có chắc muốn xoá sản phẩm không ?</h2>
                  <div className='flex gap-2 justify-end'>
                    <button onClick={onDelete} type='button' className='bg-white shadow-lg rounded-lg border py-1 text-sm px-2 border-blue-500'> Xác nhận </button>
                    <button onClick={onCancel} type='button' className=' py-1 px-5 shadow-lg text-white rounded-lg bg-blue-500'> Huỷ </button>
                  </div>
              </div>
           
    </div>
  )
}

export default DeleteItem
