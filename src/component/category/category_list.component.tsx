import CategoryButtonComponent from './category_button.component';

const CategoryListComponent = () => {
    const categories = ['지역', '날짜', '시간', '구장 크기', '실내외'];
  return (
    <>
    <div className='flex gap-4'>
        {categories.map((category, index) => 
        <CategoryButtonComponent key={index} category={category}></CategoryButtonComponent>
        )}
    </div>
    </>
  )
}

export default CategoryListComponent