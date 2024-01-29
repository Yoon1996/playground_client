import React from 'react'
import InputComponent from './input.component'

const SearchComponent = () => {
  return (
    <InputComponent
    placeholder='지역, 구장이름으로 검색하기'
    type='text'
    ></InputComponent>
  )
}

export default SearchComponent