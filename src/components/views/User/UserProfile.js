import {useHistory, useParams} from "react-router-dom";
import {doLogout} from "../../../helpers/api";
import {Spinner} from 'components/ui/Spinner';
import PropTypes from "prop-types";
import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";



const PlayerProfile = ({user}) => (
    <div className="user-profile container">
        <div className="user-profile label">Email</div>
        <div className="user-profile text">{user.email}</div>
        <div className="user-profile label">Username</div>
        <div className="user-profile text">{user.username}</div>
        <div className="user-profile label">Online State</div>
        <div className="user-profile text">{user.status}</div>
    </div>
);

PlayerProfile.propTypes = {
    user: PropTypes.object
};

export const UserProfile = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();

    const id = useParams();
    console.log(id);


    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [user, setUser] = useState(1);

    /*
    const EditProfile = () => {
        // Route to right place here
        history.push(`/profile/${id.id}/edit`);
    }
    */

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const token = localStorage.getItem("token");
                const id = localStorage.getItem("id")
                const response = await api.get(`/users/${id}`, {
                    headers: {token}
                });

                console.log(response.data);


                // Get the returned profile
                setUser(response.data);
                console.log("User has been set");


            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    let content = <Spinner/>;


    content = (
        <div className="game">
            <PlayerProfile
                user={user}
            />

        </div>
    )
    ;

    return (
        <BaseContainer>
            <div className="navigation-button-container container">
                <div className="navigation-button-container title">
                    <h1>User Profile</h1>
                </div>
                <div className="navigation-button-container button">
                    <Button onClick={() => history.push("/user/teams")}>See Teams</Button>

                    <Button onClick={() => history.push("/user/profile/invitations")}>
                        Open Invitations
                    </Button>
                </div>
            </div>
            {content}

        </BaseContainer>
    );
};
export default UserProfile;

