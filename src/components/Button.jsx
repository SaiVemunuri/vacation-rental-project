import React from 'react'

const Button = ({label,onClick,small, disabled, Icon, outline}) => {
  return (
    <div>
        <button
        onClick={onClick}
        disabled={disabled}
        
         className={`
        relative
        disabled:opacity-70
         disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        outline
        ${outline?"bg-white":"bg-red-500"}
        ${outline?"border-black":"border-red-500"}
        ${outline?"text-black":"text-white"}
        ${small?"py-1":"py-2"}
        ${small?"text-base":"text-lg"}
        ${small?"font-light":"font-semibold"}
        ${small?"border-2":"border-2"}

            `}>
              {Icon
              && (
                <Icon
                size={24}
                className="absolute left-4 top-3"
                />
              )
              }
            {label}
        </button>

      
    </div>
  )
}

export default Button
