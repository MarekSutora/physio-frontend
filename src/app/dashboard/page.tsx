// pages/dashboard.jsx
import React from "react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div className="w-1/5 bg-white shadow-md">
        <nav className="flex flex-col space-y-4 p-4">
          <Link href="/dashboard/home">
            <a className="hover:text-blue-500">Home</a>
          </Link>
          <Link href="/dashboard/analytics">
            <a className="hover:text-blue-500">Analytics</a>
          </Link>
          <Link href="/dashboard/settings">
            <a className="hover:text-blue-500">Settings</a>
          </Link>
          <Link href="/dashboard/profile">
            <a className="hover:text-blue-500">User Profile</a>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default Dashboard;
