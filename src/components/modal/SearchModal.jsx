"use client"
import qs from "query-string"
import useSearchModal from '@/hooks/useSearchModal'
import React, { useCallback, useMemo, useState } from 'react'
import ModalPage from './ModalPage';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { formatISO } from "date-fns";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
const STEPS={
  LOCATION:0,
  DATE:1,
  INFO:2,
}

const SearchModal = () => {
  const router=useRouter();
  const params=useSearchParams();
  const searchModal=useSearchModal();
  const [step,setStep]=useState(STEPS.LOCATION);
  const [location,setLocation]=useState()
  const [guestCount,setGuestCount]=useState(1);
  const [roomCount,setRoomCount]=useState(1);
  const [bathroomCount,setBathroomCount]=useState(1);
  const [dateRange,setDateRange]=useState({
    startDate:new Date(),
    endDate:new Date(),
    key:"selection"
  });
  const Map=useMemo(()=>dynamic(()=>import("../Map"),{
    ssr:false
  }),[location]);

  const onBack=useCallback(()=>{
    setStep((value)=>value-1);
  },[]);
  const onNext=useCallback(()=>{
    setStep((value)=>value+1);
  },[]);
 
  const onSubmit=useCallback(()=>{
    if(step!==STEPS.INFO){
      return onNext();
    }
    let currentQuery={};
    if(params){
      currentQuery=qs.parse(params.toString());
    }
    const updatedQuery={
      ...currentQuery,
      locationValue:location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }
    if(dateRange.startDate){
      updatedQuery.startDate=formatISO(dateRange.startDate);
    }
    if(dateRange.endDate){
      updatedQuery.endDate=formatISO(dateRange.endDate);
    }

    const url=qs.stringifyUrl({
      url:"/",
      query:updatedQuery,

    },{skipNull:true});
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url)


  },[step,searchModal,location,guestCount,roomCount,bathroomCount,dateRange,onNext,params])

  const actionLabel=useMemo(()=>{
    if(step===STEPS.INFO){
      return "Search";
    }
    return "Next"

  },[step])

  const secondaryActionLabel=useMemo(()=>{
    if(step===STEPS.LOCATION){
      return undefined;
    }
    return "Back";

  },[step])
  let bodyContent=(
    <div className="flex flex-col gap-8">
      <Heading  
      title={"Where do you wanna go?"}
      subTitle={"Find the perfect location!"}
      center
      />
      <CountrySelect
      value={location}
      onChange={(value)=>setLocation(value)}
      />
      <hr/>
      <Map center={location?.latlng}/>

    </div>
  )


  if(step==STEPS.DATE){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
        title={"when do you plan to go?"}
        subTitle={"Make sure everyone is free!"}
        center
        />
        <Calendar
        value={dateRange}
        onChange={(value)=>setDateRange(value.selection)}
        />
      </div>
    )
  }

  if(step==STEPS.INFO){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
        title={"More information"}
        subTitle={"Find your perfect place!"}
        center
        />
        <Counter
        title={"Guests"}
        subtitle={"How many guests are coming?"}
        value={guestCount}
        onChange={(value)=>setGuestCount(value)}
        />
        <Counter
        title={"Rooms"}
        subtitle={"How many rooms do you need?"}
        value={roomCount}
        onChange={(value)=>setRoomCount(value)}
        />
        <Counter
        title={"Bathrooms"}
        subtitle={"How many bathrooms do you need?"}
        value={bathroomCount}
        onChange={(value)=>setBathroomCount(value)}
        />
      </div>
    )
  }


  return (
    <ModalPage
    isOpen={searchModal.isOpen}
    onClose={searchModal.onClose}
    onSubmit={onSubmit}
    title={"Filters"}
    actionLabel={actionLabel}
    secondaryAction={step===STEPS.LOCATION?undefined:onBack}
    secondaryActionLabel={secondaryActionLabel}
    body={bodyContent}

    />
  )
}

export default SearchModal
