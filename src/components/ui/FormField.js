import PropTypes from "prop-types";

export const FormField = (props) => {
  return (
    <div className="auth field">
      <label className="auth label">{props.label}</label>
      <input
        className="auth input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
