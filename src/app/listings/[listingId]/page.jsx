import { getListingById } from '@/actions/getListingById'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'

const Listings = async({params}) => {
  const listing=await getListingById({params})
  const currentUser=await getCurrentUser();
  const reservations=await getReservations(params);
  if(!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
    <ListingClient
    listing={listing}
    currentUser={currentUser}
    reservetions={reservations}
    />
    </ClientOnly>
  )
}

export default Listings
