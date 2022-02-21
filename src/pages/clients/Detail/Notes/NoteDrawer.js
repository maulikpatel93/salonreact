import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
import { swalConfirm } from "../../../../component/Sweatalert2";
import { clientnoteGridViewApi, clientnoteDeleteApi, closeNoteDrawer, openAddNoteForm, openEditNoteForm, clientnoteDetailApi } from "store/slices/clientnoteSlice";
import config from "../../../../config";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { checkaccess } from "helpers/functions";

const NoteDrawer = () => {
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
    dispatch(clientnoteGridViewApi({ client_id: detail.id, next_page_url: noteViews.next_page_url }));
  };

  const handleClientDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure?_delete"), message: t("Success"), confirmButtonText: t("yes_delete_it") });
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
      <div className={"drawer addnote-drawer " + rightDrawerOpened}>
        <div className="drawer-wrp position-relative">
          <div className="drawer-header">
            <h2 className="mb-4 pe-md-5 pe-3">
              {t("Notes")}
              {checkaccess({ name: "create", role_id: role_id, controller: "clientnotes", access }) && (
                <button type="button" className="btn btn-outline-primary btn-sm ms-2" onClick={() => dispatch(openAddNoteForm())}>
                  {t("add_note")}
                </button>
              )}
            </h2>
            <a className="close cursor-pointer" onClick={() => dispatch(closeNoteDrawer())}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body" id="notelist">
            <InfiniteScroll className="" dataLength={noteObjectData && noteObjectData.length ? noteObjectData.length : "0"} next={fetchDataPhotoList} scrollableTarget="notelist" hasMore={noteViews.next_page_url ? true : false} loader={<PaginationLoader />}>
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
                ""
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

// Notes.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default NoteDrawer;
