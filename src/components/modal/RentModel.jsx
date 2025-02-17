"use client"

import React, { useMemo, useState } from 'react'
import ModalPage from './ModalPage'
import userRentModal from '@/hooks/userRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { useForm ,FieldValues} from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import { stringifyError } from 'next/dist/shared/lib/utils'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const STEPS={
  CATEGORY:0,
  LOCATION:1,
  INFO:2,
  IMAGES:3,
  DESCRIPTION:4,
  PRICE:5
}

const RentModel = () => {
  const router=useRouter()

  const rentModal=userRentModal()
  const [step,setStep]=useState(STEPS.CATEGORY)
  const [isLoading,setIsLoading]=useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors,
    },
    reset,
  }=useForm({
    defaultValues:{
      category:"",
      location:null,
      guestCount:1,
      roomCount:1,
      bathroomCount:1,
      imageSrc:"",
      price:1,
      title:"",
      description:"",

    }
  })
  const category=watch("category");
  const location=watch("location");
  const guestCount=watch("guestCount");
  const roomCount=watch("roomCount");
  const bathroomCount=watch("bathroomCount");
  const imageSrc=watch("imageSrc")

  const Map=useMemo(()=>dynamic(()=>import("../Map"),{
    ssr:false

  }),[location])
  const setCostomValue=(id,value)=>{
    setValue(id,value,{
      shouldDirty:true,
      shouldTouch:true,
      shouldValidate:true,
    })
  }
  const onBack=()=>{
    setStep((value)=>value-1);
  }
  const onNext=()=>{
    setStep((value)=>value+1)
  }

  const onSubmit=(data)=>{
    if(step!==STEPS.PRICE){
      return onNext();
    }
    setIsLoading(true)
    console.log(data)
    axios.post("/api/listings",data)
    .then(()=>{
      toast.success("Listing created!")
      router.refresh()
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();

    }).catch((error)=>{
      toast.error("Something went wrong")

    }).finally(()=>{
      setIsLoading(false)
    })
}



  const actionLabel=useMemo(()=>{
    if(step==STEPS.PRICE){
      return "Create";
    }
    return "Next";

  },[step])
  const secondaryActionLabel=useMemo(()=>{
    if(step==STEPS.CATEGORY){
      return undefined;
    }
    return "Back"

  },[step])
  let bobyContent=(
    <div className='flex flex-col gap-8'>
      <Heading
      title={"Which of these best describes your place?"}
      subTitle={"Pick a category"} 
      center
      />
      <div
       className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto scrollbar-none'
      >
        {categories.map((item)=>(
        <div key={item.label} className='col-span-1'>
         <CategoryInput
         onClick={(category)=>setCostomValue("category",category)}
         selected={category==item.label}
         label={item.label}
         Icon={item.icon}
         />

        </div>

        )
        )}
      </div>
    </div>
  )

  if(step===STEPS.LOCATION){
    bobyContent=(
      <div className='flex flex-col gap-8 '>

        <Heading
        title={"Where is your place located?"}
        subTitle={"Help guests find you!"}
        center
        />
        <CountrySelect
        value={location}
        onChange={(value)=>setCostomValue("location",value)}
        />
        <Map center={location?.latlng}/>
      </div>
    )
  }

  if(step===STEPS.INFO){
    bobyContent=(
      <div
      className='flex flex-col gap-8'
      >
        <Heading
        title={"Share some information about your place"}
        subTitle={"What amenities do you have?"}
        center
        />
        <Counter
        title={"Guests"}
        subtitle={"How many guests do you allow?"}
        value={guestCount}
        onChange={(value)=>setCostomValue("guestCount",value)}
        />
        <hr/>
        <Counter
        title={"Rooms"}
        subtitle={"How many rooms do you have?"}
        value={roomCount}
        onChange={(value)=>setCostomValue("roomCount",value)}
        />
        <hr/>
        <Counter
        title={"Bathrooms"}
        subtitle={"How many bathrooms do you have?"}
        value={bathroomCount}
        onChange={(value)=>setCostomValue("bathroomCount",value)}
        />
        <hr/>
      </div>
    )
  }

  if(step==STEPS.IMAGES){
    bobyContent=(
      <div className='flex flex-col gap-8 '>
        <Heading
        title={"Add a photo of your place"}
        subTitle={"Show guests what your place looks like!"}
        center
        />
        <ImageUpload
        value={imageSrc}
        onChange={(value)=>setCostomValue("imageSrc",value)}
        />

      </div>
    )
  }
  if(step===STEPS.DESCRIPTION){
    bobyContent=(
      <div className='flex flex-col gap-8 '>
        <Heading
        title={"How would you describe your place"}
        subTitle={"Short and sweet works best!"}
        center
        />
        <Input
        id={"title"}
        label={"Title"}
        type={"text"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <hr/>
        <Input
        id={"description"}
        label={"Description"}
        type={"text"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />

      </div>
    )
  }

  if(step===STEPS.PRICE){
    bobyContent=(
      <div className='flex flex-col gap-8 '>
        <Heading
        title={"Now set your price"}
        subTitle={"How much do you charge per day?"}
        center
        />
        <Input id={"price"}
        label={"Price"}
        formatPrice={true}
        type={"number"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required

        />
      </div>

    )
  }

  return (
    <div>
      <ModalPage
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={"Airbnb your home!"}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step==STEPS.CATEGORY?undefined:onBack}
      body={bobyContent}
      />
    </div>
  )
}

export default RentModel
