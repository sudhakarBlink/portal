import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { useStore } from "../../Store";
const Sidebar = () => {
  const items = [
    {
      id: 1,
      title: "Home",
      menuItems: [
        {
          id: 1,
          icon: <i className="fa-solid fa-chart-line"></i>,
          title: "Dashboard",
          to: "/",
        },
        {
          id: 2,
          icon: <i className="fa-solid fa-chart-line"></i>,
          title: "Student list",
          to: "/",
        },
      ],
    },
    {
      id: 2,
      title: "General",
      menuItems: [
        {
          id: 1,
          icon: <i className="fa-solid fa-chart-line"></i>,
          title: "Calendar",
          to: "/",
        },
        {
          id: 2,
          icon: <i className="fa-solid fa-chart-line"></i>,
          title: "Pending action",
          to: "/",
        },
        {
          id: 3,
          icon: <i className="fa-solid fa-chart-line"></i>,
          title: "Course library",
          to: "/",
        },
      ],
    },
  ];
  return (
    <div className="sidebar-block">
      <div className="menu-container">
        {items?.map((item, index) => {
          return (
            <div className="menu-wrapper" key={item?.id}>
              <p className="menu-title">{item?.title}</p>
              <div className="menu-item-wrapper">
                {item?.menuItems?.map((menu_item, menu_index) => {
                  return (
                    <button
                      to={menu_item?.to}
                      className="menu-item"
                      key={menu_item?.id}
                    >
                      <span>{menu_item?.icon}</span>
                      {menu_item?.title}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="drag-block" onMouseDown={ResizeDownHandler}></div> */}
    </div>
  );
};

export default Sidebar;
