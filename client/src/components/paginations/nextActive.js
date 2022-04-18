import React from "react";
export const NextActive = (props) => {

  return(
    <li className="waves-effect"><a href="#!" onClick={props.nextPage}><i className="material-icons">chevron_right</i></a></li>
  )
}
