'use client'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@/components/svg/Toogle'
import UseFirstPathName from '@/utils/UsePathName'

const liClasses =
  'after-hover rounded-sm py-2 transition-colors font-medium text-black dark:text-white group'

const activeLiClasses =
  'bg-clip-text text-transparent bg-gradient-to-r from-[#27ff00] to-green-100 font-bold'

export function Navbar () {
  const { theme, setTheme } = useTheme()
  const pathname = UseFirstPathName()

  return (
    <div className='w-full dark:bg-[#131415]'>
      <span className='block h-1 bg-[#27ff00]/70 ' />
      <div className='container max-w-6xl '>
        <nav className='layout flex items-center justify-between py-4 pl-4'>
          <ul className='flex items-center justify-between space-x-3 md:space-x-4 md:text-base'>
            <li>
              <a
                className={pathname === '/' ? activeLiClasses : liClasses}
                href='/'
              >
                <span className=''>Home</span>
              </a>
            </li>
            <li>
              <a
                className={pathname === 'books' ? activeLiClasses : liClasses}
                href='/books'
              >
                <span className=''>Books</span>
              </a>
            </li>
            <li>
              <a className={liClasses} href='/shorts'>
                <span className=''>Shorts</span>
              </a>
            </li>
            <li>
              <a className={liClasses} href='/about'>
                <span className=''>About</span>
              </a>
            </li>
          </ul>
          {theme === 'dark' ? (
            <MoonIcon setTheme={setTheme} />
          ) : (
            <SunIcon setTheme={setTheme} />
          )}
        </nav>
      </div>
    </div>
  )
}
