import React, { useEffect, useState } from 'react'
import Modal from './Modal'

export default function Header() {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            {openModal && <Modal setOpenModal={setOpenModal} />}
            <div className='sticky top-0 w-full left-0 bg-inherit flex items-center justify-between p-2 border-b border-solid border-white'>
                <h1 className='text-2xl select-none sm:text-4xl'>Naro Notes</h1>
                <i onClick={() => setOpenModal(true)} className="fa fa-bars text-xl duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"></i>
            </div>
        </>
    )
}
