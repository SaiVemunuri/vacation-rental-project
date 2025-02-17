import useFavorite from '@/hooks/useFavorite';
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const HeartButton = ({listingId,currentUser}) => {
    const {hasFavorited,toggleFavorite}=useFavorite({
      listingId,
      currentUser
    })
  return (
    <div onClick={toggleFavorite}
    className='relative hover:opacity-80 transition cursor-pointer'
    >
        <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px] text-white '
        />
        <AiFillHeart
        size={24}
        className={`
            ${hasFavorited?"text-red-600":"text-neutral-500/70"}

            `}
        />
      
    </div>
  )
}

export default HeartButton
