import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminLoggedIn from "@components/AdminLoggedIn";
export interface AdminLayoutProps {
  title: string;
  action?: any;
  children: any;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  action,
  children,
}) => {
  return (
    <div className="bg-gray-100 h-full">
        <AdminLoggedIn>
        <div className="flex">
          <div className="flex h-full w-1/5 sticky top-0">
            <div className="text-white w-full py-1 px-2 h-screen flex bg-gray-700 flex-col space-y-1">
              <span>
                <Image
                  src="/img/emblem.svg"
                  width={64}
                  height={71}
                  alt="Emblem"
                />
              </span>
              <span className="font-title text-white uppercase tracking-wider text-lg font-normal">
                Dashboard
              </span>
              <nav className="flex space-y-1 flex-col">
                <Link href="/admin">Home</Link>
                <Link href="/admin/users">Registered users</Link>
                <Link href="/admin/newsletter">Newsletter sign ups</Link>
                <Link href="/admin/enquiries">Form submissions</Link>
                <Link href="/admin/downloads">File downloads</Link>
              </nav>
            </div>
          </div>
          <div className="flex w-4/5">
            <div className="p-2 w-full">
              <div className="flex justify-between w-full">
                <h2 className="font-sans font-semibold normal-case tracking-normal text-xl text-gray-800 leading-tight flex justify-between items-center mb-2">
                  {title}
                </h2>
                <div className="w-3/4 flex items-center justify-end flex-row mb-2">
                  {action}
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                {children}
              </div>
            </div>
          </div>
        </div>
        </AdminLoggedIn>
    </div>
  );
};

export default AdminLayout;
