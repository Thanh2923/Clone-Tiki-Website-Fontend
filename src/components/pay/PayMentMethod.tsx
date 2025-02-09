
import { Dispatch, SetStateAction } from 'react';
import './payment.css'
import Image from "next/image"

interface PaymentMethod{
  setSelected: Dispatch<SetStateAction<string>>,
  selected: string;
}
const PaymentMethod:React.FC<PaymentMethod> = ({setSelected,selected}) => {
  const methods = [
    { id: "cash", label: "Thanh toán tiền mặt", icon:<Image
      src={`/logo/paymoney.png`}
      alt=""
      width={40}
      height={40}
    /> },
    { id: "payos", label: "Zalopay", icon:<Image
      className=" w-[50px]  h-[30px] "
           src={`/logo/zalopay.png`}
           alt=""
           width={100}
           height={100}
         />
, subLabel: "Quét Mã QR từ ứng dụng ngân hàng" },
  ];

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Chọn hình thức thanh toán</h2>
      <div className="space-y-3">
        {methods.map((method) => (
          <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              className="form-radio text-blue-600"
            />
            {method.icon && <div className="text-xl">{method.icon}</div>}
            <div>
              <p className="font-medium">{method.label}</p>
              {method.subLabel && <p className="text-sm text-gray-500">{method.subLabel}</p>}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;

