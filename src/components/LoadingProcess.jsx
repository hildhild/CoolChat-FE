import Logo from '../assets/CoolChat Logo/3.png'

export default function LoadingProcess({ isLoading }) {

  return (
      isLoading
      ?
      <div className='m-auto fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='relative size-32 mx-auto my-5'>
          <div className='absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white border-3 border-primary rounded-full text-center text-lg text-white align-middle before:content-[""] before:absolute before:-top-1 before:-left-1 before:w-[calc(8rem+3px)] before:h-[calc(8rem+3px)] before:border-3 before:border-transparent before:border-t-white before:border-r-white before:rounded-full before:animate-[spin_2s_linear_infinite]'>
            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
              <div className='w-3/4 h-3/4 flex justify-center items-center'>
                <img alt='NTP Image' src={Logo} loading='lazy' className='w-full h-full object-contain' />
              </div>
            </div>
            <span className='block absolute top-[calc(50%-2px)] left-1/2 w-1/2 h-1 bg-transparent origin-left animate-[animateRing_2s_linear_infinite]'></span>
          </div>
        </div>
      </div>
      : <></>
    
  )
}
