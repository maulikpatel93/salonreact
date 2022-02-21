import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../config";

const SaleDrawer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  return (
    <>
      <div className="drawer" id="addclient-drawer">
        <div className="drawer-wrp position-relative include-footer">
          <div className="drawer-header">
            <h2 className="mb-4 pe-md-5 pe-3">New Client</h2>
            <a className="close-drawer">
              <img src="assets/images/close-icon.svg" alt="" />
            </a>
          </div>
          <div className="drawer-body pb-md-5 pb-3">
            <form action="">
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">First Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">Last Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">Mobile</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">Email Address</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">Date of Birth</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">Gender</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-3 search">
                <label htmlFor="">Address</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="far fa-search"></i>
                  </span>
                  <input type="text" className="form-control search-input" placeholder="Start typing address" />
                  <a className="close">
                    <i className="fal fa-times"></i>
                  </a>
                </div>
                <div className="search-result dropdown-box">
                  <ul className="p-0 m-0 list-unstyled">
                    <li>
                      <a href="#" className="d-flex">
                        <div className="user-img me-2">
                          <img src={config.imagepath + "Avatar.png"} alt="" />
                        </div>
                        <div className="user-id">
                          <span className="user-name">Jo Smith</span>
                          <span className="user-id">jo.smith@gmail.com</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex">
                        test
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="">Street</label>
                <input type="text" className="form-control" />
              </div>
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <label htmlFor="">Suburb</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-sm-3 col-6 mb-3">
                  <label htmlFor="">State</label>
                  <select name="" id="" className="form-control">
                    <option value=""></option>
                    <option value="">Yes</option>
                    <option value="">No</option>
                  </select>
                </div>
                <div className="col-sm-3 col-6 mb-3">
                  <label htmlFor="">Postcode</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="">Client Notes</label>
                <textarea id="my-textarea" className="form-control" name="" rows="5" placeholder="For example, allergic to latex"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="">Notifcations</label>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  <span>Send SMS notifications to client</span>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  <span>Send email notifications to client</span>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  <span>Client agrees to receive marketing emails</span>
                </div>
              </div>
            </form>
          </div>
          <div className="drawer-footer">
            <input type="submit" className="btn w-100 btn-lg" defaultValue="Save Client" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleDrawer;
