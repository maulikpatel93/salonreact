import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import { staffTabView, staffGridViewApi, openAddStaffForm, addonservices } from "../../store/slices/staffSlice";
import { pricetierGridViewApi, pricetierOptions } from "../../store/slices/pricetierSlice";

import PriceTier from "./PriceTier";
import Roster from "./Roster";
import config from "../../config";
import StaffGridView from "./List/gridview";
import StaffAddForm from "./form/StaffAddForm";
import StaffEditForm from "./form/StaffEditForm";
import PaginationLoader from "component/PaginationLoader";

const Staff = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const tabview = useSelector((state) => state.staff.isTabView);
  const GridView = useSelector((state) => state.staff.isGridView);
  const isOpenedAddForm = useSelector((state) => state.staff.isOpenedAddForm);
  const isOpenedEditForm = useSelector((state) => state.staff.isOpenedEditForm);

  useEffect(() => {
    dispatch(staffGridViewApi());
    dispatch(pricetierGridViewApi());
  }, [dispatch]);

  const handleopenAddStaffForm = () => {
    dispatch(openAddStaffForm());
    dispatch(pricetierOptions({ option: { valueField: "id", labelField: "name" } }));
    dispatch(addonservices());
  };

  const fetchDataGrid = () => {
    console.log("staff");
    dispatch(staffGridViewApi({ next_page_url: GridView.next_page_url }));
  };

  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(staffGridViewApi({ next_page_url: GridView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };

  return (
    <>
      <div className="page-content bg-pink service" id={"page-content-" + tabview}>
        <section className="staff-section common-tab">
          <div className="row bg-white align-items-center sticky-top">
            <div className="col-md-12 col-12">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a href="#0" className={"nav-link " + (tabview && tabview == "staff" ? " active" : "")} id="staff-tab" data-bs-toggle="tab" data-bs-target="#staff" type="button" role="tab" aria-controls="staff" aria-selected="true" onClick={() => dispatch(staffTabView("staff"))}>
                    {t("Staff")}
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#0" className={"nav-link " + (tabview && tabview == "roster" ? " active" : "")} id="roster-tab" data-bs-toggle="tab" data-bs-target="#roster" type="button" role="tab" aria-controls="roster" aria-selected="true" onClick={() => dispatch(staffTabView("roster"))}>
                    {t("Roster")}
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#0" className={"nav-link " + (tabview && tabview == "price_tier" ? " active" : "")} id="pricetiers-tab" data-bs-toggle="tab" data-bs-target="#pricetiers" type="button" role="tab" aria-controls="pricetiers" aria-selected="true" onClick={() => dispatch(staffTabView("price_tier"))}>
                    {t("Price_Tiers")}
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#0" className={"nav-link " + (tabview && tabview == "staff_access" ? " active" : "")} id="staffaccess-tab" data-bs-toggle="tab" data-bs-target="#staffaccess" type="button" role="tab" aria-controls="staffaccess" aria-selected="true" onClick={() => dispatch(staffTabView("staff_access"))}>
                    {t("Staff_Access")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content list-view-content">
            <div className={"tab-pane" + (tabview && tabview == "staff" ? " show active" : "")} id="staff">
              <div className="" id="scrollableGridView">
                {tabview && tabview == "staff" && (
                  <>
                    <InfiniteScroll className="row" dataLength={GridView.data && GridView.data.length ? GridView.data.length : "0"} next={fetchDataGrid} scrollableTarget="page-content-staff" hasMore={tabview && tabview == "staff" && GridView.next_page_url ? true : false} loader={<PaginationLoader />}>
                      <a className="box-image-cover cursor-pointer" id="addstaff-member-link" onClick={handleopenAddStaffForm}>
                        <div className="tabs-image">
                          <img src={config.imagepath + "tabs-image.png"} alt="" />
                        </div>
                        <div className="image-content">
                          <h5>
                            <i className="fal fa-plus me-2"></i> {t("add_staff")}
                          </h5>
                        </div>
                      </a>
                      <StaffGridView currentUser={currentUser} view={GridView} />
                      {!isFetching && GridView.next_page_url && (
                        <div className="box-image-cover">
                          <div className="tabs-image">
                            <img src={config.imagepath + "tabs-image.png"} alt="" />
                          </div>
                          <div className="image-content">
                            <button onClick={loadMoreItems} className="btn btn-primary">
                              {t("more")}
                            </button>
                          </div>
                        </div>
                      )}
                    </InfiniteScroll>
                  </>
                )}
              </div>
            </div>
            <div className={"tab-pane" + (tabview && tabview == "roster" ? " show active" : "")} id="roster">
              {tabview && tabview == "roster" && <Roster />}
            </div>
            <div className={"tab-pane" + (tabview && tabview == "price_tier" ? " show active" : "")} id="pricetiers">
              <h5 className="fw-semibold">{t("price_tier_listing_note")}</h5>
              {tabview && tabview == "price_tier" && <PriceTier />}
            </div>
            <div className={"tab-pane" + (tabview && tabview == "staff_access" ? " show active" : "")} id="staffaccess">
              <h3>add clearfix to tab-content (see the css)</h3>
            </div>
          </div>
          {isOpenedAddForm && <StaffAddForm />}
          {isOpenedEditForm && <StaffEditForm />}
        </section>
      </div>
    </>
  );
};

export default Staff;
