import React from "react";
import "./style.scss";

const Tabmenu = ({ list, ActiveTab, setActiveTab }) => {
  return (
    <div className="tab-menu-container">
      {list?.map((item, index) => {
        return (
          <button
            onClick={() => setActiveTab(index)}
            className={index === ActiveTab ? "active" : ""}
            key={index}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Tabmenu;
