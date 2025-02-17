import { create } from "zustand";
const userLoginModal=create((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))
export default userLoginModal;