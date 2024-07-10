'use client'
import { useTheme } from 'next-themes'

export function Navbar () {
  const { theme, setTheme } = useTheme()

  return (
    <div className='w-full dark:bg-[#131415]'>
      <div className='container max-w-6xl px-4 '>
        <nav className='layout flex items-center justify-between py-4 '>
          <ul className='flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base'>
            {/* <li>
              <a
                className='rounded-sm py-2 transition-colors font-medium text-black dark:text-white group dark:hover:text-primary-300 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                href='/'
              >
                <span className='transition-colors bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0 !bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent'>
                  Home
                </span>
              </a>
            </li> */}
            <li>
              <a
                className='rounded-sm py-2 transition-colors font-medium text-black dark:text-white group dark:hover:text-primary-300 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                href='/blog'
              >
                <span className='transition-colors bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0'>
                  Blog
                </span>
              </a>
            </li>
            <li>
              <a
                className='rounded-sm py-2 transition-colors font-medium text-black dark:text-white group dark:hover:text-primary-300 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                href='/projects'
              >
                <span className='transition-colors bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0'>
                  Projects
                </span>
              </a>
            </li>
            <li>
              <a
                className='rounded-sm py-2 transition-colors font-medium text-black dark:text-white group dark:hover:text-primary-300 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                href='/shorts'
              >
                <span className='transition-colors bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0'>
                  Shorts
                </span>
              </a>
            </li>
            <li>
              <a
                className='rounded-sm py-2 transition-colors font-medium text-black dark:text-white group dark:hover:text-primary-300 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                href='/about'
              >
                <span className='transition-colors bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0'>
                  About
                </span>
              </a>
            </li>
          </ul>
          {theme === 'dark' ? (
            <button
              onClick={() => setTheme('light')}
              className='rounded-md p-2 focus:outline-none md:p-2.5 border dark:border-gray-600 hover:border-primary-300 hover:text-primary-300 dark:hover:border-primary-300 dark:hover:text-primary-300 focus-visible:border-primary-300 focus-visible:text-primary-300 dark:focus-visible:border-primary-300 dark:focus-visible:text-primary-300 text-lg md:text-xl'
            >
              <svg
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='12' cy='12' r='5'></circle>
                <line x1='12' y1='1' x2='12' y2='3'></line>
                <line x1='12' y1='21' x2='12' y2='23'></line>
                <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
                <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
                <line x1='1' y1='12' x2='3' y2='12'></line>
                <line x1='21' y1='12' x2='23' y2='12'></line>
                <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
                <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setTheme('dark')}
              className='rounded-md p-2 focus:outline-none md:p-2.5 border dark:border-gray-600 hover:border-primary-300 hover:text-primary-300 dark:hover:border-primary-300 dark:hover:text-primary-300 focus-visible:border-primary-300 focus-visible:text-primary-300 dark:focus-visible:border-primary-300 dark:focus-visible:text-primary-300 text-lg md:text-xl'
            >
              <svg
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='12' cy='12' r='5'></circle>
                <line x1='12' y1='1' x2='12' y2='3'></line>
                <line x1='12' y1='21' x2='12' y2='23'></line>
                <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
                <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
                <line x1='1' y1='12' x2='3' y2='12'></line>
                <line x1='21' y1='12' x2='23' y2='12'></line>
                <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
                <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
              </svg>
            </button>
          )}
          {/* <button className='rounded-md p-2 focus:outline-none md:p-2.5 border dark:border-gray-600 hover:border-primary-300 hover:text-primary-300 dark:hover:border-primary-300 dark:hover:text-primary-300 focus-visible:border-primary-300 focus-visible:text-primary-300 dark:focus-visible:border-primary-300 dark:focus-visible:text-primary-300 text-lg md:text-xl'>
            <svg
              stroke='currentColor'
              fill='none'
              stroke-width='2'
              viewBox='0 0 24 24'
              stroke-linecap='round'
              stroke-linejoin='round'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='12' r='5'></circle>
              <line x1='12' y1='1' x2='12' y2='3'></line>
              <line x1='12' y1='21' x2='12' y2='23'></line>
              <line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
              <line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
              <line x1='1' y1='12' x2='3' y2='12'></line>
              <line x1='21' y1='12' x2='23' y2='12'></line>
              <line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
              <line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
            </svg>
          </button> */}
        </nav>
      </div>
    </div>
  )
}
