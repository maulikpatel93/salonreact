import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import { staffOptions } from "../../../store/slices/staffSlice";
import { ucfirst } from "helpers/functions";
import { rosterListViewApi, openAddRosterForm, openEditRosterForm, closeAddRosterForm, closeEditRosterForm, closeDeleteModal, rosterDeleteApi } from "../../../store/slices/rosterSlice";
import Moment from "react-moment";
import AddTimeForm from "./AddTimeForm";
import EditTimeForm from "./EditTimeForm";

const Roster = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(staffOptions({ dropdown: true }));
    dispatch(rosterListViewApi());
  }, []);
  //   const auth = useSelector((state) => state.auth);
  //   const currentUser = auth.user;
  const isStaffOption = useSelector((state) => state.staff.isStaffOption);
  const rosterListview = useSelector((state) => state.roster.isListView);
  const addTime = useSelector((state) => state.roster.isOpenedAddForm);
  const updateTime = useSelector((state) => state.roster.isOpenedEditForm);
  const isDeleteModal = useSelector((state) => state.roster.isDeleteModal);

  let curr = new Date();
  let week = [];
  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let date = new Date(curr.setDate(first)).toISOString().slice(0, 10); //2022-11-01 format
    //     let day = new Date(curr.setDate(first));
    //     let day = date.toLocaleString("en-Us", { weekday: "short", day: "numeric", year: "numeric", month: "short" });
    week.push(date);
  }

  const handleRosterDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    dispatch(rosterDeleteApi({ id: props.id })).then((action) => {
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
            <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {t("All_Staff")}
            </button>
            <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
              <ul className="p-0 m-0 list-unstyled">
                {isStaffOption &&
                  Object.keys(isStaffOption).map((item, i) => {
                    let id = isStaffOption[item].id;
                    let first_name = isStaffOption[item].first_name;
                    let last_name = isStaffOption[item].last_name;
                    let image_url = isStaffOption[item].profile_photo_url;
                    return (
                      <li key={i} data-id={id}>
                        <a className="d-flex align-items-center cursor-pointer" onClick={() => console.log(id)}>
                          <div className="user-img me-2">{image_url ? <img src={image_url} alt="" className="rounded-circle wh-32" /> : <div className="user-initial">{first_name.charAt(0) + last_name.charAt(0)}</div>}</div>
                          <div className="user-id">
                            <span className="user-name">{ucfirst(first_name) + " " + ucfirst(last_name)}</span>
                          </div>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-xl-10"></div>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-bordered bg-white mb-0">
          <thead className="thead-dark">
            <tr>
              <th>Staff Member</th>
              {week &&
                week.map((item, i) => (
                  <th key={i}>
                    <Moment format="ddd DD MMM">{item}</Moment>
                  </th>
                ))}
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
                        return (
                          <td align="center" key={id + j} style={{ backgroundColor: rosterdata.length > 0 && rosterdata[0].away === "1" ? "rgb(143, 128, 125)" : "transparent" }}>
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
                  <h5>Are you sure?</h5>
                  <h6>You are about to remove a shift that repeats weekly. Removing this shift will update Amanda’s ongoing working hours.</h6>
                </div>
                <div className="modal-footer p-md-4 p-3 justify-content-center border-0">
                  <button type="button" className="btn btn-outline" onClick={() => dispatch(closeDeleteModal())}>
                    Cancel
                  </button>
                  <button type="button" className="btn" data-obj={isDeleteModal} onClick={(e) => handleRosterDelete(e)}>
                    Yes, Remove This Shift
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
