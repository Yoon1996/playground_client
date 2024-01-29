import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchComponent from './search.component'

const HeaderComponent = () => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center px-5 h-24'>
        <div className='font-bold text-28 cursor-pointer' onClick={() => navigate('/')}>playground</div>
        <div className='w-2/4'>
        <SearchComponent></SearchComponent>
        </div>
        <div className='flex flex-row items-center gap-2'>
        <div>
          <img className='size-8' src="./public/calendar.png" alt="" />
        </div>
        <div className='cursor-pointer' onClick={() => navigate('/account/profile')}>
          <img className='size-8' src="./public/profile.png" alt="" />
        </div>

        </div>
    </div>
  )
}

export default HeaderComponent