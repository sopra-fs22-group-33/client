import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import {doLogout, doChangeTeam} from "../../helpers/api";
import {Button} from "components/ui/Button";
import BurgerMenu from "components/views/BurgerMenu.js";
import {useHistory} from "react-router-dom";


/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = (props) => {

    const history = useHistory();
    return (
        < div>
            < BurgerMenu> < /BurgerMenu>

            <div className="header container" style={{height: props.height}}>
                <h1 className="header title">Shift Planner</h1>
                <a className="header team" onClick={() => history.push("/user/teams")}>Current
                    Team: {localStorage.getItem('teamId')}</a>
                <div className="header button">
                    <Button onClick={() => doLogout().then(() => history.push("/"))}>Log out</Button>
                </div>
            </div>
        </div>
    );
};


Header.propTypes = {
    height: PropTypes.string
};

/**
 * Don't forget to export your component!
 */
export default Header;
