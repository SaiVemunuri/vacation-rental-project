"use client"

import EmptyState from "@/components/EmptyState";
import { useEffect } from "react"

const Error = ({error}) => {
    useEffect(()=>{
        console.log(error)

    },[error]);
  return (
    <EmptyState
    title={"oops!"}
    subtitle={"something went wrong try again by refreshing"}
    />
  )
}

export default Error
