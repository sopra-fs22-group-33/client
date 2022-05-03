import { slide as Menu } from 'react-burger-menu';
import React from "react";
import "styles/ui/BurgerMenu.scss";


class BurgerMenu extends React.Component {

    render () {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu
                width={ 500}
            >
                <a className="menu-item" href="/user/profile">My Profile</a>
                <a className="menu-item" href="/user/calendar">Personal Calendar</a>
                <a className="menu-item" href="/team/calendar">Team Calendar</a>
                <a className="menu-item" href="/game">Snake</a>
            </Menu>
        );
    }
}
export default BurgerMenu;
