import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { FormDeleteApi, FormDetailApi, FormElementDelete, FormElementTypeListApi, FormListViewApi, HandleFormData, OpenAddFormForm, OpenEditFormForm, ResetHandleFormData } from "store/slices/formSlice";
import ConsultationAddForm from "../Form/ConsultationAddForm";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import ConsultationEditForm from "../Form/ConsultationEditForm";
import { swalConfirm } from "../../../component/Sweatalert2";

const Consultation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const isListView = useSelector((state) => state.form.isListView);
  const isListViewObjectData = isListView && isListView.data ? isListView.data : isListView;
  const isOpenedAddForm = useSelector((state) => state.form.isOpenedAddForm);
  const isOpenedEditForm = useSelector((state) => state.form.isOpenedEditForm);
 
  useEffect(() => {
    dispatch(FormListViewApi());
  }, []);

  const fetchDataList = () => {
    dispatch(FormListViewApi({ next_page_url: isListView.next_page_url }));
  };

  const handleClosedDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete?"), message: "", confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(FormDeleteApi({ id: event.id }));
    }
  };

  return (
    <>
      <div className="row mx-0">
        <div className="col-xl-6 left-content bg-white text-md-start text-center">
          <h4 className="fw-semibold mb-2">{t("Consultation Forms")}</h4>
          <h6>{t("Collect any client details you need before an appointment takes place by sending online forms to your clients via SMS or email which are saved in their client records.")}</h6>
          <a
            id="addclosedate"
            className="btn btn-primary fw-bold cursor-pointer"
            onClick={() => {
              dispatch(OpenAddFormForm());
              dispatch(FormElementTypeListApi());
            }}
          >
            {t("Create a Consultation Form")}
          </a>
        </div>
        <div className="col-xl-6 right-content">
          <InfiniteScroll className="row" dataLength={isListViewObjectData && isListViewObjectData.length ? isListViewObjectData.length : "0"} next={fetchDataList} scrollableTarget="page-content-CancellationReasons" hasMore={isListView.next_page_url ? true : false} loader={<PaginationLoader />}>
            {Object.keys(isListViewObjectData).map((item, i) => {
              let id = isListViewObjectData[item].id;
              let title = isListViewObjectData[item].title;
              return (
                <div className="box-image-cover w-100 mx-0 p-md-4 p-3 text-start" key={i}>
                  <div className="row align-items-center">
                    <div className="col-xxl-9 col-md-8 mb-md-0 mb-2">
                      <h5 className="fw-semibold mb-1">{title}</h5>
                    </div>
                    <div className="col-xxl-3 col-md-4 text-end">
                      <a
                        id="editform"
                        className="edit me-1 cursor-pointer"
                        onClick={() => {
                          dispatch(ResetHandleFormData());
                          dispatch(FormElementDelete(""));
                          dispatch(FormDetailApi({ id })).then((action) => {
                            if (action.meta.requestStatus === "fulfilled") {
                              dispatch(OpenEditFormForm());
                              dispatch(FormElementTypeListApi());
                            }
                          });
                        }}
                      >
                        {t("Edit")}
                      </a>
                      <a className="delete cursor-pointer" data-obj={JSON.stringify(isListViewObjectData[item])} onClick={handleClosedDelete}>
                        <i className="fas fa-trash text-sm"></i>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
      {isOpenedAddForm && <ConsultationAddForm />}
      {isOpenedEditForm && <ConsultationEditForm />}
    </>
  );
};

export default Consultation;
