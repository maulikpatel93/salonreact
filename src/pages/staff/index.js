import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../config";

const Staff = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();

  const tabview = useSelector((state) => state.staff.isTabView);
  const GridView = useSelector((state) => state.staff.isListView);
  return (
    <>
      <div className="page-content">
        <section className="staff-section common-tab">
          <ul className="nav nav-tabs mb-4" role="tablist">
            <li className="nav-item">
              <a href="#0" className={"nav-link " + (tabview && tabview == "staff" ? " active" : "")} id="staff-tab" data-bs-toggle="tab" data-bs-target="#staff" type="button" role="tab" aria-controls="staff" aria-selected="true">
                {t('Staff')}
              </a>
            </li>
            <li className="nav-item">
              <a href="#0" className={"nav-link " + (tabview && tabview == "roster" ? " active" : "")} id="roster-tab" data-bs-toggle="tab" data-bs-target="#roster" type="button" role="tab" aria-controls="roster" aria-selected="true">
              {t('Roster')}
              </a>
            </li>
            <li className="nav-item">
              <a href="#0" className={"nav-link " + (tabview && tabview == "price_tier" ? " active" : "")} id="pricetiers-tab" data-bs-toggle="tab" data-bs-target="#pricetiers" type="button" role="tab" aria-controls="pricetiers" aria-selected="true">
              {t('Price_Tiers')}
              </a>
            </li>
            <li className="nav-item">
              <a href="#0" className={"nav-link " + (tabview && tabview == "staff_access" ? " active" : "")} id="staffaccess-tab" data-bs-toggle="tab" data-bs-target="#staffaccess" type="button" role="tab" aria-controls="staffaccess" aria-selected="true">
              {t('Staff_Access')}
              </a>
            </li>
          </ul>
          <div className="container">
            <div className="tab-content px-lg-4">
              <div className="tab-pane show active" id="staff">
                <div className="row">
                  <a className="box-image-cover" href="#0" id="addstaff-member-link">
                    <div className="tabs-image">
                      <img src={config.imagepath + "tabs-image.png"} alt="" />
                    </div>
                    <div className="image-content">
                      <h5>+ Add Price Tier</h5>
                    </div>
                  </a>
                </div>
              </div>
              <div className="tab-pane" id="roster"></div>
              <div className="tab-pane" id="pricetiers">
                <h5 className="fw-semibold">Create price tiers based on the skill level of your staff. </h5>
              </div>
              <div className="tab-pane" id="staffaccess">
                <h3>add clearfix to tab-content (see the css)</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Staff;
