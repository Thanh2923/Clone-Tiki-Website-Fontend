"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const placeholderText = "Nhập từ khóa tìm kiếm...";

const SearchHeader = () => {
    const [search, setSearch] = useState<string>("");
    const [displayText, setDisplayText] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayText(placeholderText.slice(0, index));
            index++;
            if (index > placeholderText.length) {
                setTimeout(() => {
                    index = 0;
                }, 1000); // Nghỉ 1 giây trước khi chạy lại
            }
        }, 100); // Thời gian delay giữa các chữ

        return () => clearInterval(interval);
    }, []);

    const handleSearch = () => {
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="w-full border h-9 rounded-lg flex items-center">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="outline-none border-0 px-5 border-r-[1px] w-full"
                placeholder={displayText} // Hiển thị từng chữ một
            />
            <Button variant="ghost" onClick={handleSearch} className="text-blue-500">
                Tìm kiếm
            </Button>
        </div>
    );
};

export default SearchHeader;
