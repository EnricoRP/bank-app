import React, { HTMLInputTypeAttribute } from 'react'
import {
    FormField,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from 'react-hook-form'
import { AuthFormSchema } from '@/lib/utils'
import { z } from 'zod'

interface CustomInput {
    control: Control<z.infer<typeof AuthFormSchema>>,
    name: FieldPath<z.infer<typeof AuthFormSchema>>,
    label: string,
    placeHolder: string,
    type?: HTMLInputTypeAttribute
}

const CustomInput = ({ control, name, label, placeHolder }:
    CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className="flex flex-col w-full">
                        <FormControl>
                            <Input 
                                id={name}
                                type={name === 'password' ? 'password': 'text'}
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
