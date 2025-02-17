import React from 'react'
import {GiFarmer,GiTreehouse,GiWoodCabin,GiIsland,GiWaterfall,GiLighthouse,GiPisaTower,GiCampingTent,GiWatchtower} from "react-icons/gi"
import { TbBeachOff,TbIcons,TbToolsKitchen } from 'react-icons/tb'
import {FaSwimmingPool,FaCity,FaRegSnowflake} from "react-icons/fa"
import {FaBed,FaSailboat,FaPersonSkiing} from "react-icons/fa6"
import {MdOutlineBed,MdHouseboat,MdSurfing} from "react-icons/md"
import {BsShopWindow} from "react-icons/bs"
import {BiSolidCastle} from "react-icons/bi"
import {PiWindmillFill,PiMountainsBold,PiWarehouse,PiParkFill,PiShippingContainer,PiGolfBold,PiCactusBold} from "react-icons/pi"
import Container from '../Container'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'




export const categories=[
    {
        label:"Beach",
        icon:TbBeachOff,
        description:"This property is close to the beach!"
    },
    {
        label:"Windmills",
        icon:PiWindmillFill,
        description:"This property has windmills!"
    },
    {
        label:"Farms",
        icon:GiFarmer,
        description:"This property has Farms!"
    },
    {
        label:"Tree Houses",
        icon:GiTreehouse,
        description:"This property has wonderfull tree houses!"
    },
    {
        label:"Cabins",
        icon:GiWoodCabin,
        description:"This property has cabins!"
    },
    {
        label:"Island",
        icon:GiIsland,
        description:"This property in islands!"
    },
    {
        label:"Waterfalls",
        icon:GiWaterfall,
        description:"This property has Amazing waterfalls!"
    },
    {
        label:"Light Houses",
        icon:GiLighthouse,
        description:"This property is near light house!"
    },
    {
        label:"Top Cities",
        icon:GiPisaTower,
        description:"This property in top cities!"
    },
    {
        label:"Campings",
        icon:GiCampingTent,
        description:"This property has outside open campings!"
    },
    {
        label:"Towers",
        icon:GiWatchtower,
        description:"This property has Towers!"
    },
    {
        label:"Icons",
        icon:TbIcons, 
        description:"This property has Icons!"
    },
    {
        label:"Chef's Kitchen",
        icon:TbToolsKitchen, 
        description:"This property has beautiful kitchen!"
    },
    {
        label:"Amazing Pools",
        icon:FaSwimmingPool,
        description:"This property has Amazing pools!"
    },
    {
        label:"Country side",
        icon:FaCity,
        description:"This property in country side!"
    },
    {
        label:"Arctic",
        icon:FaRegSnowflake,
        description:"This property has full of Snowflakes!"
    },
    {
        label:"Bed Breakfast",
        icon:FaBed,
        description:"This property has Beds!"
    },
    {
        label:"Boats",
        icon:FaSailboat,
        description:"This property has Boats!"
    },
    {
        label:"Skiing",
        icon:FaPersonSkiing,
        description:"This property has skiing!"
    },
    {
        label:"Rooms",
        icon:MdOutlineBed,
        description:"This property has Amazing rooms!"
    },
    {
        label:"Boat House",
        icon:MdHouseboat,
        description:"This property has boathouse!"
    },
    {
        label:"Surfing",
        icon:MdSurfing,
        description:"This property has surfing!"
    },
    {
        label:"Amazing Views",
        icon:BsShopWindow,
        description:"This property has breadthtaking views!"
    },
    {
        label:"Castles",
        icon:BiSolidCastle,
        description:"This property has Castles!"
    },
    {
        label:"Top World",
        icon:PiMountainsBold,
        description:"This property has Mountians!"
    },
    {
        label:"Mansions",
        icon:PiWarehouse,
        description:"This property has mansions!"
    },
    {
        label:"National Parks",
        icon:PiParkFill,
        description:"This property has national park!"
    },
    {
        label:"Containers",
        icon:PiShippingContainer,
        description:"This property has ontainers!"
    },
    {
        label:"Golf Kings",
        icon:PiGolfBold,
        description:"This property has golf places!"
    },
    {
        label:"Deserts",
        icon:PiCactusBold,
        description:"This property has deserts!"
    },
    
]


const Categories = () => {
    const params=useSearchParams()
    const category=params?.get("category");
    const pathname=usePathname()
    const isMainPage=pathname==="/"
    if(!isMainPage){
        return null;
    }
  return (
    <Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto scroll-smooth scrollbar-none'>
            {categories.map((item)=>(
                <CategoryBox key={item.label} label={item.label} Icon={item.icon} selected={category===item.label}/>
            ))}

        </div>
    </Container>
  )
}

export default Categories
