"use client"
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'

export default function Partner() {
    return (
        <>

            <div className="flex h-full">
                <SideNav value4={true} />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Header />

                    <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'>
                        <h1 className='text-theme text-4xl'>Partner</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
