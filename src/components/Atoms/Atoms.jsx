import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import withDateTimePretty from "../HOCs/DateTimePretty";


export const Li = ({ id, className, children }) => {
  return (
    <li id={id} className={className + "-item item-list"} key={uuidv4()}>
      <div className={className + "-item-wrap"} key={uuidv4()}>
        {React.Children.map(children, (child) => {
          return child;
        })}
      </div>
    </li>
  );
};

export const CardTitle = ({ title }) => {
  return (
    <h5 className="card-title">{title}</h5>
  );
};

export const CardText = ({ text, type }) => {
  return (
    <div className={type ? type + "-card-text" : "card-text"}>
      {text}
    </div>
  );
};
CardText.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['author', 'date', 'post'])
};
export const CardTextWithDate = withDateTimePretty(CardText);

export const Button = (props) => {
  return (
    <button
      id={props.id}
      className={props.type}
      onClick={props.clickHandler}
      style={props.btnStyle}
    >
      {props.text}
    </button>
  );
};

export const ButtonClose = ({ url, type, text }) => {
  const navigate = useNavigate();
  return (
    <button className={type} onClick={() => navigate(url)}>
      {text}
    </button>
  );
};

export const Text = React.forwardRef((data, ref) => {
  if (!data) {
    return null;
  }
  return (
    <span ref={ref} className={data.className}>
      {data.text}
    </span>
  );
});

export const Input = React.forwardRef((data, ref) => {
  return (
      <div className="input-wrapper">
        <input
          ref={ref}
          className={data.className + "__input"}
          type={data.type}
          name={data.name}
          onChange={data.onChange}
        />
        <label className="label" name={data.label}>
          {data.label}
        </label>
      </div>
  );
});

export const Textarea = React.forwardRef((data, ref) => {
  if (!data) {
    return null;
  }
  return (
      <div className="textarea-wrapper">
        <textarea
          ref={ref}
          rows={5}
          cols={35}
          className={data.className + "__input"}
          type={data.type}
          name={data.name}
          onChange={data.onChange}
          placeholder={data.placeholder}
          value={data.value}
        />
        <label className="label" name={data.name}>
          {data.label}
        </label>
      </div>
  );
});

export const Image = (props) => {
  return (
    <div className={props.className + "-wrap"}>
      <img 
        className={props.className} 
        src={props.url} 
        alt="avatar" 
      />
    </div>
  );
};
