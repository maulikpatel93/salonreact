import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import { staffOptions } from "../../../store/slices/staffSlice";
import { ucfirst } from "helpers/functions";
import { rosterListViewApi, openAddRosterForm, openEditRosterForm, closeAddRosterForm, closeEditRosterForm, closeDeleteModal, rosterDeleteApi, staffFilter, resetStaffFilter } from "../../../store/slices/rosterSlice";
import Moment from "react-moment";
import AddTimeForm from "./AddTimeForm";
import EditTimeForm from "./EditTimeForm";
import DatePicker from "react-multi-date-picker";
import moment from "moment";

const Roster = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isStaffOption = useSelector((state) => state.staff.isStaffOption);
  const rosterListview = useSelector((state) => state.roster.isListView);
  const addTime = useSelector((state) => state.roster.isOpenedAddForm);
  const updateTime = useSelector((state) => state.roster.isOpenedEditForm);
  const isDeleteModal = useSelector((state) => state.roster.isDeleteModal);
  const isStaffFilter = useSelector((state) => state.roster.isStaffFilter);
  useEffect(() => {
    dispatch(staffOptions({ dropdown: true }));
    if (isStaffFilter) {
      dispatch(rosterListViewApi({ id: isStaffFilter.id }));
    } else {
      dispatch(rosterListViewApi());
    }
    //dispatch(resetStaffFilter());
  }, []);

  const getselectedDate = moment(selectedDate?.toDate?.().toString()).format("YYYY-MM-DD");
  const getselectedDatePicker = moment(selectedDate?.toDate?.().toString()).format("MMMM DD, YYYY");
  const prevday = moment(getselectedDate).subtract(1, "days");
  const nextday = moment(getselectedDate).add(1, "days");

  let curr = new Date(getselectedDate);

  let week = [];
  for (let i = 0; i <= 6; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let date = new Date(curr.setDate(first)).toISOString().slice(0, 10); //2022-11-01 format
    // let date = moment(curr.setDate(first)).format("YYYY-MM-DD"); //2022-11-01 format
   
    // let day = new Date(curr.setDate(first));
    //     let day = date.toLocaleString("en-Us", { weekday: "short", day: "numeric", year: "numeric", month: "short" });
    week.push(date);
  }

  // console.log(moment().day(2));
  // console.log(getselectedDate);

  const handleRosterDelete = (e) => {
    const obj = JSON.parse(e.currentTarget.dataset.obj);
    dispatch(rosterDeleteApi({ id: obj.id })).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        dispatch(closeAddRosterForm());
        dispatch(closeEditRosterForm());
        dispatch(closeDeleteModal());
        dispatch(rosterListViewApi());
      }
    });
    // const name = ucfirst(props.name);
    // let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete_pricetier"), message: name, confirmButtonText: t("yes_delete_it") });
    // if (confirmbtn == true) {
    //   dispatch(rosterDeleteApi({ id: props.id })).then((action) => {
    //     console.log(action);
    //   });
    // }
  };
  return (
    <>
      <div className="row justify-content-between">
        <div className="col-xl-2 col-md-5">
          <div className="dropdown staff-dropdown">
            <div className="btn-group w-100">
              <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {isStaffFilter ? isStaffFilter.name : t("All_Staff")}
              </button>
              <span
                className="btn btn-primary"
                onClick={() => {
                  dispatch(resetStaffFilter());
                  dispatch(rosterListViewApi());
                }}
              >
                x
              </span>
              <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                <ul className="p-0 m-0 list-unstyled">
                  {isStaffOption &&
                    Object.keys(isStaffOption).map((item, i) => {
                      let id = isStaffOption[item].id;
                      let first_name = isStaffOption[item].first_name;
                      let last_name = isStaffOption[item].last_name;
                      let image_url = isStaffOption[item].profile_photo_url;
                      let name = ucfirst(first_name) + " " + ucfirst(last_name);
                      return (
                        <li key={i} data-id={id}>
                          <a
                            className="d-flex align-items-center cursor-pointer"
                            onClick={() => {
                              dispatch(staffFilter({ id, name }));
                              dispatch(rosterListViewApi({ id }));
                            }}
                          >
                            <div className="user-img me-2">{image_url ? <img src={image_url} alt="" className="rounded-circle wh-32" /> : <div className="user-initial">{first_name.charAt(0) + last_name.charAt(0)}</div>}</div>
                            <div className="user-id">
                              <span className="user-name">{name}</span>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-xl-3">
          <div className="">
            <div className="date">
              <div className="input-group">
                <span className="input-group-text icon bg-white" onClick={() => setSelectedDate(prevday)}>
                  <i className="fal fa-chevron-left"></i>
                </span>
                <DatePicker value={getselectedDatePicker} inputClass="form-control" placeholder="August 19, 2021" format={"MMMM DD, YYYY"} onChange={setSelectedDate} />
                <span className="input-group-text day cursor-pointer bg-white" onClick={() => setSelectedDate(new Date())}>
                  {t("Today")}
                </span>
                <span className="input-group-text icon bg-white" onClick={() => setSelectedDate(nextday)}>
                  <i className="fal fa-chevron-right bg-white"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-bordered bg-white mb-0 rosterlistviewtable">
          <thead className="thead-dark">
            <tr>
              <th>{t("Staff_Member")}</th>
              {week &&
                week.map((date, i) => {
                  let classname = getselectedDate && date && getselectedDate === date ? "active" : "";
                  return (
                    <th key={i} date={date} className={classname}>
                      <Moment format="ddd DD MMM YYYY">{date}</Moment>
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody className="body-cover">
            {rosterListview &&
              Object.keys(rosterListview).map((item, i) => {
                let id = rosterListview[item].id;
                let first_name = rosterListview[item].first_name;
                let last_name = rosterListview[item].last_name;
                let rosterfield = rosterListview[item].rosterfield;
                //     let image_url = isStaffOption[item].profile_photo_url;
                return (
                  <tr key={i} data-id={id}>
                    <td>{ucfirst(first_name) + " " + ucfirst(last_name)}</td>
                    {week &&
                      week.map((date, j) => {
                        let rosterdata = rosterfield && rosterfield.filter((item) => item.date === date);
                        let classname = getselectedDate && item && getselectedDate === date ? "active" : "";
                        return (
                          <td date={item} className={classname} align="center" key={id + j} style={{ backgroundColor: rosterdata.length > 0 && rosterdata[0].away === "1" ? "rgb(143, 128, 125)" : "transparent" }}>
                            {rosterdata.length > 0 ? (
                              <>
                                {rosterdata[0].away === "1" ? (
                                  <a
                                    className="away-text cursor-pointer"
                                    data-id={id + "-" + j}
                                    onClick={(e) => {
                                      dispatch(closeAddRosterForm());
                                      dispatch(openEditRosterForm(e.currentTarget.getAttribute("data-id")));
                                    }}
                                  >
                                    {t("AWAY")}
                                  </a>
                                ) : (
                                  <a
                                    className="updated-time show cursor-pointer"
                                    data-id={id + "-" + j}
                                    onClick={(e) => {
                                      dispatch(closeAddRosterForm());
                                      dispatch(openEditRosterForm(e.currentTarget.getAttribute("data-id")));
                                    }}
                                  >
                                    <Moment format="hh:mm A">{date + "T" + rosterdata[0].start_time}</Moment>-<Moment format="hh:mm A">{date + "T" + rosterdata[0].end_time}</Moment>
                                  </a>
                                )}
                              </>
                            ) : (
                              <a
                                className="add-time cursor-pointer"
                                data-id={id + "-" + j}
                                onClick={(e) => {
                                  dispatch(closeEditRosterForm());
                                  dispatch(openAddRosterForm(e.currentTarget.getAttribute("data-id")));
                                }}
                              >
                                <img src={config.imagepath + "plus-gray.png"} alt="" />
                              </a>
                            )}

                            {addTime === id + "-" + j ? (
                              <div className="addtime-popup">
                                <a className="close cursor-pointer" onClick={() => dispatch(closeAddRosterForm())}>
                                  <img src={config.imagepath + "close-icon.svg"} alt="" />
                                </a>
                                <AddTimeForm staff_id={id} date={date} />
                              </div>
                            ) : (
                              ""
                            )}

                            {updateTime === id + "-" + j ? (
                              <div className="updatetime-popup">
                                <a className="close cursor-pointer" onClick={() => dispatch(closeEditRosterForm())}>
                                  <img src={config.imagepath + "close-icon.svg"} alt="" />
                                </a>
                                <EditTimeForm staff_id={id} date={date} roster={rosterdata.length > 0 && rosterdata[0]} />
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isDeleteModal && (
          <div className="modal fade show" id="removetimemodal" tabIndex="-1" aria-labelledby="removetimeModalLabel" aria-hidden="true" style={{ display: "block", paddingRight: "15px" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content ">
                <div className="modal-body text-center p-md-4 p-3">
                  <img src={config.imagepath + "warning-red.png"} className="mb-lg-3 mb-2" alt="" />
                  <h5>{t("Are_you_sure")}</h5>
                  <h6>{t("roster_delete_note")}</h6>
                </div>
                <div className="modal-footer p-md-4 p-3 justify-content-center border-0">
                  <button type="button" className="btn btn-outline-primary" onClick={() => dispatch(closeDeleteModal())}>
                    {t("Cancel")}
                  </button>
                  <button type="button" className="btn btn-primary" data-obj={isDeleteModal} onClick={(e) => handleRosterDelete(e)}>
                    {t("Remove_This_Shift")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Roster;
