"use client"
import FormatPrice from "@/components/formatPrice/FormatPrice";
import { fetchOrderById } from "@/redux/order/orderThunk";
import { fetchOrderItemById } from "@/redux/orderItem/orderItemThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { OrderItem } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const OrderTable = ({ activeStatus }: { activeStatus: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders } = useSelector((state: RootState) => state.Order);
    const { ordersItem } = useSelector((state: RootState) => state.OrderItem);
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            dispatch(fetchOrderById());
        }
    }, [session, dispatch]);

   
    const filteredOrders = activeStatus === "all"
        ? orders 
        : orders.filter(order => order.status === activeStatus);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderItem[] | null>(null);
    const totalPrice = selectedOrder?.reduce((total, item) => {
        const itemPrice = Number(item.price); // Chuyển giá sản phẩm từ string sang number
        const itemQuantity = item.quantity; // Số lượng sản phẩm
        return total + itemPrice * itemQuantity; // Cộng giá trị sản phẩm vào tổng giá trị
      }, 0);
    useEffect(() => {
        if (ordersItem) {
            setSelectedOrder(ordersItem); 
        }
    }, [ordersItem]);
        const handleViewDetails = (id:number) => {
            
            dispatch(fetchOrderItemById(id))
        
                setSelectedOrder(ordersItem)
            
        
            setIsModalOpen(true);
        };

    // Đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-5">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">ID</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Khách hàng</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Trạng thái</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Ngày đặt hàng</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Tổng giá trị</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-slate-600">{order.id}</td>
                            <td className="px-4 py-2 text-sm text-slate-600">{order.user.name}</td>
                            <td className="px-4 py-2 text-sm text-slate-600">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                        order.status === "pending"
                                            ? "bg-blue-100 text-blue-800"
                                            : order.status === "shipped"
                                            ? "bg-indigo-100 text-indigo-800"
                                            : order.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : order.status === "cancelled"
                                            ? "bg-purple-100 text-purple-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {order.status === "pending"
                                        ? "Đang xử lý"
                                        : order.status === "shipped"
                                        ? "Đã vận chuyển"
                                        : order.status === "completed"
                                        ? "Đã hoàn thành"
                                        : order.status === "cancelled"
                                        ? "Đã huỷ"
                                        : "Chưa xác định"}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-sm text-red-500 font-semibold"><FormatPrice price={Number(order.totalPrice)}/></td>
                            <td className="px-4 py-2 text-sm">
                                <button
                                    onClick={() => handleViewDetails(order.id)}
                                    className="text-blue-500 bg-slate-100 px-2 rounded-lg hover:text-blue-700 font-semibold"
                                >
                                    Xem chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedOrder && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-5 w-1/2">
            <h3 className="text-xl font-semibold mb-4">Chi tiết đơn hàng #{selectedOrder[0]?.orderId}</h3>
            
            {/* Hiển thị thông tin chi tiết của từng sản phẩm trong đơn hàng */}
            {selectedOrder && selectedOrder.map((item, index) => (
                <div key={index} className="mb-4">
                    <div className="mb-2"><strong>Sản phẩm:</strong> {item.product.name}</div>
                    <div className="mb-2"><strong>Giới thiệu:</strong> {item.product.description}</div>
                    <div className="mb-2"><strong>Số lượng:</strong> {item.quantity}</div>
                    <div className="mb-2"><strong>Giá mỗi sản phẩm:</strong> <FormatPrice price={Number(item.price)} /></div>
                    <div className="mb-2"><strong>Ngày đặt hàng:</strong> {new Date(item.createdAt).toLocaleDateString()}</div>
                </div>
            ))}

            
            <div className="mb-4"><strong>Tổng giá trị đơn hàng:</strong> <FormatPrice price={Number(totalPrice)} /></div>

            {/* Modal đóng */}
            <div className="flex justify-end">
                <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Đóng
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default OrderTable;
