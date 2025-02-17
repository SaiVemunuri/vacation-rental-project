"use client"
import React from 'react'

const MenuItem = ({onClick,label}) => {
  return (
    <div className='px-3 py-2 hover:bg-neutral-100 transition font-semibold text-black' onClick={onClick}>
        {label}
    </div>
  )
}

export default MenuItem
