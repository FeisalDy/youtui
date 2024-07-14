type Props = {
  setTheme: (theme: string) => void
}

export function MoonIcon ({ setTheme }: Props) {
  return (
    <button
      onClick={() => setTheme('light')}
      className='rounded-md p-2 md:p-2.5 border dark:border-gray-600 text-lg md:text-xl'
    >
      {/* <svg
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
        <path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' />
      </svg> */}
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
  )
}

export function SunIcon ({ setTheme }: Props) {
  return (
    <button
      onClick={() => setTheme('dark')}
      className='rounded-md p-2 md:p-2.5 border dark:border-gray-600 text-lg md:text-xl'
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
  )
}
