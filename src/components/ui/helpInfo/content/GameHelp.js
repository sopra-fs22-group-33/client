import game2 from "../../../../images/helpScreenshots/game2.png";
import { HelpInfoImageFrame } from "../HelpInfoImageFrame";

export const GameHelp = (
  <div>
    <p>
      Here you will see the all snake games for specific shifts in different
      teams.
    </p>
    <p>
      Press on a game to select it, the game will start automatically once all
      the players are online.
    </p>
    <p>
      Once in the game use arrow keys or WASD to set the direction for the
      snake.
    </p>
    <p>
      Green shows your snake while orange is your opponents' snakes and red is
      the apples.
    </p>
    <HelpInfoImageFrame src={game2} />
    <p>
      Eat apples and avoid walls as well as hitting other players with your
      head.
    </p>
    <p>The last standing snake wins.</p>
  </div>
);
