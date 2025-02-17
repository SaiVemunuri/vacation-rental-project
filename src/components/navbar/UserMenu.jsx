"use client"
import React, { useCallback, useEffect, useState } from 'react'
import {AiOutlineMenu} from "react-icons/ai"
import MenuItem from './MenuItem'
import useRegisterModal from '@/hooks/userRegisterModal'
import userLoginModal from '@/hooks/userLoginModal'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import userRentModal from '@/hooks/userRentModal'
import { useRouter } from 'next/navigation'
const UserMenu = (currentUser) => {
  const router=useRouter();
  const registerModal=useRegisterModal();
  const loginModel=userLoginModal();
  const rentModal=userRentModal();
  const [isOpen,setIsOpen]=useState(false);
  const toggleOpen=useCallback(()=>{
    setIsOpen((value)=>!value);
  },[])

  useEffect(()=>{console.log(currentUser)},[currentUser])

  const onRent=useCallback(()=>{
    if(!currentUser.currentUser){
      return loginModel.onOpen();
    }
   rentModal.onOpen();
  },[currentUser.currentUser,loginModel])
  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div className='hidden md:block text-sm md:text-lg font-semibold py-3 px-3 rounded-full hover:bg-neutral-200 transition cursor-pointer' onClick={onRent}>
              Airbnb your home

            </div>
            <div className='p-4 md:py-1 md:-px-2 hover:bg-neutral-200 border-2 border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' onClick={toggleOpen}>
                <AiOutlineMenu/>
                

                <div className='hidden md:block text-gray-500'>
                    {currentUser.currentUser?(<Image alt='image' src={currentUser.currentUser.image ||"/personimage.png"} width={40} height={40} className='rounded-full'/>):(<Image alt='image' src={"/personimage.png"} width={40} height={40} className='rounded-full'/>)}
                </div>
            </div>
        </div>
        {isOpen &&(
        <div className='absolute rounded-xl shadow-lg w-[40vh] md:w-3/4 bg-white overflow-hidden right-0 top-20 text-base py-3'>
          
          <div className='flex flex-col cursor-pointer'>
            
               {currentUser.currentUser?(
               <> 
               <MenuItem onClick={()=>router.push("/trips")} label="My trips" />
               <MenuItem onClick={()=>router.push("/favorites")} label="My favorites" />
               <MenuItem onClick={()=>router.push("/reservations")} label="My reservations" />
               <MenuItem onClick={()=>router.push("/properties")} label="My properties" />
               <MenuItem onClick={()=>rentModal.onOpen()} label="Airbnb my home" />
               <hr/>
               <MenuItem onClick={()=>signOut()} label="Logout" />
               </>

               ):
               (
                <>
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                <MenuItem onClick={loginModel.onOpen} label="Login" />
                </>
               )}
            
          </div>
        </div>
        )}
      
    </div>
  )
}

export default UserMenu













{/* <>
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                <MenuItem onClick={loginModel.onOpen} label="Login" />
                </> */}


// {currentUser? (
//   <>
//   <MenuItem onClick={()=>{}} label="My trips" />
//   <MenuItem onClick={()=>{}} label="My favorites" />
//   <MenuItem onClick={()=>{}} label="My reservations" />
//   <MenuItem onClick={()=>{}} label="My properties" />
//   <MenuItem onClick={()=>{console.log("sajkn")}} label="Airbnb my home" />
//   <hr/>
//   <MenuItem onClick={()=>signOut()} label="Logout" />
//   </>
// ):(
// )











// {currentUser!==null?(
//   <>
//   <MenuItem onClick={()=>{}} label="My trips" />
//   <MenuItem onClick={()=>{}} label="My favorites" />
//   <MenuItem onClick={()=>{}} label="My reservations" />
//   <MenuItem onClick={()=>{}} label="My properties" />
//   <MenuItem onClick={()=>{console.log("sajkn")}} label="Airbnb my home" />
//   <hr/>
//   <MenuItem onClick={()=>signOut()} label="Logout" />
//   </>
//   ):(