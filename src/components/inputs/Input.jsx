import React from 'react'
import { BiDollar } from 'react-icons/bi'
const Input = ({id,label,type,disabled,formatPrice,required,register,errors}) => {

  return (
    <div className='relative w-full'>
        {formatPrice && (
        <BiDollar size={24} className='text-neutral-700 absolute top-5 left-2'/>
        )}
        

        <input type={type} id={id} disabled={disabled} {...register(id,{required})} placeholder=' ' 
        className={`
            bg-transparent
            peer block w-full rounded-md border-2 px-3 pt-5 pb-2 text-gray-900 focus:ring-1 focus:ring-blue-500 outline-none text-lg
            ${formatPrice? "pl-9":"pl-4"}
            ${errors[id]? "border-rose-500":"border-neutral-400"}
            ${errors[id]? "focus:border-rose-500":"focus:border-indigo-500"}

            `}/>

          <label
            className={`
                absolute left-3 top-2 text-gray-900 text-sm transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500 peer-focus:border-none peer-focus:ring-0
                ${formatPrice?"left-9":"left-4"}
                `}
            >{label}</label>
            
      
    </div>
  )
}

export default Input
