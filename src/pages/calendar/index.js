import React from "react";
import { SalonModule } from "pages";
import config from "../../config";

const Calendar = () => {
  SalonModule();
  return (
    <>
      <div className="page-content">
        <section className="calendar">
          <div className="calendar-header">
            <div className="container">
              <div className="row">
                <div className="col-sm-auto col-12 pt-lg-4 pt-md-3 pt-2">
                  <div className="dropdown staff-dropdown">
                    <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      All Staff
                    </button>
                    <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                      <ul className="p-0 m-0 list-unstyled">
                        <li>
                          <a href="#" className="d-flex align-items-center">
                            <div className="user-img me-2">
                              <img src={config.imagepath+"Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Whitney Blessing</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex align-items-center">
                            <div className="user-img me-2">
                              <img src={config.imagepath+"Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex align-items-center">
                            <div className="user-img me-2">
                              <img src={config.imagepath+"Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-auto pt-lg-4 pt-md-3 pt-2">
                  <div className="date">
                    <div className="input-group">
                      <span className="input-group-text icon">
                        <i className="fal fa-chevron-left"></i>
                      </span>
                      <input type="text" className="form-control" defaultValue="August 19, 2021" placeholder="date" />
                      <span className="input-group-text day">Today</span>
                      <span className="input-group-text icon">
                        <i className="fal fa-chevron-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-auto pt-lg-4 pt-md-3 pt-2">
                  <div className="list-group custom-tab mb-sm-0 mb-2" id="myList" role="tablist">
                    <a className="list-group-item list-group-item-action active" data-bs-toggle="list" href="#day" role="tab">
                      Day
                    </a>
                    <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#week" role="tab">
                      Week
                    </a>
                  </div>
                </div>
                <div className="col-auto pt-lg-4 pt-md-3 pt-2 text-end ms-auto">
                  <a href="#" className="btn btn-secondary me-1 print-img" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Print Calendar">
                    <img src={config.imagepath+"print.png"} alt="" />
                  </a>
                  <div className="dropdown d-inline-block create-dropdown">
                    <button className="dropdown-toggle dropdown-toggle-icon-none btn btn-primary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fal fa-plus"></i>Create
                    </button>
                    <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                      <ul className="p-0 m-0 list-unstyled">
                        <li>
                          <a id="addbusytime-drawer-link" className="d-flex align-items-center">
                            Add Busy Time
                          </a>
                        </li>
                        <li>
                          <a id="addappoinment-drawer-link" className="d-flex align-items-center">
                            Add Appointment
                          </a>
                        </li>
                        <li>
                          <a id="addclient-drawer-link" className="d-flex align-items-center">
                            Add Client
                          </a>
                        </li>
                        <li>
                          <a id="addsale-drawer-link" className="d-flex align-items-center">
                            Add Sale
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="tab-content py-lg-5 py-3">
              <div className="tab-pane active" id="day" role="tabpanel">
                plugin
              </div>
              <div className="tab-pane" id="week" role="tabpanel">
                plugin............
              </div>
            </div>
          </div>
          <div className="drawer" id="addbusytime-drawer">
            <div className="drawer-wrp position-relative">
              <div className="drawer-header">
                <h2 className="mb-4 pe-md-5 pe-3">Add Busy Time</h2>
                <a className="close-drawer">
                  <img src="assets/images/close-icon.svg" alt="" />
                </a>
              </div>
              <div className="drawer-body">
                <form action="">
                  <div className="mb-3">
                    <label htmlFor="">Staff Member</label>
                    <select name="" id="" className="form-control">
                      <option value="">Select Staff Member</option>
                      <option value="">Member</option>
                      <option value="">Member</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Date</label>
                    <input type="text" className="form-control date" defaultValue="Wednesday, August 19th 2021" placeholder="Select Date"  />
                  </div>
                  <div className="row gx-3">
                    <div className="col-sm-6 mb-3">
                      <label htmlFor="">Start Time</label>
                      <input type="text" className="form-control" placeholder="--/--" />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label htmlFor="">End Time</label>
                      <input type="text" className="form-control" placeholder="--/--" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Repeats</label>
                    <select name="" id="" className="form-control">
                      <option value="">Yes</option>
                      <option value="">No</option>
                    </select>
                  </div>
                  <div className="mb-3 error">
                    <label htmlFor="">Reason</label>
                    <textarea id="my-textarea" className="form-control" name="" rows="8" placeholder="e.g. Training, lunch break etc"></textarea>
                    <span className="error-txt">Error</span>
                  </div>
                  <input type="submit" className="btn w-100 btn-lg" defaultValue="Save" />
                </form>
              </div>
            </div>
          </div>
          <div className="drawer" id="addappoinment-drawer">
            <div className="drawer-wrp position-relative">
              <div className="drawer-header">
                <h2 className="mb-4 pe-md-5 pe-3">Add Appointment</h2>
                <a className="close-drawer">
                  <img src="assets/images/close-icon.svg" alt="" />
                </a>
              </div>
              <div className="drawer-body pymd-5 py-3">
                <form action="">
                  <div className="mb-3 search">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="">Date</label>
                      <a id="addclient-link" className="h6 mb-0">
                        <i className="fal fa-plus pe-1 small"></i>New Client
                      </a>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="far fa-search"></i>
                      </span>
                      <input type="text" className="form-control search-input" placeholder="Start typing client’s name" />
                      <a className="close">
                        <i className="fal fa-times"></i>
                      </a>
                    </div>
                    <div className="search-result dropdown-box">
                      <ul className="p-0 m-0 list-unstyled">
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-img me-2">
                              <img src={config.imagepath+"Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                              <span className="user-id">jo.smith@gmail.com</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-img me-2">
                              <img src={config.imagepath+"Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                              <span className="user-id">jo.smith@gmail.com</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="d-flex">
                            <div className="user-img me-2">
                              <img src={config.imagepath+"Avatar.png"} alt="" />
                            </div>
                            <div className="user-id">
                              <span className="user-name">Jo Smith</span>
                              <span className="user-id">jo.smith@gmail.com</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Date</label>
                    <input type="text" className="form-control date " defaultValue="Wednesday, August 19th 2021" placeholder="Select Date" />
                  </div>
                  <div className="row gx-2">
                    <div className="col-sm-4 mb-3">
                      <label htmlFor="">Start Time</label>
                      <input type="text" className="form-control" placeholder="--/--" />
                    </div>
                    <div className="col-sm-8 mb-3">
                      <label htmlFor="">Service</label>
                      <select name="" id="" className="form-control">
                        <option value="">Choose Service</option>
                        <option value="">Service</option>
                        <option value="">Service</option>
                      </select>
                    </div>
                  </div>
                  <div className="row gx-2">
                    <div className="col-sm-6 mb-3">
                      <label htmlFor="">Staff</label>
                      <select name="" id="" className="form-control">
                        <option value="">Choose Staff</option>
                        <option value="">Member</option>
                        <option value="">Member</option>
                      </select>
                    </div>
                    <div className="col-sm-3 col-6 mb-3">
                      <label htmlFor="">Duration</label>
                      <input type="text" className="form-control" placeholder="--/--" />
                    </div>
                    <div className="col-sm-3 col-6 mb-3">
                      <label htmlFor="">Cost</label>
                      <input type="text" className="form-control" placeholder="$" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Repeats</label>
                    <select name="" id="" className="form-control">
                      <option value="">Yes</option>
                      <option value="">No</option>
                    </select>
                    <a href="#" className="btn-secondary mt-3">
                      Add Another Service
                    </a>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Booking notes</label>
                    <textarea id="my-textarea" className="form-control" name="" rows="5" placeholder="Add any notes about the appointment"></textarea>
                  </div>
                </form>
              </div>
              <div className="drawer-footer">
                <div className="row justify-content-between">
                  <div className="col-auto h5 mb-3">Total of 1hr 45 minutes</div>
                  <div className="col-auto h5 mb-3">$180.00</div>
                </div>
                <input type="submit" className="btn w-100 btn-lg" defaultValue="Save Appointment" />
              </div>
            </div>
          </div>
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
                              <img src={config.imagepath+"Avatar.png"} alt="" />
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
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"  />
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
          <div className="drawer viewappoinment">
            <div className="drawer-wrp position-relative include-footer">
              <div className="drawer-header">
                <a className="close-drawer">
                  <img src="assets/images/close-icon.svg" alt="" />
                </a>
                <div className="d-flex mb-3 client-detaildrawer w-100">
                  <div className="user-initial me-md-3 me-2">js</div>
                  <div className="user-id">
                    <h3 className="user-name mb-0">Jo Smith</h3>
                    <span className="user-id">jo.smith@gmail.com</span>
                  </div>
                </div>
              </div>
              <div className="drawer-body pymd-5 py-3">
                <div className="d-flex gx-2 action-box mb-3 justify-content-between align-items-end">
                  <a href="#" className="me-md-4 me-2 text-center text-decoration-none">
                    <img src="assets/images/edit-big.png" alt="" />
                    <span className="d-block">Edit</span>
                  </a>
                  <a href="#" className="me-md-4 me-2 text-center text-decoration-none">
                    <img src="assets/images/appoinment.png" alt="" />
                    <span className="d-block">Reschedule</span>
                  </a>
                  <a href="#" className="me-md-4 me-2 text-center text-decoration-none">
                    <img src="assets/images/book-next.png" alt="" />
                    <span className="d-block">Book Next</span>
                  </a>
                  <a href="#" className="me-md-4 me-2 text-center text-decoration-none">
                    <img src="assets/images/email.png" alt="" />
                    <span className="d-block">Email</span>
                  </a>
                  <a href="#" className=" text-center text-decoration-none">
                    <img src="assets/images/sms.png" alt="" />
                    <span className="d-block">SMS</span>
                  </a>
                </div>
                <h3>Monday, August 17th 2021</h3>
                <p className="address">
                  <b>Hair Cut & Blow Dry - $120</b>
                  <br />
                  Amanda Jones
                  <br />
                  9:00am - 10:00am
                </p>
                <form action="" className="mb-md-4 mb-3">
                  <label htmlFor="">Status</label>
                  <select name="" id="" className="form-control">
                    <option value="">Confirmed</option>
                    <option value="">No</option>
                  </select>
                </form>
                <div className="desc">
                  <p>Client will be arriving early to be able to start before 9am if Amanda is available and will be needing to leave by 10:15am at the latest. </p>
                </div>
              </div>
              <div className="drawer-footer d-flex align-items-center">
                <a href="#" className="btn-secondary me-2  btn-lg">
                  <img src="assets/images/delete.png" alt="" style={{ maxWidth: "20px" }} />
                </a>
                <button type="submit" className="btn w-100 btn-lg" >Checkout</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Calendar;
