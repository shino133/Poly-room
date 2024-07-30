import React from "react";

export default function Dashboard() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center z-10">
      <div className="p-8 max-w-4xl w-full bg-opacity-60  rounded-lg">
       
        <h2 className="text-4xl font-extrabold mb-4 text-white">
        Chào mừng đến với FPOLY Booking
        </h2>
        <p className="mb-6 text-md text-white">
          Sử dụng nền tảng của chúng tôi để đặt phòng học một cách nhanh chóng và hiệu quả. Đăng nhập để bắt đầu ngay hôm nay.
        </p>
        <a
          href="/booking"
          className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Đặt Phòng Ngay
        </a>
      </div>
    </div>
  );
}
