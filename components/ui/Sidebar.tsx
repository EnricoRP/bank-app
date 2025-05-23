'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from '../Footer'
import PlaidLink from '../PlaidLink'

const Sidebar = ({ user }: SiderbarProps) => {
    const pathName = usePathname();
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link href="/" className='flex mb-12 cursor-pointer items-center gap-2'>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='Horizon'
                        className='size-[24] max-xl:size-14'
                    />
                    <h1 className="sidebar-logo">
                        Horizon
                    </h1>
                </Link>
                {sidebarLinks.map((item) => {
                    // console.log(`Current Path: ${pathName}, Item Route: ${item.route}/, Status: ${pathName.startsWith(item.route)}/`);
                    const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                    return (
                        <Link href={item.route} key={item.label}
                            className={cn('sidebar-link', {
                                'bg-bank-gradient': isActive
                            })}>
                            <div className="relative size-6">
                                <Image src={item.imgURL} alt={item.label} fill
                                    className={cn({ 'brightness-[3] invert-0': isActive })}
                                />
                            </div>
                            <p className={cn('sidebar-label', { '!text-white': isActive })}>{item.label}</p>
                        </Link>
                    )
                })}
                <PlaidLink user={user} />
            </nav>
            <Footer user={user} />
        </section>
    )
}


export default Sidebar
