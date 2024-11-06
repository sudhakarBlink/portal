import { Dropdown } from "antd";
import React from "react";

const Dropdownmenu = ({ children, items, type, CallbackHandler }) => {
  return (
    <Dropdown
      menu={{
        items,
        onClick: CallbackHandler,
      }}
      trigger={[type]}
    >
      {children}
    </Dropdown>
  );
};

export default Dropdownmenu;
