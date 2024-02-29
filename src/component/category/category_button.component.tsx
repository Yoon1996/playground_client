import { useState } from 'react'

interface CategoryButtonProps {
    category: string
}

const CategoryButtonComponent = ({category} : CategoryButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const handleButtonClick = () => {
    setIsPressed((prev) => !prev)
  }
  return (
    <>
    <div className={
      `border-solid border-2 border-primary-a6 px-3 py-2 cursor-pointer rounded-lg flex items-center
      ${isPressed ? 'border-primary-45 border-3' : ''}
      `
    } onClick={() => handleButtonClick()}>
        {category}
    </div>
    </>
  )
}

export default CategoryButtonComponent