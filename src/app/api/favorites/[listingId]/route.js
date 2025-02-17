import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "../../../../libs/prismadb"


export const POST=async(req,{params})=>{
    try{
    const currentUser= await getCurrentUser();
    if(!currentUser){
        return NextResponse.error()
    }
    const {listingId}=params
    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID");
    }
    let favoriteIds=[...(currentUser.favoriteIds||[])]
    favoriteIds.push(listingId);
    const user=await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    });
    return NextResponse.json(user)
}catch(error){
    return NextResponse.json({error:error.message},{status:400})
}



}

export const DELETE=async(req,{params})=>{
    try{
    const currentUser=await  getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {listingId}=params;
    if(!listingId || typeof listingId !=="string"){
        throw new Error("Invalid ID")

    }
    let favoriteIds=[...(currentUser.favoriteIds||[])];
    favoriteIds=favoriteIds.filter((id)=>id!==listingId);
    const user=await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    });
    return NextResponse.json(user)
}catch(error){
    return NextResponse.json({error:error.message},{status:400})
}

}