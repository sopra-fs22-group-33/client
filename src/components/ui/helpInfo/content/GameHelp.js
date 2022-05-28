import game2 from "../../../../images/helpScreenshots/game2.png";
import { HelpInfoImageFrame } from "../HelpInfoImageFrame";

export const GameHelp = (
  <div>
    <div>
      Here you will see the all snake games for specific shifts in different
      teams
    </div>
    <div>
      Press on a game to select it, the game will start automatically once all
      the players are online
    </div>
    <div>
      Once in the game use arrow keys or WASD to set the direction for the snake
    </div>
    <div>
      Green shows your snake while orange is your opponents' snakes and red is
      the apples
    </div>
    <HelpInfoImageFrame src={game2} />
    <div>
      Eat apples and avoid walls as well as hitting other players with your head
    </div>
    <div>The last standing snake wins</div>
  </div>
);
