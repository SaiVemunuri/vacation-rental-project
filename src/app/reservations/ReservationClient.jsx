"use client"
import Container from "@/components/Container"
import Heading from "@/components/Heading"
import ListingCard from "@/components/listings/ListingCard"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"

const ReservationClient =({reservations,currentUser}) => {
    const router=useRouter();
    const [deletingId,setDeletingId]=useState("");

    const onCancel=useCallback((id)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation cancelled")
            router.refresh();
        }).catch(()=>{
            toast.error("Something went wrong.")
        }).finally(()=>{
            setDeletingId("");
        })

    },[router])

  return (
    <Container>
        <Heading title={"Reservations"}
        subTitle={"Bookings on your properties"}
        center
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
            {reservations.map((reservation)=>(
                <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId===reservation.id}
                actionLabel={"Cancel guest reservation"}
                currentUser={currentUser}
                />
            ))}

        </div>
    </Container>
  )
}

export default ReservationClient

