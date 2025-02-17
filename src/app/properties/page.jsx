
import EmptyState from "@/components/EmptyState"
import ClientOnly from "@/components/ClientOnly"
import getCurrentUser from "@/actions/getCurrentUser"
import PropertyClient from "./PropertyClient"
import getProperties from "@/actions/getProperties"


const Properties = async() => {
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title={"Unauthorized"}
                subtitle={"Please login"}
                />
            </ClientOnly>
          )
    }
    const listings=await getProperties({
        userId:currentUser.id
    });
    
    if(listings.length==0){
        return(
            <ClientOnly>
                <EmptyState
                title={"No properties found"}
                subtitle={"Looks like you have no properties"}
                />

            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <PropertyClient
            listings={listings}
            currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default Properties
