import React from "react"
import Chest from '../exercises/Chest'
import Back from "../exercises/Back"
import Shoulder from "../exercises/Shoulder"
import Leg from '../exercises/Leg'

const Options = () =>{
    return(
        <>
        <button>Choose a category!!</button>
        <Chest />
        <Leg />
        <Shoulder />
        <Back />
        </>
       
    ) 
   
    
}

export default Options