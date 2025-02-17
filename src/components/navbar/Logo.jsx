"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import {TbBrandAirbnb} from "react-icons/tb"
const Logo = () => {
  const router=useRouter()
  return (
    <div onClick={()=>router.push("/")} className='hidden sm:flex items-center justify-center gap-0 md:gap-1 cursor-pointer'>
        <div><TbBrandAirbnb className='w-8 h-8 text-red-600'/></div>
        <span className='text-2xl font-bold text-red-600'>Airbnb</span>
    </div>
  )
}

export default Logo