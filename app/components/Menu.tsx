import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IconBase } from 'react-icons';
import { MdMenu } from 'react-icons/md';

const Menu = () => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="menu-trigger">
                <MdMenu />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="menu-content">
                <DropdownMenu.Item className="menu-item">Item 1</DropdownMenu.Item>
                <DropdownMenu.Item className="menu-item">Item 2</DropdownMenu.Item>
                <DropdownMenu.Item className="menu-item">Item 3</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default Menu;