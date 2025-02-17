"use client"
import React from 'react'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {signIn} from "next-auth/react"
import {FaArrowRightToBracket} from "react-icons/fa6"
import { useState,useCallback } from 'react'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import useRegisterModal from '@/hooks/userRegisterModal'
import ModalPage from './ModalPage'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import userLoginModal from '@/hooks/userLoginModal'
import { useRouter } from 'next/navigation'

const LoginModel = () => {
    const router=useRouter();
    const registerModel=useRegisterModal()
    const loginmodel=userLoginModal()
    const [isLoading,setIsLoading]=useState(false)
    const {register,handleSubmit,formState:{errors}}=useForm({defaultValues:{
        email:"",
        password:"",
    }
    })


    const toggle=useCallback(()=>{
        loginmodel.onClose();
        registerModel.onOpen();

    },[loginmodel,registerModel])

    const onSubmit=(data)=>{
        setIsLoading(true)
        signIn("credentials",{
            ...data,
            redirect:false,
        }).then((callback)=>{
            setIsLoading(false)
            if(callback?.ok){
                toast.success("Logged in");
                router.refresh();
                loginmodel.onClose();

            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
        
    }

    const title=(
        <div className='flex items-center justify-center gap-2'>
            <h1 className='text-xl font-semibold'>Login</h1>
            <FaArrowRightToBracket size={21}/>
        </div>
    )
    const body=(
        <div className='flex flex-col gap-4'>
            <Heading title={"Welcome back to Airbnb"} subTitle={"please login to continue"} center/>
            <Input id={"email"} label={"Email"} disabled={isLoading} register={register} errors={errors} required type={"email"}/>
            <Input id={"password"} label={"Password"} disabled={isLoading} register={register} errors={errors} required type={"password"}/>
            
        </div>
    )

    const footer=(
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button outline  label={"Continue with Google"} Icon={FcGoogle} onClick={()=>signIn("google")} />
            <Button outline  label={"Continue with GitHub"} Icon={AiFillGithub} onClick={()=>signIn("github")} />
                <div className='text-neutral-500 text-center mt-4 font-light'>
                    <div className='justify-center flex flex-row items-center gap-2'>
                        <div>Don't have an account?

                        </div>
                        <div onClick={toggle} className='text-indigo-600 cursor-pointer font-bold text-lg hover:underline'>Register</div>
                    </div>
                </div>
        </div>
    )


  return (
    <ModalPage disabled={isLoading} isOpen={loginmodel.isOpen} title={title} body={body} actionLabel={"Continue"} onClose={loginmodel.onClose} footer={footer}  onSubmit={handleSubmit(onSubmit)}/>
  )
}

export default LoginModel





















           {/* <div className="relative">
                <input type="text" className='peer px-4 py-2 text-lg outline-none border-2 border-gray-700 rounded-md w-[70%] hover:border-gray-800 duration-200 focus:border-indigo-500 bg-transparent '/>
                <label htmlFor="email" className='absolute left-0 top-1/2 -translate-y-1/2 py-2 px-4 text-lg tracking-wide peer-focus:text-indigo-600 pointer-events-none duration-200 peer-focus:text-base  peer-focus:-translate-y-9 peer-focus:bg-white peer-focus:px-1 peer-focus:py-0 peer-focus:translate-x-3'>Email</label>
            </div> */}


{/* <div className="relative">
  <input type="email" id="email" placeholder=" " 
    className="peer block w-full rounded-md border border-gray-300 px-3 pt-5 pb-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
  
  <label htmlFor="email" 
    className="absolute left-3 top-2 text-gray-500 text-sm transition-all 
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
    peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500 peer-focus:border-none peer-focus:ring-0">
    Email
 </label>
</div> */}
        