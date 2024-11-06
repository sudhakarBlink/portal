import React, { useEffect, useState } from "react";
import "./style.scss";
import Tablecomponent from "../../Component/Table";
import Tabmenu from "../../Component/Tabmenu";
import useApiPost from "../../Hooks/usePost";
const Tabledashboard = () => {
  const PostApi = useApiPost();
  const [ActiveTab, setActiveTab] = useState(0);
  const [Tableconfig, setTableconfig] = useState({
    page_no: 1,
    search: "",
    total_page: null,
  });
  const [TableHeader, setTableHeader] = useState([]);
  const [TableBody, setTableBody] = useState([]);
  const [FilterOptions, setFilterOptions] = useState([]);
  const [SearchTime, setSearchTime] = useState(0);
  const TestHandler = (id) => {
    alert("fd-----------" + id);
  };
  const InputHandler = (e) => {
    setSearchTime(1);
    setTableconfig((prev) => ({ ...prev, search: e.target.value, page_no: 1 }));
  };
  const FilterOptionUpdate = () => {
    let FilterOptions = [];
    for (let i = 0; i < TableHeader.length; i++) {
      FilterOptions.push({
        label: (
          <div className="filter-option-item">
            <p>
              {TableHeader[i].is_show ? (
                <i className="fa-solid fa-square-check"></i>
              ) : (
                <i className="fa-regular fa-square-check"></i>
              )}
            </p>
            <label htmlFor={TableHeader[i]?.title}>
              {TableHeader[i]?.title}
            </label>
          </div>
        ),
        key: TableHeader[i]?.id,
      });
    }
    setFilterOptions((prev) => [...FilterOptions]);
  };

  const StudentList = () => {
    PostApi.Postdata(
      `http://192.168.1.156:8000/enabler/student_list?page_no=${Tableconfig.page_no}`,
      true,
      {
        search: Tableconfig?.search,
      }
    );
  };
  const GroupList = () => {
    PostApi.Postdata(
      `http://192.168.1.156:8000/enabler/group_list?page_no=${Tableconfig.page_no}`,
      true,
      {
        search: Tableconfig?.search,
      }
    );
  };

  const ApiCall = () => {
    if (ActiveTab == 0) {
      StudentList();
    }
    if (ActiveTab == 1) {
      GroupList();
    }
  };

  useEffect(() => {
    if (SearchTime !== 0) {
      const Timer = setInterval(() => {
        setSearchTime((prev) => prev + 1);
      }, 1000);
      if (SearchTime > 1) {
        clearInterval(Timer);
        ApiCall();
      }
      return () => {
        clearInterval(Timer);
      };
    }
  }, [SearchTime]);

  // SET TABLE FILTER OPTIONS WHEN TAB SWITCH
  useEffect(() => {
    if (TableHeader?.length) {
      FilterOptionUpdate();
    }
  }, [TableHeader]);

  // WHEN PAGINATION CHANGE
  useEffect(() => {
    if (PostApi?.data !== null) {
      ApiCall();
    }
  }, [Tableconfig?.page_no]);

  // WHEN TAB CHANGE AND FIRST API CALL
  useEffect(() => {
    if (Tableconfig.total_page === null) {
      ApiCall();
    }
  }, [Tableconfig.total_page]);

  // WHEN TAB CHANGE
  useEffect(() => {
    setTableHeader([]);
    setTableconfig((prev) => ({
      ...prev,
      search: "",
      page_no: 1,
      total_page: null,
    }));
  }, [ActiveTab]);

  // INITIAL DATA
  useEffect(() => {
    return () => {
      setActiveTab(0);
      setTableconfig({
        page_no: 1,
        search: "",
        total_page: null,
      });
      setTableHeader([]);
      setTableBody([]);
      setFilterOptions([]);
      setSearchTime(0);
    };
  }, []);
  // SET TABLE API DATA
  useEffect(() => {
    if (PostApi?.data !== null) {
      if (Tableconfig?.total_page === null) {
        setTableconfig((prev) => ({
          ...prev,
          total_page: PostApi?.data?.body?.total_count,
        }));
      }

      let bodyArray = [];
      if (!TableHeader?.length) {
        let headerArray = [...PostApi?.data?.body?.column_list];
        headerArray.push({
          id: PostApi?.data?.body?.column_list?.length + 1,
          title: "Action",
          flex: 0.2,
          custom: true,
          is_show: true,
        });
        setTableHeader(() => headerArray);
      }
      let Response_type =
        PostApi?.data?.body?.[ActiveTab === 0 ? "child_list" : "group_list"];
      for (let i = 0; i < Response_type?.length; i++) {
        bodyArray.push({
          ...Response_type[i],
          action: (
            <div>
              <button
                className="action-btn"
                onClick={() =>
                  TestHandler(
                    ActiveTab === 0
                      ? Response_type[i].child_id
                      : Response_type[i].group_id
                  )
                }
              >
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>
          ),
        });
      }
      setTableBody(() => bodyArray);
    }
  }, [PostApi.data]);
  return (
    <div className="student-list-container">
      <div className="list-search-container">
        <Tabmenu
          list={["Student", "Group"]}
          ActiveTab={ActiveTab}
          setActiveTab={setActiveTab}
        />
        <div className="input-container">
          <label htmlFor="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            value={Tableconfig?.search}
            onChange={InputHandler}
          />
        </div>
      </div>

      <Tablecomponent
        TableHeader={TableHeader}
        TableBody={TableBody}
        FilterOptions={FilterOptions}
        setTableHeader={setTableHeader}
        setTableconfig={setTableconfig}
        Tableconfig={Tableconfig}
      />
    </div>
  );
};

export default Tabledashboard;
