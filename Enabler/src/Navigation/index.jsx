import React, { useEffect, useState } from "react";
import "./style.scss";
import Sidebar from "../Component/Sidebar";
import { useStore } from "../Store";
import Tabledashboard from "../Pages/Tabledashboard";
import Courses from "../Pages/Courses";
import Calendar from "../Pages/Calendar";
import Journal from "../Pages/Journal";

const Navigation = () => {
  const { APP_CONFIG, SetAppConfig } = useStore();
  const [Wid, setWid] = useState(0);
  let wid = 0;
  const handleMouseMove = (e) => {
    // if (Math.round((e.clientX / window.innerWidth) * 100) < 30){
    SetAppConfig(e.clientX);
    setWid(e.clientX);
    // }
    // if
    // if (
    //   Math.round((e.clientX / window.innerWidth) * 100) > 5 &&
    //   Math.round((e.clientX / window.innerWidth) * 100) < 30
    // ) {
    //   SetAppConfig(Math.round((e.clientX / window.innerWidth) * 100) + "%");
    //   document.body.style.cursor = "ew-resize";
    // }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "default";
  };
  const ResizeDownHandler = (e) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="navigation-container">
      <div className="navbar-container"></div>
      <div className="main-container">
        <div
          className="sidebar-container"
          style={{
            width:
              Math.round((APP_CONFIG?.sidebarWidth / window.innerWidth) * 100) +
              "%",
            opacity: APP_CONFIG?.sidebarWidth === 10 ? 0 : 1,
          }}
        >
          <Sidebar />
        </div>
        <div
          className="content-container"
          style={{
            width: `calc(100% - ${
              Math.round((APP_CONFIG?.sidebarWidth / window.innerWidth) * 100) +
              "%"
            })`,
          }}
        >
          <div className="adjust-divider" onMouseDown={ResizeDownHandler}>
            <button
              onClick={() => {
                if (APP_CONFIG?.sidebarWidth === 10) {
                  SetAppConfig(300);
                } else {
                  SetAppConfig(10);
                }
              }}
            >
              {APP_CONFIG?.sidebarWidth === 10 ? (
                <i className="fa-solid fa-circle-chevron-right"></i>
              ) : (
                <i className="fa-solid fa-circle-chevron-left"></i>
              )}
            </button>
          </div>
          <div className="layout-container">
            <div className="layout-header">
              <div className="breadcrumb-container">
                <button>Dashbooard</button>
                <span>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
                <button>child name</button>
              </div>

              <p>Calendar</p>
            </div>
            <div className="main-content-container">
              {/* <Tabledashboard /> */}
              {/* <Courses /> */}
              <Calendar />
              {/* <Journal /> */}

              {/* <div className="card">
                <div className="card-details">
                  <div className="card-detail-header">
                    <p>Assigned</p>
                  </div>
                  <div className="card-detail-footer">
                    <h2>You are complete with me</h2>
                    <p>
                      Some vowel teams have very similar sounds but we have to
                      spell them differently. This game encourages the player to
                      decode the correct usage of the vowel team units au, aw
                      and augh specifically.
                    </p>

                    <div className="card-star-container">
                      <button>
                        <i class="fa-solid fa-star"></i>
                      </button>
                      <button>
                        <i class="fa-solid fa-star"></i>
                      </button>
                      <button>
                        <i class="fa-solid fa-star"></i>
                      </button>
                      <button>
                        <i class="fa-solid fa-star"></i>
                      </button>
                      <button>
                        <i class="fa-solid fa-star"></i>
                      </button>
                    </div>

                    <div className="card-footer-btn">
                      <button>
                        <i class="fa-solid fa-play"></i>
                      </button>
                      <button>Assign</button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
