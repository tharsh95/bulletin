import React from 'react'
import { DropDown } from './DropDown'
import Ellipsis from './Ellipsis'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogDemo } from './Dialog'

const BulletinCard = ({id,title,description,date,name}) => {
  return (
  
    
    <div className='bg-[#030303] border-2 border-gray-500 lg:w-[50vw] sm:w-[85vw] w-[85vw]  h-[10rem] rounded-lg'>
      <div className='text-white'>
        <div className='p-4 flex justify-between'>
          <h1>{title}</h1>
          <DropDown id={id}/>
        </div>
        <Dialog>
          <DialogTrigger asChild>
        <div className='p-4 text-gray-500 text-base hover:cursor-pointer break-all '>
          <Ellipsis text={description} maxLength={75}/>
        </div> 
          </DialogTrigger>
          <DialogDemo title={title} description={description} date={date}/>
         </Dialog>
      </div>
      <div className='p-4 flex justify-between text-white'>
        <h1>{name}</h1>
        <p>{date}</p>
      </div>
    </div>
    
  )
}

export default BulletinCard