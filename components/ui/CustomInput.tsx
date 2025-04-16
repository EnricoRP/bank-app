'use client'
import React from 'react'
import {
    FormField,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const CustomInput = ({ form, name, label, placeHolder, type }:
    { form: any, name: string, label: string, placeHolder: string, type: string }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className="flex flex-col w-full">
                        <FormControl>
                            <Input
                                type={type}
                                placeholder={placeHolder}
                                {...field}></Input>
                        </FormControl>
                        <FormMessage className='form-message' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput
