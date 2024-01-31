"use client"

import Header from '../../components/Header'
import SideNav from '../../components/SideNav'

export default function Home() {

    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <h1 className='text-bold w-[60%] text-5xl text-red-600 text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] '>Landing page</h1>
            </div>
        </>
    );
}
