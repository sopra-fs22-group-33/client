import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { doLogout } from "helpers/api";
import { Button } from "../ui/Button";
import BaseContainer from "../ui/BaseContainer";
import "styles/views/Welcome.scss";
import blob1 from "../../images/blob1.png";


export const Welcome = () => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token") && !!sessionStorage.getItem("id")
  );

  let content;

  if (isAuthenticated) {
    history.push(`/user/calendar`);
  } else {
    content = (
      <BaseContainer>
        <div className={"welcome container"}>
          <div className={"welcome text container2"}>

          <div className={"welcome text title"}>Shift planning made easy</div>
            <div className={"welcome text line"}></div>

            <div className={"welcome text subtitle"}>
            Many teams who are working in shifts are still using hand made plans
            to organize their work. This takes a lot of time for the team
            leader, who has to create the plan. The team members have to check
            the physical plan for changes on a regular basis. The goal of this
            project is to provide a software system which supports this process.
            A team leader can create a base plan where the team members get
            assigned to automatically. Team members get their working plan
            directly into their calendars and they can post their preferred
            shifts or days off directly into the system. In case of a conflict,
            the team members can sort it out in real time.
          </div>
            <div className={"welcome text button"}>
              <Button onClick={() => history.push("/register")} style={{margin: "0px"}}>Get Started</Button>

            </div>

          </div>
        <div className={"welcome graphic container3"}>
          <img src={blob1} style={{ width:"70vh",
            height:"auto"}}/>

        </div>
        </div>

      </BaseContainer>
    );
  }

  return content;
};
