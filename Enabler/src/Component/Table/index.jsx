import React, { useState } from "react";
import "./style.scss";
import { Dropdown, Pagination } from "antd";
const Tablecomponent = ({
  TableHeader,
  TableBody,
  FilterOptions,
  setTableHeader,
  setTableconfig,
  Tableconfig,
}) => {
  const [Is_menu_open, setIs_menu_open] = useState(false);
  const MenuHandler = (e) => {
    setIs_menu_open(true);
    setTableHeader(
      TableHeader.map((item) =>
        item.id == e.key ? { ...item, is_show: !item?.is_show } : item
      )
    );
  };

  return (
    <div>
      <div className="table-dashboard-container">
        <div className="table-container">
          <div className="table-header-container">
            {TableHeader?.map((item, index) => {
              if (item?.is_show)
                return (
                  <div
                    key={item.id}
                    className="table-header-item"
                    style={{
                      width: 5 + item?.flex + "%",
                      minWidth: 100 + "px",
                    }}
                  >
                    <p>{item?.title}</p>
                  </div>
                );
            })}
          </div>
          {/* {JSON.stringify(TableHeader)} */}
          {TableBody?.map((bodydata, bodyindex) => {
            return (
              <div key={bodydata?.child_id} className="table-body-container">
                {TableHeader?.map((item, index) => {
                  if (item?.is_show) {
                    let ObjKeys = Object.keys(bodydata);
                    let CustomSyntax = bodydata[ObjKeys[index]] || "";
                    // let CheckInclude = Text1?.includes(" ");
                    return (
                      <div
                        key={item.id}
                        className="table-body-item"
                        style={{
                          width: 5 + item?.flex + "%",
                          minWidth: 100 + "px",
                        }}
                      >
                        {item?.custom === true ? (
                          CustomSyntax
                        ) : (
                          <p>{CustomSyntax}</p>
                        )}

                        {/* <p>{Text1}</p> */}
                        {/* <p>{JSON?.stringify(CheckInclude)}</p> */}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>

        <Dropdown
          menu={{
            items: FilterOptions,
            onClick: MenuHandler,
          }}
          open={Is_menu_open}
          onOpenChange={(nextOpen, info) => {
            if (info.source === "trigger") {
              setIs_menu_open(false);
            }
          }}
          trigger={["click"]}
        >
          <button
            className="table-menu-btn"
            onClick={() => setIs_menu_open(!Is_menu_open)}
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </Dropdown>
      </div>
      <Pagination
        align="center"
        current={Tableconfig?.page_no}
        total={Tableconfig?.total_page}
        style={{ marginTop: "10px" }}
        showSizeChanger={false}
        onChange={(e) => {
          setTableconfig((prev) => ({ ...prev, page_no: e }));
        }}
      />
    </div>
  );
};

export default Tablecomponent;
