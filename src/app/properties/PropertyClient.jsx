"use client"
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingCard from '@/components/listings/ListingCard'

const PropertyClient = ({listings,currentUser}) => {
  const router=useRouter();
  const [deletingid,setDeletingId]=useState("");
  const  onCancel=useCallback((id)=>{
    setDeletingId(id);
    axios.delete(`/api/listings/${id}`)
    .then(()=>{
      toast.success("listing deleted")
      router.refresh()
    })
    .catch((error)=>{toast.error(error?.response?.data?.error)})
    .finally(()=>{
      setDeletingId("");
    })

  },[router]);
  return (
    <Container>
        <Heading
        title={"Properties"}
        subTitle={"List of your properties"}
        center
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 '>
           {listings.map((listing)=>(
            <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingid===listing.id}
            actionLabel={"Delete property"}
            currentUser={currentUser}
            />
           ))}
        </div>
    </Container>
  )
}

export default PropertyClient
