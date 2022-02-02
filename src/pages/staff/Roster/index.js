import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import { staffOptions } from "../../../store/slices/staffSlice";
// import { openAddPriceTierForm, pricetierGridViewApi } from "../../../store/slices/rosterSlice";

const Roster = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

//   const auth = useSelector((state) => state.auth);
//   const currentUser = auth.user;

  useEffect(() => {
    dispatch(staffOptions({ option: { valueField: "id", labelField: "name" } }));
  }, []);
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
                <li>
                  <a className="d-flex align-items-center">
                    <div className="user-img me-2">
                      <img src="assets/images/Avatar.png" alt="" />
                    </div>
                    <div className="user-id">
                      <span className="user-name">Whitney Blessing</span>
                    </div>
                  </a>
                </li>
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
              <th></th>
              <th>Tues 11 Oct</th>
              <th>Tues 12 Oct</th>
              <th>Wed 13 Oct</th>
              <th>Thurs 14 Oct</th>
              <th>Fri 15 Oct</th>
              <th>Sat 16 Oct</th>
              <th>Sun 17 Oct</th>
            </tr>
          </thead>
          <tbody className="body-cover">
            <tr>
              <td>Amanda Jones</td>
              <td align="center">
                <a className="updated-time show">9:00am - 5:00pm</a>
                <a className="add-time" style={{ display: "none" }}>
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
                <a className="away-text" style={{ display: "none" }}>
                  Away
                </a>
                <div className="updatetime-popup" style={{ display: "none" }}>
                  <a className="close">
                    <img src={config.imagepath + "close-icon.png"} alt="" />
                  </a>
                  <div className="p-md-4 p-3">
                    <h6 className="fw-semibold text-start mb-3">Set start and end time</h6>
                    <div className="d-flex align-items-center">
                      <input type="text" className="start-time form-control" />
                      <span className="px-md-2 px-1">to</span>
                      <input type="text" className="start-time form-control" />
                      <input type="submit" className="btn ms-md-3 ms-1" />
                    </div>
                  </div>
                  <div className="popup-footer d-flex text-center">
                    <a id="mark-away" className="col-6">
                      Mark as Away
                    </a>
                    <a id="mark-not-away" style={{ display: "none" }} className="col-6">
                      Mark as Not Away
                    </a>
                    <a id="removetime" className="col-6" data-bs-toggle="modal" data-bs-target="#removetimemodal">
                      Remove Shift
                    </a>
                  </div>
                </div>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
                <div className="addtime-popup" style={{ display: "none" }}>
                  <a className="close">
                    <img src={config.imagepath + "close-icon.svg"} alt="" />
                  </a>
                  <div className="p-md-4 p-3">
                    <h6 className="fw-semibold text-start mb-3">Set start and end time</h6>
                    <div className="d-flex align-items-center">
                      <input type="text" className="start-time form-control" />
                      <span className="px-md-2 px-1">to</span>
                      <input type="text" className="start-time form-control" />
                      <input type="submit" className="btn ms-md-3 ms-1" />
                    </div>
                  </div>
                </div>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
              <td align="center">
                <a className="updated-time" style={{ display: "none" }}>
                  9:00am - 5:00pm
                </a>
                <a className="add-time">
                  <img src={config.imagepath + "plus-gray.png"} alt="" />
                </a>
              </td>
            </tr>
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
