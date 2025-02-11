"use client";
import { useEffect, useState } from "react";
import EditProfileForm from "./EditProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { fetchUsersById, updateUser } from "@/redux/user/userThunk";
import Link from "next/link";
import {signOut } from "next-auth/react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const ProfileCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.User);
  const { data: session } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Lấy dữ liệu user theo session ID
  useEffect(() => {
    if (session) {
      dispatch(fetchUsersById());
    }
  }, [session, dispatch]);

  // Cập nhật state khi Redux store có dữ liệu mới
  useEffect(() => {
    if (users && users.length > 0) {
      setUser(users[0]); // Lấy user đầu tiên từ mảng dữ liệu
    }
  }, [users]);

  const handleUpdate = async (updatedUser: User) => {
    await dispatch(updateUser(updatedUser)); // Dispatch action updateUser
    setUser(updatedUser); // Cập nhật state với thông tin mới
    setIsEditing(false); // Đóng form chỉnh sửa
  };

  if (!user) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-10 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Vui lòng đăng nhập để tiếp tục
        </h3>
        <Link
          href="/login"
          className="bg-blue-500 text-white text-md font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Đăng nhập
        </Link>
      </div>
    );
  }
  

  return (
   <div className="w-full">
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-5">Thông Tin Cá Nhân</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <tbody>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-gray-600">Tên</th>
              <td className="border px-4 py-2 text-gray-800">{user.name}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-gray-600">Email</th>
              <td className="border px-4 py-2 text-gray-800">{user.email}</td>
            </tr>
          
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-gray-600">Số điện thoại</th>
              <td className="border px-4 py-2 text-gray-800">{user.phone}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-gray-600">Địa chỉ</th>
              <td className="border px-4 py-2 text-gray-800">{user.address}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Chỉnh sửa thông tin
        </button>
      </div>

           <div className="w-full mt-2 lg:hidden block flex justify-end">
       <button type="button" className="text-blue-500"  onClick={() => signOut()}>Đăng Xuất</button>
      </div>

      {isEditing && <EditProfileForm user={user} onUpdate={handleUpdate} onClose={() => setIsEditing(false)} />}
    </div> 
   </div>
  );
};

export default ProfileCard;
