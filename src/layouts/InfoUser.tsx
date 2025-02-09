"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";

const InfoUser = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={!session ? "/login" : "#"}
                className="text-gray-600 flex gap-2 items-center relative"
            >
                <FaRegCircleUser className="font-semibold text-[20px]" />
                <h3 className="relative cursor-pointer">
                    Hi, {session?.user?.email || "Tài khoản"}
                </h3>
            </Link>

            {/* Hiển thị dropdown khi hover */}
            {session && isOpen && (
                <div
                    className="absolute top-[13px] left-0 w-48 bg-white shadow-md border rounded-md mt-2 z-50"
                    // Khi hover vào dropdown, giữ nó mở
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link
                        href="/quan-ly-don-hang"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Quản lý đơn hàng
                    </Link>
                    <Link
                        href="/quan-ly-tai-khoan"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Quản lý tài khoản
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                        Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
};

export default InfoUser;
