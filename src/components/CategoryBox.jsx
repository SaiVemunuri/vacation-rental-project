import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from "query-string"

const CategoryBox = ({label,selected,Icon}) => {
  const router=useRouter();
  const params=useSearchParams()
  const handleClick=useCallback(()=>{
    let currentQuery={};
    if(params){
      currentQuery=qs.parse(params.toString())
    }
    const updatedQuery={
      ...currentQuery,
      category:label
    }
    if(params?.get("category")===label){
      delete updatedQuery.category
    }
    const url=qs.stringifyUrl({
      url:"/",
      query:updatedQuery
    },{skipNull:true})
    router.push(url)

  },[label,params,router])
  return (
    <div onClick={handleClick} className={`flex flex-col items-center justify-center 
        gap-2 p-3 border-b-2 hover:text-indigo-800
         transition cursor-pointer 
         ${selected?"border-b-indigo-800":"border-transparent"}
         ${selected?"text-neutral-900":"text-neutral-700"}
         `}>
            <Icon size={26}/>
            <div className='font-medium text-sm whitespace-nowrap'>{label}</div>
      
    </div>
  )
}

export default CategoryBox
