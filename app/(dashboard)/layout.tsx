import React from 'react';
import OrganizationSidebar from './_components/sidebar/org-sidebar';
import Navbar from './_components/navbar';
// import Sidebar from './_components/sidebar';

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <main className='h-full'>
            {/* <Sidebar /> */}
            <div className='pl-2 h-full'>
                <div className='flex gap-x-3 h-full'>
                    <OrganizationSidebar />
                    <div className='h-full flex-1'>
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout;
