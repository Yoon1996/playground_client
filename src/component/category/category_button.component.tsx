import { MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import React from 'react';

interface CategoryButtonProps {
    category: string;
    dropwdownItems: string[];
    filterMode: string;
    updateFilters: (mode: string, item: string) => void;
}

const CategoryButtonComponent = ({ category, dropwdownItems, updateFilters, filterMode }: CategoryButtonProps) => {
    const handleDropdownItemClick = (item: string) => {
        updateFilters(filterMode, item);
        handleClose();
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div>
                <button
                    id="basic-button"
                    className="flex gap-1 border-2 rounded-lg h-11 justify-center items-center px-2 py-3 border-primary-a6 text-primary-45"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => handleClick(e)}
                >
                    {category}
                    <img className="w-5 h-5" src="../public/icon/caret-down.svg" alt="" />
                </button>
                <Menu
                    className="h-80"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {dropwdownItems.map((item, index) => (
                        <MenuItem
                            className="flex justify-center"
                            onClick={() => handleDropdownItemClick(item)}
                            key={index}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </>
    );
};

export default CategoryButtonComponent;
