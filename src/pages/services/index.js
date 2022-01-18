import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../config";
import Categories from "./categories";

import { openAddServiceForm, serviceTabView, serviceListViewApi, serviceSort, serviceSortRemove, openServiceSearchList, closeServiceSearchList, serviceSuggetionListApi, serviceSearchName, addonservices } from "../../store/slices/serviceSlice";
import { openAddCategoryForm, categoryListViewApi, openCategorieSearchList, closecategoriesearchList, categoriesuggetionListApi, categoriesearchName, categoryOptions } from "../../store/slices/categorySlice";
import { taxOptions } from "../../store/slices/taxSlice";
import { removeImage } from "../../store/slices/imageSlice";
import CategoryAddForm from "./categories/CategoryAddForm";
import CategoryEditForm from "./categories/CategoryEditForm";
import CategorySuggetionListView from "./categories/CategorySuggetionListView";
import ServiceSuggetionListView from "./list/ServiceSuggetionListView";
import ServiceListView from "./list/ServiceListView";
import ServiceAddForm from "./form/ServiceAddForm";
import ServiceEditForm from "./form/ServiceEditForm";

const Services = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
        if (action.meta.requestStatus == "rejected") {
          // dispatch(closecategoriesearchList());
        }
      });
    } else {
      dispatch(serviceListViewApi());
    }
  };
  const handleCloseSearchService = () => {
    dispatch(serviceSearchName(""));
    dispatch(closeServiceSearchList());
    dispatch(serviceListViewApi());
  };
  const handleOnBlurService = () => {
    setTimeout(() => {
      dispatch(closeServiceSearchList());
    }, 100);
  };

  //Category search
  const fetchDataSuggetionListCategory = () => {
    dispatch(categoriesuggetionListApi({ next_page_url: isSuggetionViewCategory.next_page_url, q: isSearchNameCategory }));
  };

  const handleClickSearchCategory = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(openCategorieSearchList());
      dispatch(categoriesuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearchCategory = (e) => {
    let q = e.currentTarget.value;
    dispatch(categoriesearchName(q));
    if (q && q.length > 0) {
      dispatch(openCategorieSearchList());
      dispatch(categoriesuggetionListApi({ q: q })).then((action) => {
        if (action.meta.requestStatus == "rejected") {
          // dispatch(closecategoriesearchList());
        }
      });
    } else {
      dispatch(categoryListViewApi());
    }
  };
  const handleCloseSearchCategory = () => {
    dispatch(categoriesearchName(""));
    dispatch(closecategoriesearchList());
    dispatch(categoryListViewApi());
  };
  const handleOnBlurCategory = () => {
    setTimeout(() => {
      dispatch(closecategoriesearchList());
    }, 100);
  };

  const sorting = (props) => {
    dispatch(serviceSort(props));
    dispatch(serviceListViewApi({ sort: props }));
  };

  return (
    <>
      <div className={"page-content bg-pink service page-content-" + tabview}>
        <div className="row bg-white align-items-center sticky-top">
          <div className="common-tab col-md-4 col-7 order-1">
            <ul className="nav nav-tabs mb-0 justify-content-start" role="tablist">
              <li className="nav-item">
                <a href="#" className={"nav-link " + (tabview && tabview == "service" ? " active" : "")} id="service-tab" data-bs-toggle="tab" data-bs-target="#service" type="button" role="tab" aria-controls="service" aria-selected="true" onClick={handleServiceTab}>
                  {t("services")}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className={"nav-link " + (tabview && tabview == "category" ? " active" : "")} id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="true" onClick={handleCategoryTab}>
                  {t("categories")}
                </a>
              </li>
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
                    <input type="text" className="form-control search-input" placeholder={t("search")} value={isSearchNameService} onInput={(e) => dispatch(serviceSearchName(e.target.value))} onClick={handleClickSearchService} onKeyUp={handleKeyUpSearchService} onBlur={handleOnBlurService} />
                    <a className="close cursor-pointer" style={{ display: isSearchNameService ? "block" : "none" }} onClick={handleCloseSearchService}>
                      <i className="fal fa-times"></i>
                    </a>
                  </>
                ) : (
                  <>
                    <input type="text" className="form-control search-input" placeholder={t("search")} value={isSearchNameCategory} onInput={(e) => dispatch(categoriesearchName(e.target.value))} onClick={handleClickSearchCategory} onKeyUp={handleKeyUpSearchCategory} onBlur={handleOnBlurCategory} />
                    <a className="close cursor-pointer" style={{ display: isSearchNameCategory ? "block" : "none" }} onClick={handleCloseSearchCategory}>
                      <i className="fal fa-times"></i>
                    </a>
                  </>
                )}
              </div>
              {tabview && tabview == "service" ? (
                <div className={"search-result dropdown-box " + isSearchListService} id="search-content">
                  <InfiniteScroll className="" dataLength={isSuggetionViewService.data && isSuggetionViewService.data.length ? isSuggetionViewService.data.length : "0"} next={fetchDataSuggetionListService} scrollableTarget="search-content" hasMore={isSuggetionViewService.next_page_url ? true : false} loader={<h4>loading...</h4>}>
                    <ul className="p-0 m-0 list-unstyled">
                      <ServiceSuggetionListView view={isSuggetionViewService} />
                    </ul>
                  </InfiniteScroll>
                </div>
              ) : (
                <div className={"search-result dropdown-box " + isSearchListCategory} id="search-content">
                  <InfiniteScroll className="" dataLength={isSuggetionViewCategory.data && isSuggetionViewCategory.data.length ? isSuggetionViewCategory.data.length : "0"} next={fetchDataSuggetionListCategory} scrollableTarget="search-content" hasMore={isSuggetionViewCategory.next_page_url ? true : false} loader={<h4>loading...</h4>}>
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
              <div className={tabview && tabview == "service" ? "active" : ""} style={{ display: tabview && tabview == "service" ? "block" : "none" }}>
                <a className="add-service btn me-md-3 me-1 add-new-btn px-xs-4" onClick={handleopenAddServiceForm}>
                  {t("new_service")}
                </a>
              </div>
              <div className={tabview && tabview == "category" ? "active" : ""} style={{ display: tabview && tabview == "category" ? "block" : "none" }}>
                <a className="add-service btn me-md-3 me-1 add-new-btn px-xs-4" onClick={handleOpenAddCategoryForm}>
                  {t("new_category")}
                </a>
              </div>
            </div>
            <div className="dropdown d-inline-block setting-dropdown">
              <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                <i className="far fa-ellipsis-v"></i>
              </button>
              <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                <ul className="p-0 m-0 list-unstyled">
                  <li>
                    <a href="#" id="addservice-drawer-link" className="d-flex align-items-center">
                      <img src={config.imagepath + "import.png"} className="me-3" alt="" />
                      Import Services
                    </a>
                  </li>
                  <li>
                    <a href="#" id="addsale-drawer-link" className="d-flex align-items-center">
                      <img src={config.imagepath + "export.png"} className="me-3" />
                      Export Services
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={"tab-content list-view-content"}>
            <div className={"tab-pane" + (tabview && tabview == "service" ? " show active" : "")} id="service" role="tabpanel" aria-labelledby="service-tab">
              {ListView.length > 0 || ListView.data ? (
                  <div className="table-responsive services-table-shadow" id="scrollableListView">
                    <InfiniteScroll dataLength={ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataList} scrollableTarget="page-content-service" hasMore={ListView.next_page_url ? true : false} loader={<h4>loading...</h4>} style={{ overflow: ListView.next_page_url ? 'auto' : 'inherit' }}>
                      <table className="table bg-white">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>
                              <a className="service-header cursor-pointer" onClick={() => sorting({ name: sort.name == "asc" ? "desc" : "asc" })}>
                                {t("service_name")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort.name == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort.name == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>
                              <a className="service-header cursor-pointer" onClick={() => sorting({ duration: sort.duration == "asc" ? "desc" : "asc" })}>
                                {t("duration")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort.sku == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort.sku == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>
                              <a className="service-header cursor-pointer" onClick={() => sorting({ price: sort.price == "asc" ? "desc" : "asc" })}>
                                {t("price")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort.price == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort.price == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>
                              <a className="service-header cursor-pointer" onClick={() => sorting({ category: { name: sort && sort.category && sort.category.name == "asc" ? "desc" : "asc" } })}>
                                {t("category")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort && sort.category && sort.category.name == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort && sort.category && sort.category.name == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>{t("add_on_service")}</th>
                            <th>
                              <div className="d-flex align-items-center justify-content-end">{t("action")}</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="services-table-data">
                          <ServiceListView view={ListView} />
                        </tbody>
                      </table>

                      {!isFetching && ListView.next_page_url && (
                        <div className="col-2 m-auto p-3">
                          <button onClick={loadMoreItems} className="btn btn-primary">
                            {t("more")}
                          </button>
                        </div>
                      )}
                    </InfiniteScroll>
                  </div>
              ) : (
                <div className="complete-box text-center d-flex flex-column justify-content-center my-md-5 my-4 bg-white">
                  <div className="complete-box-wrp text-center ">
                    <img src={config.imagepath + "service.png"} alt="" className="mb-md-4 mb-3" />
                    <h4 className="mb-2 fw-semibold">
                      {t("no_services_have_been_created_yet")}
                      <a className="add-service ms-1 cursor-pointer" onClick={() => dispatch(openAddServiceForm())}>
                        {t("please_create_one")}
                      </a>
                      .
                    </h4>
                  </div>
                </div>
              )}
            </div>
            <div className={"tab-pane" + (tabview && tabview == "category" ? " show active" : "")} id="categories" role="tabpanel" aria-labelledby="categories-tab">
              <Categories />
            </div>
          </div>
        </div>
        {categoryIsOpenedAddForm ? <CategoryAddForm /> : ""}
        {categoryIsOpenedEditForm ? <CategoryEditForm /> : ""}
        {serviceIsOpenedAddForm ? <ServiceAddForm /> : ""}
        {serviceIsOpenedEditForm ? <ServiceEditForm /> : ""}
      </div>
    </>
  );
};

export default Services;
