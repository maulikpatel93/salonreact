import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import { staffOptions } from "../../../store/slices/staffSlice";
import { ucfirst } from "helpers/functions";
import { rosterListViewApi } from "../../../store/slices/rosterSlice";
import Moment from "react-moment";
import AddTimeForm from "./AddTimeForm";

const Roster = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let [addTime, setAddTime] = useState(false);

  useEffect(() => {
    dispatch(staffOptions({ dropdown: true }));
    dispatch(rosterListViewApi());
  }, []);
  //   const auth = useSelector((state) => state.auth);
  //   const currentUser = auth.user;
  const isStaffOption = useSelector((state) => state.staff.isStaffOption);
  const rosterListview = useSelector((state) => state.roster.isListView);
  console.log(rosterListview);
  let curr = new Date();
  let week = [];
  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let date = new Date(curr.setDate(first)).toISOString().slice(0, 10); //2022-11-01 format
    //     let day = new Date(curr.setDate(first));
    //     let day = date.toLocaleString("en-Us", { weekday: "short", day: "numeric", year: "numeric", month: "short" });
    week.push(date);
  }

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
                        
                        // console.log(i);
                        return (
                          <td align="center" key={id + j}>
                            {rosterdata.length > 0 ? (
                              <a className="updated-time show">9:00am - 5:00pm</a>
                            ) : (
                              <a className="add-time cursor-pointer" data-id={id + "-" + j} onClick={(e) => setAddTime(e.currentTarget.getAttribute("data-id"))}>
                                <img src={config.imagepath + "plus-gray.png"} alt="" />
                              </a>
                            )}

                            {addTime === id + "-" + j ? (
                              <div className="addtime-popup" style={{ display: addTime === id + "-" + j ? "block" : "none" }}>
                                <a className="close cursor-pointer" onClick={() => setAddTime(false)}>
                                  <img src={config.imagepath + "close-icon.svg"} alt="" />
                                </a>
                                <AddTimeForm staff_id={id} date={date} />
                              </div>
                            ) : (
                              ""
                            )}

                            {/* <AddTime date={day} index={i} staff_id={id} />
                            <UpdateTime date={day} index={i} staff_id={id} /> */}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="modal fade" id="removetimemodal" tabIndex="-1" aria-labelledby="removetimeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content ">
              <div className="modal-body text-center p-md-4 p-3">
                <img src="assets/images/warning-red.png" className="mb-lg-3 mb-2" alt="" />
                <h5>Are you sure?</h5>
                <h6>You are about to remove a shift that repeats weekly. Removing this shift will update Amanda’s ongoing working hours.</h6>
              </div>
              <div className="modal-footer p-md-4 p-3 justify-content-center border-0">
                <button type="button" className="btn btn-outline" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="button" className="btn">
                  Yes, Remove This Shift
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roster;
