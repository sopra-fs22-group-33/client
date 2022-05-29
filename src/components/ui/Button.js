import "styles/ui/Button.scss";
import "styles/ui/Button2.scss";

export const Button = (props) => (
  <button
    {...props}
    style={{ width: props.width, ...props.style }}
    className={`primary-button ${props.className}`}
  >
    {props.children}
  </button>
);

export const Button2 = (props) => (
  <button
    {...props}
    style={{ width: props.width, ...props.style }}
    className={`secondary-button ${props.className}`}
  >
    {props.children}
  </button>
);
