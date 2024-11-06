import React, { useState } from "react";
import "./style.scss";
import { Avatar, Dropdown } from "antd";
import Dropdownmenu from "../../Component/Dropdown";

const Journal = () => {
  const [InputFocus, setInputFocus] = useState(false);
  const items = [
    {
      label: <p>Edit</p>,
      key: "0",
      icon: <i className="fa-solid fa-pen"></i>,
    },
    {
      label: <p>Delete</p>,
      key: "1",
      icon: <i className="fa-solid fa-trash-can"></i>,
      danger: true,
    },
  ];
  const OptionClickhandler = (e) => {
    console.log(e);
  };
  const InputHandler = (e) => {
    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";
  };
  return (
    <div className="journal-container">
      <div className="journal-entry-container">
        {InputFocus && (
          <div className="header">
            <button>
              <i className="fa-solid fa-image"></i> Attachment
            </button>
          </div>
        )}
        {InputFocus && (
          <div className="journal-images">
            <div className="image-item">
              <img src="https://placehold.co/150x100" alt="" />
            </div>
            <div className="image-item">
              <img src="https://placehold.co/150x100" alt="" />
            </div>
            <div className="image-item">
              <img src="https://placehold.co/150x100" alt="" />
            </div>
            <div className="image-item">
              <img src="https://placehold.co/150x100" alt="" />
            </div>
            <div className="image-item">
              <img src="https://placehold.co/150x100" alt="" />
            </div>
          </div>
        )}

        <div className="journal-input-container">
          <textarea
            name=""
            id=""
            placeholder="Add a journal..."
            onInput={(e) => InputHandler(e)}
            onFocus={(e) => setInputFocus(true)}
          ></textarea>
        </div>
      </div>
      {InputFocus && (
        <div className="journal-save-btn">
          <button>Save</button>
          <button onClick={() => setInputFocus(false)}>Cancel</button>
        </div>
      )}
      <div className="journal-list-container">
        {[...new Array(9)]?.map((item, index) => {
          return (
            <div key={index} className="journal-item">
              <div className="header">
                <div className="avator">
                  <Avatar>U</Avatar>
                </div>
                <div className="name-details">
                  <p className="name">Samuel Sector</p>
                  <p className="date">June 18, 2024</p>
                </div>

                <Dropdownmenu
                  type={"click"}
                  items={items}
                  CallbackHandler={OptionClickhandler}
                >
                  <button>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </Dropdownmenu>
              </div>
              <div className="body">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Earum deserunt minima doloremque architecto. Laborum neque
                  natus voluptatum, voluptatem veniam unde?
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Journal;
