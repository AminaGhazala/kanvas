import React from "react";

export default function Landing(props) {
  return (
    <div className=" pt-5 light-grey">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h1 className="pac title-font">Kanvas</h1>
            <h1 className="mont">
              by Team Ove<span className="blue">React</span>
            </h1>
            <p className="mont mt-5">Get organized, and Stay ahead of the competition with our new Kanban Board!</p>
            <div className="d-flex flex-row justify-content-around flex-wrap member-container mt-3">
              <div>
                <a
                  href="https://www.linkedin.com/in/nathan-reitan/"
                  target="_blank"
                  without="true"
                  rel="noopener noreferrer"
                >
                  <div className="circle nathan m-1"></div>
                </a>
                <p className="text-center mont mt-2">Nathan</p>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/jasonkim-jk/"
                  target="_blank"
                  without="true"
                  rel="noopener noreferrer"
                >
                  <div className="circle jason m-1"></div>
                </a>
                <p className="text-center mont mt-2">Jason</p>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/kushol-huq/"
                  target="_blank"
                  without="true"
                  rel="noopener noreferrer"
                >
                  <div className="circle kushol m-1"></div>
                </a>
                <p className="text-center mont mt-2">Kushol</p>
              </div>
            </div>
            <div className="">
              <h4 className="mont my-3">Give our Kanban board a test drive by clicking the button below</h4>
              <button onClick={() => props.handleDisplay()} className="custom mont p-2 mb-3">
                Enter Here
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-3 pb-5">
            <div className="d-flex flex-row">
              <div className="demo">
                {/* <img src="./images/demosmaller.gif" alt="kanban board" className="pt-5" /> */}
              </div>
            </div>
            <div className="mt-5">
              <h2 className="mont">What Our App has to Offer:</h2>
              <ul className="mont my-3 ml-3 pl-1">
                <li className="my-3 ml-3">
                  Do you like to plan with more than 3 stages? You're in luck! Our app gives you the ability to add and
                  remove columns with ease.
                </li>
                <li className="my-3 ml-3">
                  We give you the power, the titles of the columns, task titles and task contents are all completely
                  editable.
                </li>
                <li className="my-3 ml-3">Add new tasks to any Column at any time!</li>
                <li className="my-3 ml-3">
                  Thanks to the work of our developers, our app gives your the ability drag columns to switch the order
                  if needed and you can move tasks up and down within the column or horizontally to another column!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
