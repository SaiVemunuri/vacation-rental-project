"use client"
import useCountries from '@/hooks/useCountries'
import useSearchModal from '@/hooks/useSearchModal'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import {BiSearch} from "react-icons/bi"
const Search = () => {
  const seachModal=useSearchModal()
  const params=useSearchParams();
  const {getByValue}=useCountries();
  const locationValue=params?.get("locationValue");
  const startDate=params?.get("startDate");
  const endDate=params?.get("endDate");
  const guestCount=params?.get("guestCount");
  const locationLabel=useMemo(()=>{
    if(locationValue){
      return getByValue(locationValue)?.label
    }
    return "Anywhere"

  },[getByValue,locationValue])
  const durationLabel=useMemo(()=>{
    if(startDate && endDate){
      const start=new Date(startDate)
      const end=new Date(endDate);
      let diff=differenceInDays(end,start)
      if(diff==0){
        diff=1;
      }
      return `${diff} Days`
    }
    return "Any week"


  },[startDate,endDate])
  const guestLabel=useMemo(()=>{
    if(guestCount){
      return `${guestCount} Guests`
    }
    return "Add Guests"
  },[guestCount])
  return (
    <div
    onClick={seachModal.onOpen}
     className='border-2 w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
        <div className='flex flex-row items-center justify-between'>
            <div className='text-sm md:text-lg font-semibold px-6'>{locationLabel}</div>
            <div className='hidden sm:block flex-1 text-sm md:text-lg px-6 text-center border-x-2 font-semibold'>{durationLabel}</div>
            <div className='text-sm md:text-lg pl-6 pr-2 text-gray-600 flex items-center gap-3'>
                <div className='hidden sm:block'>{guestLabel}</div>
                <div className='p-2 bg-red-400 text-white rounded-full'>
                    <BiSearch size={15}/>
                </div>
            </div>

        </div>

      
    </div>
  )
}

export default Search
