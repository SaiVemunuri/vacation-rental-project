import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "../../../../libs/prismadb";

export const DELETE=async(req,{params})=>{
    try{
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {listingId}=await params;
    if(!listingId||typeof listingId!=="string"){
        throw new Error("Invalid ID");
    }
    const listing=await prisma.listing.deleteMany({
        where:{
            id:listingId,
            userId:currentUser.id
        }
    })
    return NextResponse.json(listing)
}catch(error){
    return NextResponse.json({error:error.message},{status:400})
}


}