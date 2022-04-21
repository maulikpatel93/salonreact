import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
import { swalConfirm } from "../../../../component/Sweatalert2";
import { ClientnoteGridViewApi, clientnoteDeleteApi, closeNoteDrawer, openAddNoteForm, openEditNoteForm, clientnoteDetailApi } from "store/slices/clientnoteSlice";
import config from "../../../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { checkaccess } from "helpers/functions";
import NoteFormDrawer from "./NoteFormDrawer";

const Notes = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const rightDrawerOpened = useSelector((state) => state.clientnote.isNoteDrawer);
  const noteViews = useSelector((state) => state.clientnote.isGridView);
  const noteObjectData = noteViews && noteViews.data ? noteViews.data : noteViews;
  const detail = useSelector((state) => state.client.isDetailData);

  const fetchDataPhotoList = () => {
    dispatch(ClientnoteGridViewApi({ client_id: detail.id, next_page_url: noteViews.next_page_url }));
  };

  const handleClientDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete?"), message: t("Success"), confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(clientnoteDeleteApi({ id: event.id }));
    }
  };

  const handleNoteEditForm = (e) => {
    const id = e.currentTarget.closest(".event-box").dataset.id;
    dispatch(openEditNoteForm());
    dispatch(clientnoteDetailApi({ id, client_id: detail.id }));
  };
  return (
    <>
      <div className="drawer-header">
        <h2 className="mb-4 pe-md-5 mb-lg-5">
          {t("Notes")}{" "}
          {checkaccess({ name: "create", role_id: role_id, controller: "clientnotes", access }) && (
            <button type="button" className="btn btn-outline-primary btn-sm ms-2" onClick={() => dispatch(openAddNoteForm())}>
              {t("Add Note")}
            </button>
          )}
        </h2>
      </div>
      <div className="content-wrp">
        <InfiniteScroll className="row gx-0" dataLength={noteObjectData && noteObjectData.length ? noteObjectData.length : "0"} next={fetchDataPhotoList} scrollableTarget="notelist" hasMore={noteViews.next_page_url ? true : false} loader={<PaginationLoader />}>
          {noteObjectData.length > 0 ? (
            <>
              {Object.keys(noteObjectData).map((item, i) => {
                let id = noteObjectData[item].id;
                //   let client_id = noteObjectData[item].client_id;
                let note = noteObjectData[item].note;
                let updated_at = noteObjectData[item].updated_at;
                return (
                  <div className="event-box" key={i} data-id={id}>
                    <div className="row gx-1 justify-content-between">
                      <div className="col-md-7 mb-2">{updated_at}</div>
                      <div className="col-md-5 text-end mb-2">
                        {checkaccess({ name: "delete", role_id: role_id, controller: "clientnotes", access }) && (
                          <a className="remove me-2 cursor-pointer" data-obj={JSON.stringify(noteObjectData[item])} onClick={handleClientDelete}>
                            {t("Remove")}
                          </a>
                        )}
                        {checkaccess({ name: "update", role_id: role_id, controller: "clientnotes", access }) && (
                          <a className="btn btn-outline-primary btn-sm cursor-pointer" onClick={(e) => handleNoteEditForm(e)}>
                            {t("Edit")}
                          </a>
                        )}
                      </div>
                    </div>
                    <p>
                      <b>{note}</b>
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
              <div className="complete-box-wrp text-center">
                <img src={config.imagepath + "nots.png"} alt="" className="mb-md-4 mb-3" />
                <h5 className="mb-2 fw-semibold">
                  {t("Keep a note of anything you need to remember about your client.")}
                  <br />
                  {checkaccess({ name: "create", role_id: role_id, controller: "clientnotes", access }) && (
                    <a className="add-note cursor-pointer" onClick={() => dispatch(openAddNoteForm())}>
                      {t("Add your first note.")}
                    </a>
                  )}
                </h5>
              </div>
            </div>
          )}
        </InfiniteScroll>
      </div>
      <NoteFormDrawer />
      {/* <NoteAddFormDrawer /> */}
    </>
  );
};

export default Notes;
