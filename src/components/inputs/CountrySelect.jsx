"use client"
import useCountries from "@/hooks/useCountries";
import Select from "react-select";
const CountrySelect = ({value,onChange}) => {
    const {getAll}=useCountries();
  return (
    <div>
        <Select placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value)=>onChange(value)}
        formatOptionLabel={(option)=>(
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div className="text-neutral-950">{option.label}, 
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>

          </div>
        )}
        classNames={{
          control:()=>"p-3 border-2",
          option:()=>"text-lg",
          input:()=>"text-lg",
        }}
        theme={(theme)=>({
          ...theme,
          borderRadius:6,
          colors:{
            ...theme.colors,
            primary:"black",
            primary25:"#ffe4e6"
          }
        })}
        />
      
    </div>
  )
}

export default CountrySelect

