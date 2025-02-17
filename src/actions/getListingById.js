import prisma from "../libs/prismadb"


export const getListingById=async({params})=>{
    try{
        const {listingId}=await params;
        console.log(listingId)
        const listing=await prisma.listing.findUnique({
            where:{
                id:listingId
            },
            include:{
                user:true
            }
        });
        if(!listing){
            return null;
        }

        return listing;

    }catch(error){
        throw new Error("Error in getting listing")

    }


}