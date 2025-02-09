"use client"
import Title from "@/components/title/Title"
import { useState } from "react"
import OrderTable from "./OrderTable";

const Page = () => {
    const [isActive, setIsActive] = useState<string>("all");
    
    // Danh sách các trạng thái
    const statuses = [
        { id: 1, label: "Tất cả đơn" , status:"all" },
        { id: 2, label: "Đang xử lý", status:"pending"  },
        { id: 3, label: "Đang vận chuyển" , status:"shipped"},
        { id: 4, label: "Đã hoàn thành" , status:"completed"},
        { id: 5, label: "Đã huỷ" , status:"cancelled"}
    ];

    return (
        <div className="w-full p-5">
            <Title title="Quản lý đơn hàng" />
            <div className="w-full bg-white">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-center">
                    {statuses.map(({ id, label,status }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setIsActive(status)}
                            className={`text-md p-3 text-center text-slate-800 font-medium ${isActive === status ? "border-b-blue-500 border-b-[2px]" : ""}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full">
                {/* Truyền trạng thái đã chọn vào OrderTable */}
                <OrderTable activeStatus={isActive} />
            </div>
        </div>
    );
}

export default Page;
