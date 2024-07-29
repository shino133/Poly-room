import React from "react";

export default function Dashboard() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center">
      <div className="p-8 rounded-lg shadow-sm bg-white bg-opacity-75">
        <h6 className="text-lg font-semibold mb-2">Away from monotonous life</h6>
        <h2 className="text-4xl font-bold mb-4">Relax Your Mind</h2>
        <p className="mb-6">
          If you are looking at blank cassettes on the web, you may be very confused at the
          <br />
          difference in price. You may see some for as low as $.17 each.
        </p>
        <a
          href="#"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
