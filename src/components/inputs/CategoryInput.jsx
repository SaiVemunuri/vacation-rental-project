import React from 'react'

const CategoryInput = ({label,Icon,selected,onClick}) => {
  return (
    <div
    onClick={()=>onClick(label)}
    className={`
        rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-indigo-800 transition cursor-pointer
        ${selected?"border-indigo-800":"border-neutral-200"}
        `}
    >
        <Icon size={30}/>
        <div className='font-semibold whitespace-nowrap'>
            {label}
        </div>

      
    </div>
  )
}

export default CategoryInput
