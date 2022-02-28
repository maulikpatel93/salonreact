import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import AppointmentListview from "./AppointmentListview";
import { clientAppointmentListViewApi } from "store/slices/appointmentSlice";
import AppointmentEditForm from "pages/calendar/Form/AppointmentEditForm";

const Appointment = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const ListView = useSelector((state) => state.appointment.isClientAppointmentListView);
  const isFilter = useSelector((state) => state.appointment.isFilter);
  const editForm = useSelector((state) => state.appointment.isOpenedEditForm);
  const detail = useSelector((state) => state.client.isDetailData);

  const fetchDataList = () => {
    dispatch(clientAppointmentListViewApi({ next_page_url: ListView.next_page_url, filter: isFilter, client_id: detail.id }));
  };

  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItemsList = () => {
    setIsFetching(true);
    dispatch(clientAppointmentListViewApi({ next_page_url: ListView.next_page_url, filter: isFilter, client_id: detail.id }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };
  return (
    <>
      <div className="" id="scrollableListView">
        <InfiniteScroll dataLength={ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataList} scrollableTarget="clientdetail_appointment" hasMore={ListView.next_page_url ? true : false} loader={<PaginationLoader />} style={{ overflow: ListView.next_page_url ? "auto" : "inherit" }}>
          <AppointmentListview currentUser={currentUser} view={ListView} role_id={role_id} access={access} />
          {!isFetching && ListView.next_page_url && (
            <div className="col-2 m-auto p-3 text-center">
              <button onClick={loadMoreItemsList} className="btn btn-primary">
                {t("More")}
              </button>
            </div>
          )}
        </InfiniteScroll>
      </div>
      {editForm && <AppointmentEditForm page={"client-detail"} />}
    </>
  );
};

export default Appointment;
