import { useState } from 'react';

interface CategoryButtonProps {
    category: string;
    dropwdownItems: string[];
    filterMode: string;
    updateFilters: (mode: string, item: string) => void;
}

const CategoryButtonComponent = ({ category, dropwdownItems, updateFilters, filterMode }: CategoryButtonProps) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const handleButtonClick = () => {
        setIsPressed(!isPressed);
    };
    const handleDropdownItemClick = (item: string) => {
        setIsPressed(false);
        updateFilters(filterMode, item);
    };

    return (
        <>
            <div>
                <div
                    className={`text-primary-45 border-solid border-2 border-primary-a6 px-3 py-2 cursor-pointer rounded-lg flex items-center gap-2 max-h-11
      ${isPressed ? 'border-primary-45 border-3' : ''}
      `}
                    onClick={() => handleButtonClick()}
                >
                    {category}
                    <img src="../public/icon/caret-down.svg" alt="" />
                </div>
                {isPressed ? (
                    <div className="border-2 border-solid rounded-md border-primary-a6 bg-white mt-2 flex flex-col items-center gap-2 py-1">
                        {dropwdownItems.map((item, index) => (
                            <div
                                onClick={() => {
                                    handleDropdownItemClick(item);
                                }}
                                className="cursor-pointer flex text-primary-45 w-full h-5 items-center justify-center hover:bg-primary-light transition-all"
                                key={index}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default CategoryButtonComponent;
