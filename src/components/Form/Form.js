import React from 'react'
import './Form.css'

const Form = (props) => {
  const style = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    marginTop: `${props.marginTop}px`,
  };
  
  return (
<div  onSubmit={props.onSubmit} className="container"  style={style}>{props.children} </div>  )

}


export default Form


