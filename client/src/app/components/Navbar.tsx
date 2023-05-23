import Image from 'next/image'
import Button from './Button'

export default function Navbar() {
    
    return (
            <nav className='bg-slate-700 shadow-lg shadow-slate-500/50 font-bold flex justify-center sticky top-0 left-0 right-0 w-full z-50 py-0 mt-0 mb-10'>
                <div className='navbar container flex flex-row items-center justify-between'>
                    <div className='container flex flex-row items-center justify-between'>
                        <a className='text-white hover:text-orange-400' href='/'>
                        <div className='flex flex-row'>
                            <Image
                                className="logo px-1"
                                src="/pokeball.png"
                                alt="Pokeball"
                                width={50}
                                height={50}
                            />
                        </div>
                        </a>
                        <Hamburger />
                    </div>
                    <div className="nav-links w-auto hidden md:flex">
                        <ul className="nav-list list-none flex flex-grow items-center p-0">
                            <li>
                                {/* <a className='text-white hover:text-orange-400 px-3' href='/profile'>Profile</a> */}
                            </li>
                            <li className='mx-2'>
                                <Button text="Sign Up" link="/signup" />
                            </li>
                            <li className='mx-2'>
                                <Button text="Log In" link="/login" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export function Hamburger() {
    return (
        <div className='flex justify-end'>
            <div className="hamburger hover:cursor-pointer md:hidden mx-3">
                <span className="block rounded w-9 h-1 mb-2 bg-white"></span>
                <span className="block rounded w-9 h-1 mb-2 bg-white"></span>
                <span className="block rounded w-9 h-1 mb-2 bg-white"></span>
            </div>
        </div>
    )
}