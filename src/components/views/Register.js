import {api, getToken, handleError} from "helpers/api";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import User from "models/User";
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "components/ui/FormField";
import {Button} from "components/ui/Button";

export const Register = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const doRegister = async (props) => {
        try {
            const requestBody = JSON.stringify({email, password});
            const response = await api.post("/users", requestBody);

            const user = new User(response.data);
            user.token = getToken(response)
            localStorage.setItem("token", user.token);
            localStorage.setItem("id", user.id);

            history.push("/user");
        } catch (e) {
            alert(`Something went wrong during registration: \n${handleError(e)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="auth container">
                <div className="auth form">
                    <FormField
                        label="Email"
                        value={email}
                        onChange={(n) => setEmail(n)}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        onChange={(un) => setPassword(un)}
                    />
                    <div className="auth button-container">
                        <Button
                            disabled={!email || !password}
                            onClick={() => doRegister()}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="auth button-container">
                        <Button
                            onClick={() => history.push("/login")}
                        >
                            Sign in instead?
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};
