"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { updateUser } from "@/redux/user/userThunk";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
}

interface Ward {
  code: string;
  name: string;
}

interface NewErrors {
  name: string;
  phone: string;
  addressHome: string;
  province: string;
  district: string;
  ward: string;
}

export default function AddressForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  const [provinceName, setProvinceName] = useState<string>("");
  const [districtName, setDistrictName] = useState<string>("");
  const [wardName, setWardName] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [addressHome, setAddressHome] = useState<string>("");

  const { data: session } = useSession();

  const [errors, setErrors] = useState<NewErrors>({
    name: "",
    phone: "",
    addressHome: "",
    province: "",
    district: "",
    ward: "",
  });

  const handleUpdateAddress = async () => {
    const newErrors: NewErrors = {
      name: "",
      phone: "",
      addressHome: "",
      province: "",
      district: "",
      ward: "",
    };

    if (!name) newErrors.name = "Tên không được bỏ trống!";
    if (!phone) newErrors.phone = "Số điện thoại không được bỏ trống!";
    if (!addressHome) newErrors.addressHome = "Địa chỉ thôn/xã không được bỏ trống!";
    if (!selectedProvince) newErrors.province = "Vui lòng chọn tỉnh/thành phố!";
    if (!selectedDistrict) newErrors.district = "Vui lòng chọn quận/huyện!";
    if (!selectedWard) newErrors.ward = "Vui lòng chọn phường/xã!";

    if (Object.keys(newErrors).some((key) => newErrors[key as keyof NewErrors])) {
      setErrors(newErrors);
      return; // Stop form submission if there are errors
    }

    if (session) {
      const address = `${addressHome} - ${wardName} - ${districtName} - ${provinceName}`;
      await dispatch(updateUser({ name, phone, address }));
      toast.success("Lưu thông tin thành công !");
      setTimeout(()=>{
      router.back();
      })
    }else{
     toast.info("Bạn chưa đăng nhập !");
      router.push("/login");
    }
  };

  const handleChange = (field: keyof NewErrors) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    if (field === 'name') setName(value);
    if (field === 'phone') setPhone(value);
    if (field === 'addressHome') setAddressHome(value);

    // Clear error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  useEffect(() => {
    axios
      .get<{ results: Province[] }>("https://api.mysupership.vn/v1/partner/areas/province")
      .then((response) => {
        setProvinces(response.data.results);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
    setProvinceName(e.target.options[e.target.selectedIndex].text);

    if (provinceCode) {
      axios
        .get<{ results: District[] }>(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceCode}`)
        .then((response) => {
          setDistricts(response.data.results);
        })
        .catch((error) => console.error("Error fetching districts:", error));
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard("");
    setWards([]);
    setDistrictName(e.target.options[e.target.selectedIndex].text);

    if (districtCode) {
      axios
        .get<{ results: Ward[] }>(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtCode}`)
        .then((response) => {
          setWards(response.data.results);
        })
        .catch((error) => console.error("Error fetching wards:", error));
    }
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wardCode = e.target.value;
    setSelectedWard(wardCode);
    setWardName(e.target.options[e.target.selectedIndex].text);
  };

  return (
    <div className="p-10 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-center">Nhập địa chỉ</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="p-2 border-[1px] border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded w-full"
          placeholder="Họ và tên"
          value={name}
          onChange={handleChange("name")}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}

        <input
          type="tel"
          className="p-2 border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded w-full"
          placeholder="Số điện thoại"
          value={phone}
          onChange={handleChange("phone")}
        />
        {errors.phone && <span className="text-red-500">{errors.phone}</span>}

        <input
          type="text"
          className="p-2 border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded w-full"
          placeholder="Địa chỉ thôn/xã"
          value={addressHome}
          onChange={handleChange("addressHome")}
        />
        {errors.addressHome && <span className="text-red-500">{errors.addressHome}</span>}

        <select
          className="p-2 border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          <option value="">Chọn Tỉnh/Thành phố</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
        {errors.province && <span className="text-red-500">{errors.province}</span>}

        <select
          className="p-2 border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedProvince}
        >
          <option value="">Chọn Quận/Huyện</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
        {errors.district && <span className="text-red-500">{errors.district}</span>}

        <select
          className="p-2 border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
          value={selectedWard}
          onChange={handleWardChange}
          disabled={!selectedDistrict}
        >
          <option value="">Chọn Phường/Xã</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>
        {errors.ward && <span className="text-red-500">{errors.ward}</span>}
      </div>

      <button
        onClick={handleUpdateAddress}
        className="p-3 mt-5 bg-blue-400 text-white rounded-xl w-full"
      >
        Lưu địa chỉ
      </button>
    </div>
  );
}
