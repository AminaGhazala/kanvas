import React from "react";

export default function Header(props){
  return (
    <div className="d-flex justify-content-between header mb-5 position-fixed">
      <h1 className="ml-5 my-3 mont white"><i className="fas fa-paint-brush blue"></i>  Kanvas</h1>
      <h4 className="mr-5 my-3 mb-2">
        <i onClick={() => props.handleDisplay()} className="fas fa-question-circle help white"></i>
      </h4>
    </div>
  );
}
