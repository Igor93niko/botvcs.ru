import React from "react";
export const PageDisabled = (props) => {
  const clickHandler = (event) => {
    event.preventDefault();
    props.goPage(props.number);
  }
  return(
    <li className="waves-effect"><a href="#!" onClick={clickHandler} value={props.number}>{props.number}</a></li>
  )
}