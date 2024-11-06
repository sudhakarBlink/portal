import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import "./style.scss";
import useApiPost from "../../Hooks/usePost";
import Dropdownmenu from "../../Component/Dropdown";
const Calendar = () => {
  const PostApi = useApiPost();
  let CurrentMonth = new Date().getMonth();
  let CurrentYear = new Date().getFullYear();
  const [DateOptions, setDateOptions] = useState({
    month: CurrentMonth,
    year: CurrentYear,
  });
  const [Data, setData] = useState([]);
  const [Is_dailyschedule, setIs_dailyschedule] = useState(false);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    {
      key: 0,
      label: "January",
    },
    {
      key: 1,
      label: "February",
    },
    {
      key: 2,
      label: "March",
    },
    {
      key: 3,
      label: "April",
    },
    {
      key: 4,
      label: "May",
    },
    {
      key: 5,
      label: "June",
    },
    {
      key: 6,
      label: "July",
    },
    {
      key: 7,
      label: "August",
    },
    {
      key: 8,
      label: "September",
    },
    {
      key: 9,
      label: "October",
    },
    {
      key: 10,
      label: "November",
    },
    {
      key: 11,
      label: "December",
    },
  ];
  const Getday = (year, month, date) => {
    return new Date(year, month - 1, date).getDay();
  };
  const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const GetDateList = (year, month, data) => {
    let DuplicateArray = [];
    let Month_First_day = Getday(year, month, 1); // for get month start day
    let decrease_month = month - 1; // for past month
    let getLastMonthDays = daysInMonth(
      // get past month total days.
      decrease_month == 0 ? year - 1 : year,
      decrease_month == 0 ? 12 : decrease_month
    );
    let GetTotalDays = daysInMonth(year, month); // get current month total days
    let NextMonth = 35 - (Month_First_day + GetTotalDays); // get next month days

    if (Month_First_day !== 0) {
      for (let i = 0; i < Month_First_day; i++) {
        DuplicateArray.push({
          id: i + (getLastMonthDays - (Month_First_day - 1)),
          day: daysOfWeek[i],
          date: `${i + (getLastMonthDays - (Month_First_day - 1))}-${
            decrease_month == 0
              ? 12
              : decrease_month < 10
              ? `0${decrease_month}`
              : decrease_month
          }-${decrease_month == 0 ? year - 1 : year}`,
          month: "past",
          schedules: [],
        });
      }
    }
    // CURRENTMONTH
    // for (let i = 0; i < GetTotalDays; i++) {
    //   DuplicateArray.push({
    //     id: i + 1,
    //     // day: daysOfWeek[Getday(year, month, i + 1)],
    //     day: daysOfWeek[(i + Month_First_day) % 7],
    //     date: `${i + 1}-${month < 10 ? `0${month}` : month}-${year}`,
    //     month: "current",
    //   });
    // }
    DuplicateArray.push(...data);

    // NEXTMONTH
    for (let i = 0; i < NextMonth; i++) {
      DuplicateArray.push({
        id: i + 1,
        // day: daysOfWeek[Getday(year, month, i + 1)],
        day: daysOfWeek[(Month_First_day + GetTotalDays + i) % 7],
        date: `${i + 1}-${
          month == 12 ? `01` : month + 1 < 10 ? `0${month + 1}` : month + 1
        }-${month == 12 ? year + 1 : year}`,
        month: "next",
        schedules: [],
      });
    }
    setData(() => [...DuplicateArray]);
  };

  const CalendarHandler = (value) => {
    let DuplicateDate = { ...DateOptions };
    if (value === "-") {
      if (DuplicateDate.month === 0) {
        DuplicateDate.month = 11;
        DuplicateDate.year = DuplicateDate.year - 1;
      } else {
        DuplicateDate.month = DuplicateDate.month - 1;
      }
    } else {
      if (DuplicateDate.month === 11) {
        DuplicateDate.month = 0;
        DuplicateDate.year = DuplicateDate.year + 1;
      } else {
        DuplicateDate.month = DuplicateDate.month + 1;
      }
    }
    setDateOptions(() => ({ ...DuplicateDate }));
  };
  const MonthHandler = (e) => {
    setDateOptions((prev) => ({ ...prev, month: parseInt(e.key) }));
  };
  const YearHandler = (e) => {
    setDateOptions((prev) => ({ ...prev, year: parseInt(e.key) }));
  };
  useEffect(() => {
    PostApi.Postdata(
      `https://api-local-portal.dlearners.in/enabler/calender`,
      true,
      {
        month: DateOptions.month + 1,
        year: DateOptions.year,
      }
    );
    return () => {
      setData([]);
    };
  }, [DateOptions.month, DateOptions.year]);

  // WHEN API CALLED
  useEffect(() => {
    if (PostApi?.data !== null) {
      if (PostApi?.data?.status === 200)
        GetDateList(
          DateOptions.year,
          DateOptions.month + 1,
          PostApi?.data?.body
        );
    }
  }, [PostApi?.data]);

  return (
    <div className="calendar-conrainer">
      <div className="calendar-option-container">
        <div className="calendar-action-container">
          <button onClick={() => CalendarHandler("-")}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <div className="calendar-action-text">
            <Dropdownmenu
              type={"click"}
              items={months}
              CallbackHandler={MonthHandler}
            >
              <p className="month-text">{months[DateOptions.month].label}</p>
            </Dropdownmenu>
            ,
            <Dropdownmenu
              type={"click"}
              items={[
                {
                  key: 2020,
                  label: 2020,
                },
                {
                  key: 2021,
                  label: 2021,
                },
                {
                  key: 2022,
                  label: 2022,
                },
                {
                  key: 2023,
                  label: 2023,
                },
                {
                  key: 2024,
                  label: 2024,
                },
                {
                  key: 2025,
                  label: 2025,
                },
                {
                  key: 2026,
                  label: 2026,
                },
              ]}
              CallbackHandler={YearHandler}
            >
              <p className="year-text">{DateOptions?.year}</p>
            </Dropdownmenu>
          </div>
          <button onClick={() => CalendarHandler("+")}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
        <div className="calendar-legend-container">
          <div className="intervention">
            <span className="circle"></span>
            <p>Intervention session</p>
          </div>
          <div className="screening">
            <span className="circle"></span>
            <p>Screening session</p>
          </div>
        </div>

        <button
          onClick={() => {
            setIs_dailyschedule(true);
          }}
          className="view-schdeule-btn"
        >
          View daily schedule
        </button>
      </div>

      <div className="header">
        {daysOfWeek?.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
      <div className="body">
        {Data?.map((item, index) => {
          let currentDate = new Date()
            .toISOString()
            ?.split("T")[0]
            ?.split("-")
            ?.reverse()
            ?.join("-");
          return (
            <Popover
              key={index}
              content={
                <div className="date-popover-container">
                  {item?.schedules?.map((call, call_index) => {
                    return <button key={call_index}>{call?.title}</button>;
                  })}
                </div>
              }
              title={item?.date}
            >
              <div
                className="calendar-item"
                style={{
                  opacity: item?.month === "current" ? 1 : 0.3,
                  pointerEvents: item?.month === "current" ? "all" : "none",
                }}
              >
                <p
                  key={index}
                  className="date"
                  style={{
                    backgroundColor:
                      currentDate == item?.date
                        ? `var(--primary-color)`
                        : "transparent",
                  }}
                >
                  {item?.id}
                </p>

                <div className="total-class-indication intervention">
                  {item?.schedules?.map((i, i_ind) => {
                    return <span key={i_ind} className="circle"></span>;
                  })}
                </div>
                <div className="total-class-indication screening">
                  {item?.schedules?.map((i, i_ind) => {
                    return <span key={i_ind} className="circle"></span>;
                  })}
                </div>
              </div>
            </Popover>
          );
        })}
      </div>

      {Is_dailyschedule && (
        <div className="daily-schedule-container">
          <div className="daily-schedule-header">
            <p>Daily schedule</p>
            <button
              onClick={() => {
                setIs_dailyschedule(false);
              }}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </button>
          </div>
          <div className="select-date-container">
            <label htmlFor="date">Select date</label>
            <input type="date" name="" id="" />
          </div>

          <div className="select-all-container">
            <input type="checkbox" name="selectall" id="selectall" />
            <label htmlFor="selectall">Select all</label>
          </div>
          <div className="schedule-list-container">
            {[...new Array(10)].map((item, index) => {
              return (
                <div className="schedule-item" key={index}>
                  <div className="scheudle-item-input">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="schedule-item-detail">
                    <p className="schedule-item-detail-title">
                      Intervention Session
                    </p>
                    <p className="schedule-item-detail-description">
                      Meera - class with Us Test
                    </p>
                  </div>
                  <div className="schedule-item-time">
                    <p>{index + 15}:00 AM</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="scheudle-request-btn">
            <button>Request reschedule</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
