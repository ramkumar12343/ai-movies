import Link from "next/link";
import { ReactNode } from "react";
import Sidebar from "../../components/sidebar";

const Layout = async ({children}: {children: ReactNode}) => { 

  return (
    <div className="lg:w-[60%] py-6 m-auto">
      <nav className="flex justify-between">
        <Link href="/" className='flex items-center gap-2'>
          {/* <Image src="./logo.svg"  alt="logo" width={38} height={32}/> */}
          <h2 className="relative text-primary-100 logo-title before:content-['Beta'] before:absolute before:-right-12 before:top-1 before:bg-green-400 before:text-black before:px-2 before:py-0.5 before:rounded before:text-xs">FilmFlix </h2>
        </Link>
          
      </nav>
      <div className="absolute top-0 right-0 p-5">
      </div>
      {children}
    </div>
  );
}

export default Layout;