'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { AuthFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.action'
import PlaidLink from '../PlaidLink'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = AuthFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (type === 'Sign-Up') {
                const newUser = await signUp(data);
                setUser(newUser)
            } else if (type === 'Sign-In') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                }); 
                if (response) router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className='cursor-pointer flex items-center gap-1'>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='Horizon'
                        className='size-[24] max-xl:size-14'
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        Horizon
                    </h1>
                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? 'Link Account'
                            : type === 'Sign-In'
                                ? 'Sign-In'
                                : 'Sign-Up'}
                        <p className="text-16 font-normal text-gray-600">
                            {user ? 'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {/* {user ? ( */}
                <div className="flex flex-col gap-4">
                    {/* <PlaidLink user={user} variant='primary' /> */}
                </div>
            {/* ) : ( */}
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'Sign-Up' && <>
                                <div className="flex gap-4">
                                    <CustomInput
                                        control={form.control}
                                        name='firstName'
                                        label='First Name'
                                        placeHolder='Ex: James'
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name='lastName'
                                        label='Last Name'
                                        placeHolder='Ex: Bond'
                                    />
                                </div>
                                <CustomInput
                                    control={form.control}
                                    name='city'
                                    label='City'
                                    placeHolder='Enter your spesific city'
                                />

                                <CustomInput
                                    control={form.control}
                                    name='address'
                                    label='Address'
                                    placeHolder='Enter your spesific address'
                                />

                                <div className="flex gap-4">
                                    <CustomInput
                                        control={form.control}
                                        name='state'
                                        label='State'
                                        placeHolder='ex: NY'
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name='postalCode'
                                        label='Postal Code'
                                        placeHolder='ex: 11234'
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <CustomInput
                                        control={form.control}
                                        name='dateOfBirth'
                                        label='Date Of Birth'
                                        placeHolder='ex: yyyy-mm-dd'
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name='ssn'
                                        label='SSN'
                                        placeHolder='ex: 1234'
                                    />
                                </div>
                            </>}

                            <CustomInput
                                control={form.control}
                                name='email'
                                label='Email'
                                placeHolder='Enter your email'
                            />
                            <CustomInput
                                control={form.control}
                                name='password'
                                label='Password'
                                placeHolder='Enter your password'
                            />
                            <div className="flex flex-col gap-4">
                                <Button className='form-btn' type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2
                                                size={20}
                                                className='animate-spin' /> &nbsp;
                                            Loading...
                                        </>
                                    ) : type === 'Sign-In' ? 'Sign In' : 'Sign Up'}
                                </Button>

                            </div>
                            <footer className="flex justify-center gap-1">
                                <p className="text-14 font-normal text-gray-600">
                                    {type === 'Sign-In' ? "Don't have an account?" : "Already have an account?"}
                                </p>
                                <Link href={type === 'Sign-In' ? '/sign-up' : '/sign-in'}
                                    className='form-link'>
                                    {type === 'Sign-In' ? 'Sign Up' : 'Sign In'}
                                </Link>
                            </footer>
                        </form>
                    </Form>
                </>
            {/* )} */}
        </section>
    )
}

export default AuthForm
