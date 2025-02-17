"use client"
import useCountries from "@/hooks/useCountries"
import {IconType} from "react-icons"
import ListingCategory from "./ListingCategory";

import dynamic from "next/dynamic";
const Map=dynamic(()=>import("../Map"),{
    ssr:false
})
const ListingInfo = ({user,category,description,roomCount,guestCount,bathroomCount,locationValue}) => {
    const {getByValue}=useCountries();
    const cordinates=getByValue(locationValue)?.latlng;
    


  return (
    <div className="flex col-span-4 flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex flex-row gap-2 items-center">
                <div>Hosted by {user?.name} </div>

            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <div>{guestCount} guests</div>
                <div>{roomCount} room</div>
                <div>{bathroomCount} bathrooms</div>

            </div>
        </div>
        <hr/>
        {category && (
        <ListingCategory
        Icon={category.icon}
        description={category.description}
        label={category.label}
        />

        )}
        <hr/>
        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>
        <hr/>
        <Map center={cordinates}/>

        
      
    </div>
  )
}

export default ListingInfo
