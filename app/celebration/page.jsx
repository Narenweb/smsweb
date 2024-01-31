"use client"
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'

export default function Celebration() {
    return (
        <>

            <div className="flex h-full">
                <SideNav value1={true} />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Header />

                    <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'>
                        <h1 className='text-theme text-4xl'>Celebration</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
