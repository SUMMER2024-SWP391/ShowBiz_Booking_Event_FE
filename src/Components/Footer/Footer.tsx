interface Props {
  className?: string
}
const Footer = ({ ...props }: Props) => {
  return (
    <div
      {...props}
      className={`${props.className} py-16 text-black_light w-full `}
    >
      <div className='h-[0.5px] w-full self-stretch bg-black_light opacity-20' />
      <div className='mx-auto px-4 flex justify-around capitalize container '>
        <div className='cursor-pointer'>
          <div className='mt-4 mb-7 font-bold hover:text-black_supper_light '>
            Product
          </div>
          <div className='mb-4 hover:text-black_supper_light'>key features</div>
          <div className='mb-4 hover:text-black_supper_light'>pricing</div>
          <div className='mb-4 hover:text-black_supper_light'>event ticketing</div>
          <div className='mb-4 hover:text-black_supper_light'>booking</div>
          <div className='mb-4 hover:text-black_supper_light'>online promotion</div>
          <div className='mb-4 hover:text-black_supper_light'>developers</div>
        </div>
        <div>
          <div className='mt-4 mb-7 font-bold hover:text-black_supper_light'>
            explore more
          </div>
          <div className='mb-4 hover:text-black_supper_light'>how it work</div>
          <div className='mb-4 hover:text-black_supper_light'>dowload app</div>
          <div className='mb-4 hover:text-black_supper_light'>event promoter</div>
          <div className='mb-4 hover:text-black_supper_light'>sell tickets</div>
          <div className='mb-4 hover:text-black_supper_light'>event organiser</div>
          <div className='mb-4 hover:text-black_supper_light'>
            nonprofits & fundraisers
          </div>
        </div>
        <div>
          <div className='mt-4 mb-7 font-bold hover:text-black_supper_light'>
            contact with us
          </div>
          <div className='mb-4 hover:text-black_supper_light'>customer support</div>
          <div className='mb-4 hover:text-black_supper_light'>dowload app</div>
          <div className='mb-4 hover:text-black_supper_light'>new feeds</div>
          <div className='mb-4 flex justify-start'>
            <div className='mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='-2 -2 24 24'
                width='28'
                fill='currentColor'
                className='w-[1.5rem] h-[1.5] hover:text-black_supper_light'
              >
                <path d='M8.695 6.937v1.377H7.687v1.683h1.008V15h2.072V9.997h1.39s.131-.807.194-1.69h-1.576v-1.15c0-.173.226-.404.45-.404h1.128V5h-1.535C8.644 5 8.695 6.685 8.695 6.937z'></path>
                <path d='M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'></path>
              </svg>
            </div>
            <span className='hover:text-black_supper_light'>facebook</span>
          </div>
          <div className='mb-4 flex justify-start items-center hover:text-black_supper_light'>
            <div className='mr-2 '>
              <svg
                className='w-6 h-6 text-black-900  hover:text-black_supper_light'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fillRule='evenodd'
                  d='M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <span className='hover:text-black_supper_light'>twitter</span>
          </div>
          <div className='mb-4 flex justify-start'>
            <div className='mr-2'>
              <svg
                className='w-5 h-5 text-black-900 hover:text-black_supper_light'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  fillRule='evenodd'
                  d='M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <span className='hover:text-black_supper_light'>instagram</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
