import bcrypt from "bcrypt";
import prisma from "../../../libs/prismadb"
import { NextResponse } from "next/server"
export const POST= async(req)=>{

try{
    const body=await req.json()
    const {email,name,password}=body
    const hashedPassword=await bcrypt.hash(password,12)
    const user=await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        },
    })
    return NextResponse.json(user)
}catch(error){
return NextResponse.json({error:error.message},{status:400})
}
    

   
   

    }











    // {
    //     "error": "\nInvalid `prisma.user.create()`
    //      invocation:\n\n{\n  data: {\n    email: 
    //   \"sai@gmail.com\",\n    name: \"sai\",\n 
    //password: \"1234\",\n    ~~~~~~~~\n?  
    // id?: String,\n?   emailVerified?: DateTime | Null,\n? 
    //   image?: String | Null,\n?   hashedPassword?: String |
    //    Null,\n?   createdAt?: DateTime,\n?   updatedAt?: 
    //    DateTime,\n?   favoriteIds?: UserCreatefavoriteIdsInput 
    //    | String[],\n?   accounts?: AccountCreateNestedManyWithoutUserInput,\n?  
    //     listings?: ListingCreateNestedManyWithoutUserInput,\n?   
    //     reservations?: ReservationCreateNestedManyWithoutUserInput\n 
    //  }\n}\n\nUnknown argument `password`. Available options are marked with ?."
    // }