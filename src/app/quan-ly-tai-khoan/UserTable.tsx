"use client";
import { useEffect, useState } from "react";
import EditProfileForm from "./EditProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { fetchUsersById, updateUser } from "@/redux/user/userThunk";
import Loading from "@/components/loading/Loading";

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
    return <Loading/>
  }

  return (
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

      {isEditing && <EditProfileForm user={user} onUpdate={handleUpdate} onClose={() => setIsEditing(false)} />}
    </div>
  );
};

export default ProfileCard;
