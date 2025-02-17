import useCountries from '@/hooks/useCountries'
import React from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

const ListingHead = ({title,imageSrc,locationValue,id,currentUser}) => {
  const {getByValue} =useCountries();
  const location=getByValue(locationValue)
  return (
    <div>
      <Heading
      title={title}
      subTitle={`${location?.region} , ${location?.label}`}
      
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image alt='Image' src={imageSrc} fill className='object-cover w-full'/>
        <div className='absolute top-5 right-5'>
          <HeartButton
          listingId={id}
          currentUser={currentUser}
          />
        </div>
      </div>
      
    </div>
  )
}

export default ListingHead
