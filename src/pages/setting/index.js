import React from "react";
import { SalonModule } from "pages";

const Setting = () => {
  SalonModule();
  return (
    <>
      <div className="page-content ac-setup-page">
        <div className="d-flex align-items-start ac-setup">
          <div className="nav flex-column nav-pills acsetup-left" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button className="nav-link" id="v-pills-businessdetails-tab" data-bs-toggle="pill" data-bs-target="#v-pills-businessdetails" type="button" role="tab" aria-controls="v-pills-businessdetails" aria-selected="true">
              Business Details
            </button>
            <button className="nav-link" id="v-pills-ClosedDates-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ClosedDates" type="button" role="tab" aria-controls="v-pills-ClosedDates" aria-selected="false">
              Closed Dates
            </button>
            <button className="nav-link" id="v-pills-ClientNotifications-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ClientNotifications" type="button" role="tab" aria-controls="v-pills-ClientNotifications" aria-selected="false">
              Client Notifications
            </button>
            <button className="nav-link" id="v-pills-Permissions-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Permissions" type="button" role="tab" aria-controls="v-pills-Permissions" aria-selected="false">
              Permissions
            </button>
            <button className="nav-link" id="v-pills-SMSUsage-tab" data-bs-toggle="pill" data-bs-target="#v-pills-SMSUsage" type="button" role="tab" aria-controls="v-pills-SMSUsage" aria-selected="false">
              SMS Usage
            </button>
            <button className="nav-link" id="v-pills-Integrations-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Integrations" type="button" role="tab" aria-controls="v-pills-Integrations" aria-selected="false">
              Integrations
            </button>
            <button className="nav-link" id="v-pills-ConsultationForms-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ConsultationForms" type="button" role="tab" aria-controls="v-pills-ConsultationForms" aria-selected="false">
              Consultation Forms
            </button>
            <button className="nav-link" id="v-pills-BookingButtons-tab" data-bs-toggle="pill" data-bs-target="#v-pills-BookingButtons" type="button" role="tab" aria-controls="v-pills-BookingButtons" aria-selected="false">
              Booking Buttons
            </button>
            <button className="nav-link" id="v-pills-Analytics-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Analytics" type="button" role="tab" aria-controls="v-pills-Analytics" aria-selected="false">
              Analytics
            </button>
          </div>
          <div className="acsetup-right">
            <div className="alltab-box">
              <div className="row">
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Business Details</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Closed Dates</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Client Notifications</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Cancellation Reasons</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Permissions</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>SMS Usage</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Integrations</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Consultation Forms</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Booking Buttons</h6>
                  </div>
                </a>
                <a className="box-image-cover" href="#">
                  <div className="image-content">
                    <h6>Analytics</h6>
                  </div>
                </a>
              </div>
            </div>
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade" id="v-pills-businessdetails" role="tabpanel" aria-labelledby="v-pills-businessdetails-tab">
                <form action="" className="position-relative">
                  <div className="input-field">
                    <div className="row">
                      <div className="col-md-4 mb-md-0 mb-3 text-md-start text-center">
                        <h4 className="fw-semibold mb-0">Business Details</h4>
                        <p>Add the name and general details of this product.</p>
                      </div>
                      <div className="col-xl-5 col-lg-6 col-md-8">
                        <div className="mb-3">
                          <label htmlFor="">Business Name</label>
                          <input type="text" placeholder="Famous Digital" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="">Business Website</label>
                          <input type="text" placeholder="www.thefamousgroup.com.au" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="">Business Phone Number</label>
                          <input type="text" placeholder="0451 514 497" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="">Business Type</label>
                          <select className="form-control mb-1">
                            <option value="">Beauty Salon</option>
                            <option value="">Beauty Salon</option>
                            <option value="">Beauty Salon</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="">Street</label>
                          <input type="text" placeholder="144 Grey Street" className="form-control" />
                        </div>
                        <div className="row gx-2">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="">Suburb</label>
                            <input type="text" placeholder="Southbank" className="form-control" />
                          </div>
                          <div className="col-md-3 col-6 mb-3">
                            <label htmlFor="">State</label>
                            <select className="form-control mb-1">
                              <option value="">QLD</option>
                              <option value="">QLD</option>
                              <option value="">QLD</option>
                            </select>
                          </div>
                          <div className="col-md-3 col-6 mb-3">
                            <label htmlFor="">Postcode</label>
                            <input type="text" placeholder="4001" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="row">
                      <div className="col-md-4 mb-md-0 mb-3 text-md-start text-center">
                        <h4 className="fw-semibold mb-0">Localisation</h4>
                        <p>Add the pricing details of this product.</p>
                      </div>
                      <div className="col-xl-5 col-lg-6 col-md-8">
                        <div className="row gx-2">
                          <div className="col-xl-6">
                            <div className="mb-3">
                              <label htmlFor="">Time Zone</label>
                              <select className="form-control mb-1">
                                <option value="">(GMT +10:00) - Brisbane</option>
                                <option value="">(GMT +10:00) - Brisbane</option>
                                <option value="">(GMT +10:00) - Brisbane</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="row">
                      <div className="col-md-4 mb-md-0 mb-3 text-md-start text-center">
                        <h4 className="fw-semibold mb-0">Logo</h4>
                        <p>Manage stock levels of this product.</p>
                      </div>
                      <div className="col-xl-5 col-lg-6 col-md-8">
                        <div className="input-file position-relative d-flex align-content-center flex-wrap justify-content-center">
                          <input type="file" className="input-photo" />
                          <img src="assets/images/addphoto.png" alt="" className="ms-3" />
                          <span>Add Business Logo</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <input type="submit" className="btn" value="Save" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="tab-pane fade" id="v-pills-ClosedDates" role="tabpanel" aria-labelledby="v-pills-ClosedDates-tab"></div>
              <div className="tab-pane fade" id="v-pills-ClientNotifications" role="tabpanel" aria-labelledby="v-pills-ClientNotifications-tab"></div>
              <div className="tab-pane fade" id="v-pills-CancellationReasons" role="tabpanel" aria-labelledby="v-pills-CancellationReasons-tab"></div>
              <div className="tab-pane fade" id="v-pills-Permissions" role="tabpanel" aria-labelledby="v-pills-Permissions-tab"></div>
              <div className="tab-pane fade" id="v-pills-SMSUsage" role="tabpanel" aria-labelledby="v-pills-SMSUsage-tab"></div>
              <div className="tab-pane fade" id="v-pills-Integrations" role="tabpanel" aria-labelledby="v-pills-Integrations-tab">
                <h4 className="fw-semibold">Integrations</h4>
                <div className="row gx-xxl-5">
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="inti-box text-center">
                      <div className="img-wrp">
                        <img src="assets/images/canva.png" alt="" />
                      </div>
                      <p>Connect your Canva account to the Beauti Canva app to unleash your marketing potential.</p>
                      <a href="#" className="btn">
                        Set Up
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="inti-box text-center">
                      <div className="img-wrp">
                        <img src="assets/images/stripe.png" alt="" />
                      </div>
                      <p>Connect your Stripe account to accept online bookings and payments.</p>
                      <a href="#" className="btn">
                        Set Up
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="inti-box text-center">
                      <div className="img-wrp">
                        <img src="assets/images/mailchimp.png" alt="" />
                      </div>
                      <p>Connect your mailchimp account to unlock the email marketing features of Beauti.</p>
                      <a href="#" className="btn">
                        Set Up
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="v-pills-ConsultationForms" role="tabpanel" aria-labelledby="v-pills-ConsultationForms-tab"></div>
              <div className="tab-pane fade" id="v-pills-Analytics" role="tabpanel" aria-labelledby="v-pills-Analytics-tab"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
