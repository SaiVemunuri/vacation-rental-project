import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"
import getCurrentUser from "@/actions/getCurrentUser";

export const POST=async(req)=>{
    try{
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return NextResponse.error()

    }
    const body=await req.json();
    const {listingId,startDate,endDate,totalPrice}=body


    if(!listingId||!startDate||!endDate||!totalPrice){
        return NextResponse.error()
    }

    const listingAndReservation=await prisma.listing.update({
        where:{
            id:listingId
        },
        data:{
            reservations:{
                create:{
                    userId:currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }

    });
    return NextResponse.json(listingAndReservation);
}catch(error){
    return NextResponse.json({error:error.message},{status:400})
}

}