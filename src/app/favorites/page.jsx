import getCurrentUser from '@/actions/getCurrentUser'
import getFavoriteListings from '@/actions/getFavoriteListings'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import FavoriteClient from './FavoriteClient'

const Favorites =async() => {
    const currentUser=await getCurrentUser();
    const listings=await getFavoriteListings();
    if(listings.length==0){
        return (
            <ClientOnly>
                <EmptyState title={"No favorites found"}
                subtitle={"looks like you have no favorite listings."}
                />
            </ClientOnly>
          )
    }
    return(
        <ClientOnly>
            <FavoriteClient
            listings={listings}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
 
}

export default Favorites
