import { NextResponse } from "next/server";

import prisma from "../../../../libs/prismadb"
import getCurrentUser from "@/actions/getCurrentUser";

export const DELETE=async(req,{params})=>{
    try{
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {reservationId}=await params;
    if(!reservationId || typeof reservationId!=="string"){
        throw new Error("Invalid Id");
    }
    const reservation=await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
            OR:[
                {userId:currentUser.id},
                {listing:{userId:currentUser.id}}
            ]
        }
    })
    return NextResponse.json(reservation);
}catch(error){
    return NextResponse.json({error:error.message},{status:400});
}


}