"use client"
import Container from '@/components/Container'
import ListingHead from '@/components/listings/ListingHead'
import ListingInfo from '@/components/listings/ListingInfo'
import ListingReservation from '@/components/listings/ListingReservation';
import { categories } from '@/components/navbar/Categories'
import userLoginModal from '@/hooks/userLoginModal'
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const initialDateRange={
    startDate:new Date(),
    endDate:new Date(),
    key:"selection"
}

const ListingClient = ({listing,currentUser,reservetions=[]}) => {
    const loginModal=userLoginModal();
    const router=useRouter();

    const disabledDates=useMemo(()=>{
        let dates=[];
        reservetions.forEach((reservetion)=>{
            const range=eachDayOfInterval({
                start:new Date(reservetion.startDate),
                end:new Date(reservetion.endDate),

            });
            dates=[...dates,...range];
        })
        return dates;



    },[reservetions])

    const [isLoading,setIsLoading]=useState(false);
    const [totalPrice,setTotalPrice]=useState(listing.price);
    const [daterange,setDateRange]=useState(initialDateRange);

    const onCreateReservation=useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post("/api/reservations",{
            totalPrice,
            startDate:daterange.startDate,
            endDate:daterange.endDate,
            listingId:listing?.id,

        }).then(()=>{
            toast.success("Listing Reserved!")
            setDateRange(initialDateRange)
            router.push("/trips");
        }).catch(()=>{
            toast.error("Something went wrong!")

        }).finally(()=>{
            setIsLoading(false);
        })

    },[totalPrice,listing?.id,loginModal,router,daterange,currentUser])

    useEffect(()=>{
        if(daterange.startDate && daterange.endDate){
            const dayCount=differenceInCalendarDays(
                daterange.endDate,
                daterange.startDate,
            )
        
        if(dayCount && listing.price){
            setTotalPrice(dayCount*listing.price);
        }else{
            setTotalPrice(listing.price);
        }
    }

    },[daterange,listing.price])




    const category=useMemo(()=>{
        return categories.find((item)=>item.label===listing.category)

    },[listing.category])
  return (
   <Container>
    <div className='max-w-screen-lg mx-auto overflow-y-auto scrollbar-none'>
        <div className='flex flex-col gap-6'>
            <ListingHead
            title={listing.title}
            locationValue={listing.locationValue}
            id={listing.id}
            imageSrc={listing.imageSrc}
            currentUser={currentUser}
            />
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
                />
                <div className='order-first mb-10 md:order-last md:col-span-3'>
                    <ListingReservation
                    price={listing.price}
                    totalPrice={totalPrice}
                    onChangeDate={(value)=>setDateRange(value)}
                    dateRange={daterange}
                    onSubmit={onCreateReservation}
                    disabled={isLoading}
                    disabledDates={disabledDates}
                    />
                </div>
            </div>
        </div>
    </div>
   </Container>
  )
}

export default ListingClient
