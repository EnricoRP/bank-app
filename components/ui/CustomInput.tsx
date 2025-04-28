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

const formSchema = AuthFormSchema('Sign-In')
interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeHolder: string,
    type?: HTMLInputTypeAttribute,
    autoComplete?: string,
    onChange?: (value: string) => void
}

const CustomInput = ({ control, name, label, placeHolder, autoComplete = '', onChange }:
    CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel htmlFor={name} className='form-label' >
                        {label}
                    </FormLabel>
                    <div className="flex flex-col w-full">
                        <FormControl>
                            <Input
                                id={name}
                                autoComplete={autoComplete === '' ? name : autoComplete}
                                type={name === 'password' ? 'password' : 'text'}
                                placeholder={placeHolder}
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (onChange) {
                                        onChange(e.target.value);
                                    }
                                }}>
                            </Input>
                        </FormControl>
                        <FormMessage className='form-message' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput
