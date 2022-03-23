import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../config";
import Categories from "./categories";

import { openAddServiceForm, serviceTabView, serviceListViewApi, serviceSort, serviceSortRemove, openServiceSearchList, closeServiceSearchList, serviceSuggetionListApi, serviceSearchName, addonservices, addonstaff } from "../../store/slices/serviceSlice";
import { openAddCategoryForm, categoryListViewApi, openCategorySearchList, closeCategorysearchList, categorySuggetionListApi, categorySearchName, categoryOptions } from "../../store/slices/categorySlice";
import { taxOptions } from "../../store/slices/taxSlice";
import { removeImage } from "../../store/slices/imageSlice";
import CategoryAddForm from "./categories/CategoryAddForm";
import CategoryEditForm from "./categories/CategoryEditForm";
import CategorySuggetionListView from "./categories/CategorySuggetionListView";
import ServiceSuggetionListView from "./list/ServiceSuggetionListView";
import ServiceListView from "./list/ServiceListView";
import ServiceAddForm from "./form/ServiceAddForm";
import ServiceEditForm from "./form/ServiceEditForm";
import PaginationLoader from "component/PaginationLoader";
import { SalonModule } from "pages";
import { checkaccess } from "helpers/functions";

const Services = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const tabview = useSelector((state) => state.service.isTabView);
  const ListView = useSelector((state) => state.service.isListView);
  const sort = useSelector((state) => state.service.isSort);
  const serviceIsOpenedAddForm = useSelector((state) => state.service.isOpenedAddForm);
  const serviceIsOpenedEditForm = useSelector((state) => state.service.isOpenedEditForm);
  const categoryIsOpenedAddForm = useSelector((state) => state.category.isOpenedAddForm);
  const categoryIsOpenedEditForm = useSelector((state) => state.category.isOpenedEditForm);

  const isSearchListService = useSelector((state) => state.service.isSearchList);
  const isSearchNameService = useSelector((state) => state.service.isSearchName);
  const isSuggetionViewService = useSelector((state) => state.service.isSuggetionListView);

  const isSearchListCategory = useSelector((state) => state.category.isSearchList);
  const isSearchNameCategory = useSelector((state) => state.category.isSearchName);
  const isSuggetionViewCategory = useSelector((state) => state.category.isSuggetionListView);

  useEffect(() => {
    dispatch(serviceSortRemove());
    dispatch(serviceListViewApi());
    dispatch(categoryListViewApi());
  }, [dispatch]);

  const handleServiceTab = () => {
    dispatch(serviceTabView("service"));
  };

  const handleCategoryTab = () => {
    dispatch(serviceTabView("category"));
  };

  const handleopenAddServiceForm = () => {
    dispatch(openAddServiceForm());
    dispatch(categoryOptions({ option: { valueField: "id", labelField: "name" } }));
    dispatch(taxOptions({ option: { valueField: "id", labelField: "name" } }));
    dispatch(addonstaff());
    dispatch(addonservices());
  };

  const handleOpenAddCategoryForm = () => {
    dispatch(openAddCategoryForm());
    dispatch(removeImage());
  };

  const fetchDataList = () => {
    dispatch(serviceListViewApi({ next_page_url: ListView.next_page_url }));
  };
  //Service search
  const fetchDataSuggetionListService = () => {
    dispatch(serviceSuggetionListApi({ next_page_url: isSuggetionViewService.next_page_url, q: isSearchNameService }));
  };

  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(serviceListViewApi({ next_page_url: ListView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };

  const handleClickSearchService = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(openServiceSearchList());
      dispatch(serviceSuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearchService = (e) => {
    let q = e.currentTarget.value;
    dispatch(serviceSearchName(q));
    if (q && q.length > 0) {
      dispatch(openServiceSearchList());
      dispatch(serviceSuggetionListApi({ q: q })).then((action) => {
        if (action.meta.requestStatus === "rejected") {
          // dispatch(closeCategorysearchList());
        }
      });
    } else {
      dispatch(serviceListViewApi());
      dispatch(closeServiceSearchList());
    }
  };
  const handleCloseSearchService = () => {
    dispatch(serviceSearchName(""));
    dispatch(closeServiceSearchList());
    dispatch(serviceListViewApi());
  };
  const handleOnBlurService = () => {
    // setTimeout(() => {
    //   dispatch(closeServiceSearchList());
    // }, 100);
  };

  //Category search
  const fetchDataSuggetionListCategory = () => {
    dispatch(categorySuggetionListApi({ next_page_url: isSuggetionViewCategory.next_page_url, q: isSearchNameCategory }));
  };

  const handleClickSearchCategory = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(openCategorySearchList());
      dispatch(categorySuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearchCategory = (e) => {
    let q = e.currentTarget.value;
    dispatch(categorySearchName(q));
    if (q && q.length > 0) {
      dispatch(openCategorySearchList());
      dispatch(categorySuggetionListApi({ q: q })).then((action) => {
        if (action.meta.requestStatus === "rejected") {
          // dispatch(closeCategorysearchList());
        }
      });
    } else {
      dispatch(categoryListViewApi());
      dispatch(closeCategorysearchList());
    }
  };
  const handleCloseSearchCategory = () => {
    dispatch(categorySearchName(""));
    dispatch(closeCategorysearchList());
    dispatch(categoryListViewApi());
  };
  const handleOnBlurCategory = () => {
    // setTimeout(() => {
    //   dispatch(closeCategorysearchList());
    // }, 100);
  };

  const sorting = (props) => {
    dispatch(serviceSort(props));
    dispatch(serviceListViewApi({ sort: props }));
  };

  return (
    <>
      <div className="page-content bg-pink service" id={"page-content-" + tabview}>
        <div className="row bg-white align-items-center sticky-top">
          <div className="common-tab col-md-4 col-7 order-1">
            <ul className="nav nav-tabs mb-0 justify-content-start" role="tablist">
              {checkaccess({ name: "list", role_id: role_id, controller: "services", access }) && (
                <li className="nav-item">
                  <a href="#" className={"nav-link " + (tabview && tabview == "service" ? " active" : "")} id="service-tab" data-bs-toggle="tab" data-bs-target="#service" type="button" role="tab" aria-controls="service" aria-selected="true" onClick={handleServiceTab}>
                    {t("Services")}
                  </a>
                </li>
              )}
              {checkaccess({ name: "list", role_id: role_id, controller: "categories", access }) && (
                <li className="nav-item">
                  <a href="#" className={"nav-link " + (tabview && tabview == "category" ? " active" : "")} id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="true" onClick={handleCategoryTab}>
                    {t("Categories")}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="col-md-4 py-md-0 py-2 px-md-0 px-4 order-md-2 order-3 search-wrp">
            <div className="search search-radius">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="far fa-search"></i>
                </span>
                {tabview && tabview == "service" ? (
                  <>
                    <input type="text" className="form-control search-input" placeholder={t("Search")} value={isSearchNameService} onInput={(e) => dispatch(serviceSearchName(e.target.value))} onClick={handleClickSearchService} onKeyUp={handleKeyUpSearchService} onBlur={handleOnBlurService} />
                    <a className="close cursor-pointer" style={{ display: isSearchNameService ? "block" : "none" }} onClick={handleCloseSearchService}>
                      <i className="fal fa-times"></i>
                    </a>
                  </>
                ) : (
                  <>
                    <input type="text" className="form-control search-input" placeholder={t("Search")} value={isSearchNameCategory} onInput={(e) => dispatch(categorySearchName(e.target.value))} onClick={handleClickSearchCategory} onKeyUp={handleKeyUpSearchCategory} onBlur={handleOnBlurCategory} />
                    <a className="close cursor-pointer" style={{ display: isSearchNameCategory ? "block" : "none" }} onClick={handleCloseSearchCategory}>
                      <i className="fal fa-times"></i>
                    </a>
                  </>
                )}
              </div>
              {tabview && tabview == "service" ? (
                <div className={"search-result dropdown-box " + isSearchListService} id="search-content">
                  <InfiniteScroll className="" dataLength={isSuggetionViewService && isSuggetionViewService.data && isSuggetionViewService.data.length ? isSuggetionViewService.data.length : "0"} next={fetchDataSuggetionListService} scrollableTarget="search-content" hasMore={isSuggetionViewService.next_page_url ? true : false} loader={<PaginationLoader />}>
                    <ul className="p-0 m-0 list-unstyled">
                      <ServiceSuggetionListView view={isSuggetionViewService} />
                    </ul>
                  </InfiniteScroll>
                </div>
              ) : (
                <div className={"search-result dropdown-box " + isSearchListCategory} id="search-content">
                  <InfiniteScroll className="" dataLength={isSuggetionViewCategory && isSuggetionViewCategory.data && isSuggetionViewCategory.data.length ? isSuggetionViewCategory.data.length : "0"} next={fetchDataSuggetionListCategory} scrollableTarget="search-content" hasMore={isSuggetionViewCategory.next_page_url ? true : false} loader={<PaginationLoader />}>
                    <ul className="p-0 m-0 list-unstyled">
                      <CategorySuggetionListView view={isSuggetionViewCategory} />
                    </ul>
                  </InfiniteScroll>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 text-end col-5 ps-0 order-md-3 order-2">
            <div className="tab-content p-0 d-inline-block">
              {checkaccess({ name: "create", role_id: role_id, controller: "services", access }) && (
                <div className={tabview && tabview == "service" ? "active" : ""} style={{ display: tabview && tabview == "service" ? "block" : "none" }}>
                  <a className="btn btn-primary add-service me-md-3 me-1 add-new-btn px-xs-4" onClick={handleopenAddServiceForm}>
                    {t("New Service")}
                  </a>
                </div>
              )}
              {checkaccess({ name: "create", role_id: role_id, controller: "categories", access }) && (
                <div className={tabview && tabview == "category" ? "active" : ""} style={{ display: tabview && tabview == "category" ? "block" : "none" }}>
                  <a className="btn btn-primary add-service me-md-3 me-1 add-new-btn px-xs-4" onClick={handleOpenAddCategoryForm}>
                    {t("New Category")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={"tab-content list-view-content"}>
          {checkaccess({ name: "list", role_id: role_id, controller: "services", access }) && (
            <div className={"tab-pane" + (tabview && tabview == "service" ? " show active" : "")} id="service" role="tabpanel" aria-labelledby="service-tab">
              {tabview && tabview == "service" && (
                <>
                  {ListView.length > 0 || ListView.data ? (
                    <div className="" id="scrollableServiceListView">
                      <InfiniteScroll dataLength={ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataList} scrollableTarget="page-content-service" hasMore={ListView.next_page_url ? true : false} loader={<PaginationLoader />} style={{ overflow: ListView.next_page_url ? "auto" : "inherit" }}>
                        <div className="table-responsive bg-white table-shadow">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th rowSpan="2" className="service_table_header"></th>
                                <th rowSpan="2" className="service_table_header">
                                  <a className="service-header cursor-pointer" onClick={() => sorting({ name: sort.name == "asc" ? "desc" : "asc" })}>
                                    {t("Service Name")}
                                    <span className="down-up-arrow">
                                      <i className={"fal fa-angle-up" + (sort.name == "asc" ? " text-dark" : "")}></i>
                                      <i className={"fal fa-angle-down" + (sort.name == "desc" ? " text-dark" : "")}></i>
                                    </span>
                                  </a>
                                </th>
                                <th rowSpan="2" className="service_table_header">
                                  <a className="service-header cursor-pointer" onClick={() => sorting({ duration: sort.duration == "asc" ? "desc" : "asc" })}>
                                    {t("Duration")}
                                    <span className="down-up-arrow">
                                      <i className={"fal fa-angle-up" + (sort.duration == "asc" ? " text-dark" : "")}></i>
                                      <i className={"fal fa-angle-down" + (sort.duration == "desc" ? " text-dark" : "")}></i>
                                    </span>
                                  </a>
                                </th>
                                <th colSpan="3" className="p-2 text-center">
                                  {t("Price")}
                                </th>
                                <th rowSpan="2" className="service_table_header">
                                  {t("Category")}
                                  {/* <a className="service-header cursor-pointer" onClick={() => sorting({ category: { name: sort && sort.category && sort.category.name == "asc" ? "desc" : "asc" } })}>
                            {t("Category")}
                            <span className="down-up-arrow">
                              <i className={"fal fa-angle-up" + (sort && sort.category && sort.category.name == "asc" ? " text-dark" : "")}></i>
                              <i className={"fal fa-angle-down" + (sort && sort.category && sort.category.name == "desc" ? " text-dark" : "")}></i>
                            </span>
                          </a> */}
                                </th>
                                <th rowSpan="2" className="service_table_header">
                                  {t("Add on Services")}
                                </th>
                                {(checkaccess({ name: "update", role_id: role_id, controller: "services", access }) || checkaccess({ name: "delete", role_id: role_id, controller: "services", access })) && <th rowSpan="2" className="service_table_header"></th>}
                              </tr>
                              <tr>
                                <th scope="col" className="p-2">
                                  {t("General")}
                                </th>
                                <th scope="col" className="p-2">
                                  {t("Junior")}
                                </th>
                                <th scope="col" className="p-2">
                                  {t("Senior")}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="services-table-data">
                              <ServiceListView view={ListView} role_id={role_id} access={access} />
                            </tbody>
                          </table>
                        </div>
                        {!isFetching && ListView.next_page_url && (
                          <div className="col-2 m-auto p-3 text-center">
                            <button onClick={loadMoreItems} className="btn btn-primary">
                              {t("More")}
                            </button>
                          </div>
                        )}
                      </InfiniteScroll>
                    </div>
                  ) : (
                    <>
                      {checkaccess({ name: "create", role_id: role_id, controller: "services", access }) && (
                        <div className="complete-box text-center d-flex flex-column justify-content-center my-md-5 my-4 bg-white">
                          <div className="complete-box-wrp text-center ">
                            <img src={config.imagepath + "service.png"} alt="" className="mb-md-4 mb-3" />
                            <h4 className="mb-2 fw-semibold">
                              {t("No services have been created yet.")}
                              <a className="add-service ms-1 cursor-pointer" onClick={() => dispatch(openAddServiceForm())}>
                                {t("Please create one")}
                              </a>
                              .
                            </h4>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {checkaccess({ name: "list", role_id: role_id, controller: "categories", access }) && (
            <div className={"tab-pane" + (tabview && tabview == "category" ? " show active" : "")} id="categories" role="tabpanel" aria-labelledby="categories-tab">
              {tabview && tabview == "category" && <Categories />}
            </div>
          )}
        </div>
        {checkaccess({ name: "create", role_id: role_id, controller: "categories", access }) && categoryIsOpenedAddForm ? <CategoryAddForm /> : ""}
        {checkaccess({ name: "update", role_id: role_id, controller: "categories", access }) && categoryIsOpenedEditForm ? <CategoryEditForm /> : ""}
        {checkaccess({ name: "create", role_id: role_id, controller: "services", access }) && serviceIsOpenedAddForm ? <ServiceAddForm /> : ""}
        {checkaccess({ name: "update", role_id: role_id, controller: "services", access }) && serviceIsOpenedEditForm ? <ServiceEditForm /> : ""}
      </div>
    </>
  );
};

export default Services;
