import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";


export const POST=async(req)=>{
    try{
    const currentUser=await getCurrentUser();
    
    if(!currentUser){
        return NextResponse.error();
    }
    const body=await req.json();
    const {
        title,
        imageSrc,
        description,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    }=body
    Object.keys(body).forEach((value)=>{
        if(!body[value]){
            NextResponse.error();
        }
    });

    const listing=await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue:location.value,
            price:parseInt(price,10),
            userId:currentUser.id
        }
    })
    return NextResponse.json(listing)
}catch(error){
    return NextResponse.json({error:error.message},{status:400})

}

}