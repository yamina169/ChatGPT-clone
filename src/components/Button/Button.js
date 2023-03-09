
import './Button.css';
import React from 'react';

const Button = (props) => {
  const style = {
    height: `${props.height}px`,
    marginTop: `${props.marginTop}px`,
    width: `${props.width}px`,
  };

  return (
    <button
      style={style}
      className={props.className}
      type={props.type}
      value={props.value}
      id={props.id}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <p style={{ display: 'inline-block' }}>{props.p}</p>
      <a style={{ fontSize: `${props.fontSize}px` }} href={props.Link}>
        {props.text}
      </a>
    </button>
  );
};

export default Button;



