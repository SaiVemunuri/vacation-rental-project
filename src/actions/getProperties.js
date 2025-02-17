import prisma from "../libs/prismadb"

export default async function getProperties(params) {
    try{
        const {userId}=await params;
        let query={};
        if(userId){
            query.userId=userId;
        }
        const listings=await prisma.listing.findMany({
            where:query,
            orderBy:{
                createdAt:"desc"
            }
        })
        return listings;

    }catch(error){
        throw new Error("Failed to get listings");
    }
    
}