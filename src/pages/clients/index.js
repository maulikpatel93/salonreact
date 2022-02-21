import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { openAddClientForm, clientTabListView, clientTabGridView, clientGridViewApi, clientListViewApi, clientSort, clientSortRemove, openClientSearchList, closeClientSearchList, clientSuggetionListApi, clientSearchName } from "../../store/slices/clientSlice";

import config from "../../config";
import ClientAddForm from "./Form/ClientAddForm";
import ClientDetailModal from "./Detail";
import ClientGridView from "./List/gridview";
import ClientListView from "./List/listview";
import SuggetionListView from "./List/SuggetionListView";
import PaginationLoader from "component/PaginationLoader";
import { SalonModule } from "pages";
import { checkaccess } from "helpers/functions";

const Clients = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const GridView = useSelector((state) => state.client.isGridView);
  const ListView = useSelector((state) => state.client.isListView);
  const tabview = useSelector((state) => state.client.isTabView);
  const sort = useSelector((state) => state.client.isSort);
  const isSearchList = useSelector((state) => state.client.isSearchList);
  const isSearchName = useSelector((state) => state.client.isSearchName);
  const SuggetionView = useSelector((state) => state.client.isSuggetionListView);
  const clientIsOpenedAddForm = useSelector((state) => state.client.isOpenedAddForm);
  const clientIsOpenedDetailModal = useSelector((state) => state.client.isOpenedDetailModal);

  useEffect(() => {
    dispatch(clientSortRemove());
    dispatch(clientGridViewApi());
    dispatch(clientListViewApi());
  }, [dispatch]);

  const handleopenAddClientForm = () => {
    dispatch(openAddClientForm());
  };

  const sorting = (props) => {
    dispatch(clientSort(props));
    dispatch(clientListViewApi({ sort: props }));
  };

  const fetchDataGrid = () => {
    dispatch(clientGridViewApi({ next_page_url: GridView.next_page_url }));
  };
  const fetchDataList = () => {
    dispatch(clientListViewApi({ next_page_url: ListView.next_page_url }));
  };

  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItemsGrid = () => {
    setIsFetching(true);
    dispatch(clientGridViewApi({ next_page_url: GridView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };

  const loadMoreItemsList = () => {
    setIsFetching(true);
    dispatch(clientListViewApi({ next_page_url: ListView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };

  const fetchDataSuggetionList = () => {
    dispatch(clientSuggetionListApi({ next_page_url: SuggetionView.next_page_url, q: isSearchName }));
  };

  const handleClickSearch = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(openClientSearchList());
      dispatch(clientSuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearch = (e) => {
    let q = e.currentTarget.value;
    dispatch(clientSearchName(q));
    if (q && q.length > 0) {
      dispatch(openClientSearchList());
      dispatch(clientSuggetionListApi({ q: q }));
    } else {
      dispatch(clientGridViewApi());
      dispatch(clientListViewApi());
      dispatch(closeClientSearchList());
    }
  };
  const handleCloseSearch = () => {
    dispatch(clientSearchName(""));
    dispatch(closeClientSearchList());
    dispatch(clientGridViewApi());
    dispatch(clientListViewApi());
  };
  const handleOnBlur = () => {
    // setTimeout(() => {
    //   dispatch(closeClientSearchList());
    // }, 200);
  };

  return (
    <>
      <div className="page-content bg-pink" id={"page-content-" + tabview}>
        <div className="row bg-white align-items-center sticky-top">
          <div className="common-tab col-md-4 col-4 order-1">
            <ul className="nav nav-tabs mb-0 justify-content-start" role="tablist">
              <li className="nav-item">
                <a className="nav-link active cursor-pointer" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="true">
                  {t("All")}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-md-0 mb-2 px-md-0 px-4 mt-md-0 mt-2 order-md-2 order-first">
            <div className="search search-radius">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="far fa-search"></i>
                </span>
                <input type="text" className="form-control search-input" placeholder={t("Search")} value={isSearchName} onInput={(e) => dispatch(clientSearchName(e.target.value))} onClick={handleClickSearch} onKeyUp={handleKeyUpSearch} onBlur={handleOnBlur} />
                <a className="close cursor-pointer" style={{ display: isSearchName ? "block" : "none" }} onClick={handleCloseSearch}>
                  <i className="fal fa-times"></i>
                </a>
              </div>
              <div className={"search-result dropdown-box " + isSearchList} id="search-content">
                <InfiniteScroll className="" dataLength={SuggetionView.data && SuggetionView.data.length ? SuggetionView.data.length : "0"} next={fetchDataSuggetionList} scrollableTarget="search-content" hasMore={SuggetionView.next_page_url ? true : false} loader={<PaginationLoader />}>
                  <ul className="p-0 m-0 list-unstyled">
                    <SuggetionListView view={SuggetionView} />
                  </ul>
                </InfiniteScroll>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-8 text-end ps-0 mb-md-0 mb-2 order-3">
            <span className="list-view-lable me-1">{t("Display as")}:</span>
            <ul className="nav nav-tabs mb-0 d-inline-block list-view-tab border-0 me-xl-3" role="tablist">
              <li className="nav-item d-inline-block">
                <a className={"nav-link border-0 cursor-pointer" + (tabview && tabview == "grid" ? " active" : "")} id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="true" onClick={() => dispatch(clientTabGridView())}>
                  <img src={config.imagepath + "block-view.png"} alt="" />
                </a>
              </li>
              <li className="nav-item d-inline-block">
                <a className={"nav-link border-0 cursor-pointer" + (tabview && tabview == "list" ? " active" : "")} id="listview-tab" data-bs-toggle="tab" data-bs-target="#listview" type="button" role="tab" aria-controls="listview" aria-selected="true" onClick={() => dispatch(clientTabListView())}>
                  <img src={config.imagepath + "list-view.png"} alt="" />
                </a>
              </li>
            </ul>
            {checkaccess({ name: "create", role_id: role_id, controller: "clients", access }) && (
              <a id="addclient-drawer-link" className="btn btn-primary add-new-btn me-1 px-lg-4  cursor-pointer" onClick={handleopenAddClientForm}>
                {t("New Client")}
              </a>
            )}

            <div className="dropdown d-inline-block setting-dropdown">
              <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                <i className="far fa-ellipsis-v"></i>
              </button>
              <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                <ul className="p-0 m-0 list-unstyled">
                  <li>
                    <a id="addclient-drawer-link" className="d-flex align-items-center cursor-pointer">
                      <img src={config.imagepath + "import.png"} className="me-3" alt="" />
                      Import Clients
                    </a>
                  </li>
                  <li>
                    <a id="addsale-drawer-link" className="d-flex align-items-center cursor-pointer">
                      <img src={config.imagepath + "export.png"} className="me-3" alt="" />
                      Export Clients
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-content list-view-content">
          <div className={"tab-pane" + (tabview && tabview == "grid" ? " show active" : "")} id="all">
            <div className="" id="scrollableGridView">
              {tabview && tabview == "grid" && (
                <>
                  <InfiniteScroll className="row" dataLength={GridView.data && GridView.data.length ? GridView.data.length : "0"} next={fetchDataGrid} scrollableTarget="page-content-grid" hasMore={tabview && tabview == "grid" && GridView.next_page_url ? true : false} loader={<PaginationLoader />}>
                    {checkaccess({ name: "create", role_id: role_id, controller: "clients", access }) && (
                      <a className="box-image-cover cursor-pointer" onClick={handleopenAddClientForm}>
                        <div className="tabs-image">
                          <img src={config.imagepath + "tabs-image.png"} alt="" />
                        </div>
                        <div className="image-content">
                          <h5>
                            <i className="fal fa-plus me-2"></i> {t("Add New")}
                          </h5>
                        </div>
                      </a>
                    )}
                    <ClientGridView currentUser={currentUser} view={GridView} role_id={role_id} access={access} />
                    {!isFetching && GridView.next_page_url && (
                      <div className="box-image-cover">
                        <div className="tabs-image">
                          <img src={config.imagepath + "tabs-image.png"} alt="" />
                        </div>
                        <div className="image-content">
                          <button onClick={loadMoreItemsGrid} className="btn btn-primary">
                            {t("More")}
                          </button>
                        </div>
                      </div>
                    )}
                  </InfiniteScroll>
                </>
              )}
            </div>
          </div>
          <div className={"tab-pane" + (tabview && tabview == "list" ? " show active" : "")} id="listview">
            <div className="" id="scrollableListView">
              {tabview && tabview == "list" && (
                <>
                  <InfiniteScroll dataLength={ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataList} scrollableTarget="page-content-list" hasMore={tabview && tabview == "list" && ListView.next_page_url ? true : false} loader={<PaginationLoader />} style={{ overflow: ListView.next_page_url ? "auto" : "inherit" }}>
                    <div className="table-responsive bg-white">
                      <table className="table mb-0">
                        <thead className="position-sticky">
                          <tr>
                            <th></th>
                            <th>
                              <a className="cursor-pointer" onClick={() => sorting({ first_name: sort.first_name == "asc" ? "desc" : "asc" })}>
                                {t("Name")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort.first_name == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort.first_name == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>{t("Phone")}</th>
                            <th colSpan="2">{t("Email Address")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <ClientListView currentUser={currentUser} view={ListView} role_id={role_id} access={access} />
                        </tbody>
                      </table>
                    </div>
                    {!isFetching && ListView.next_page_url && (
                      <div className="col-2 m-auto p-3 text-center">
                        <button onClick={loadMoreItemsList} className="btn btn-primary">
                          {t("More")}
                        </button>
                      </div>
                    )}
                  </InfiniteScroll>
                </>
              )}
            </div>
          </div>
        </div>
        {checkaccess({ name: "create", role_id: role_id, controller: "clients", access }) && clientIsOpenedAddForm ? <ClientAddForm /> : ""}
        {(checkaccess({ name: "view", role_id: role_id, controller: "clients", access }) || checkaccess({ name: "update", role_id: role_id, controller: "clients", access })) && clientIsOpenedDetailModal ? <ClientDetailModal /> : ""}
      </div>
    </>
  );
};

export default Clients;
