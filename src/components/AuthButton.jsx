"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { LogIn } from 'lucide-react'
import { DialogDemo as AuthModel }  from './AuthModel'

const AuthButton = ({user}) => {
    const[showAuthModal,setShowAuthModal]=useState(false);
    return (
        <>
        <Button onClick={()=> setShowAuthModal(true)} variant="default" size="sm" className={"bg-orange-500 hover:bg-orange-600 gap-2"}>
            <LogIn className="w-4 h-4" />
            Sign In
        </Button>
        <AuthModel 
        isOpen={showAuthModal}
        onClose={()=> setShowAuthModal(false)}
        />
        </>
    )
}

export default AuthButton