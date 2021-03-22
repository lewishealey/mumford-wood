import React, { useState } from 'react';

export interface AdminLayoutProps {
    title: string;
    children: any;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
    title,
    children
}) => {

    return <div className="bg-gray-100 h-full">


    <div className="w-full">
        <div className="bg-primary-base text-white py-1 px-2">
            <nav className="max-w-7xl mx-auto flex space-x-1">
                <a href="/admin">Home</a>
                <a href="/admin/users">Users</a>
                <a href="/admin/enquiries">Enquiries</a>
                <a href="/admin/downloads">Downloads</a>
            </nav>
        </div>
    </div>

    <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-2 justify-between flex">
            <h2 className="font-sans font-semibold normal-case tracking-normal text-xl text-gray-800 leading-tight w-full flex justify-between items-center">{title}</h2>
        </div>
    </header>

    <div className="py-1">
        <div className="max-w-7xl mx-auto">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                {children}
            </div>
        </div>
    </div>
</div>
}

export default AdminLayout;
