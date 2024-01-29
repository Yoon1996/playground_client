import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../atom/user.atom'
import HeaderComponent from '../component/header.component'

const MainTemplate = () => {
    return (
        <>
        <div className='w-4/5 m-auto'>
        <HeaderComponent></HeaderComponent>
        </div>
        </>
    )
}

export default MainTemplate
