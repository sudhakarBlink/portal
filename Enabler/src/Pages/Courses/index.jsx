import React, { useState } from "react";
import "./style.scss";
import Tabmenu from "../../Component/Tabmenu";
const Courses = () => {
  const [ActiveIndex, setActiveIndex] = useState(null);
  return (
    <div className="course-container">
      <div className="course-menu-wrapper">
        <Tabmenu />
      </div>

      <div className="course-list-wrapper">
        {[...new Array(10)]?.map((item, index) => {
          return (
            <button
              onClick={() => {
                setActiveIndex(index);
                document.querySelector(".layout-container").scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
              key={index}
              className={`course-item ${index === ActiveIndex ? "active" : ""}`}
            >
              <div className="course-item-details">
                <img
                  src="https://files.seesaw.me/admin_tool_uploads/SL_Feature_3x_Classroom.png"
                  alt="course name"
                />
                <p>course name{index + 1}</p>
              </div>

              {ActiveIndex === index && (
                <div
                  className={`sub-course-container ${
                    index === ActiveIndex ? "active" : ""
                  }`}
                >
                  {[...new Array(10)].map((sub, sub_index) => {
                    return (
                      <button key={sub_index} className={`sub-course-item`}>
                        <img
                          src="https://files.seesaw.me/admin_tool_uploads/SL_Feature_3x_Getting_Started_1_.png"
                          alt="course name"
                        />
                        <p>sub course name</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
