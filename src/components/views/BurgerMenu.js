import { slide as Menu } from 'react-burger-menu';
import React from "react";
import "styles/ui/BurgerMenu.scss";


class BurgerMenu extends React.Component {

    render () {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Menu
                width={"32.5vw"}
            >
                <a href="/user/profile">My Profile ➔</a>
                <a href="/user/calendar">My Calendar ➔</a>
                <a href="/team/profile">Team Profile ➔</a>
                <a href="/team/calendar">Team Calendar ➔</a>
                <a href="/game">Snake ➔</a>
            </Menu>
        );
    }
}
export default BurgerMenu;
