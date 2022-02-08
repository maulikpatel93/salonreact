import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { closeAddNoteForm } from "store/slices/clientnoteSlice";
import config from "../../../../config";
import NoteCreate from "./NoteCreate";
import NoteUpdate from "./NoteUpdate";

const NoteFormDrawer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rightDrawerOpenedAdd = useSelector((state) => state.clientnote.isOpenedAddForm);
  const rightDrawerOpenedEdit = useSelector((state) => state.clientnote.isOpenedEditForm);
  const detail = useSelector((state) => state.client.isDetailData);
  return (
    <>
      <div className={"drawer addnote-drawer " + rightDrawerOpenedAdd + rightDrawerOpenedEdit}>
        <div className="drawer-wrp position-relative">
          <div className="drawer-header">
            <h2 className="mb-4 pe-md-5 pe-3">{t("add_note")}</h2>
            <a className="close" onClick={() => dispatch(closeAddNoteForm())}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body">
            {rightDrawerOpenedAdd && <NoteCreate name="note" className="btn btn-outline btn-sm ms-2" label={t("add_note")} page="client-addnoteform" controlId="clientForm-note" client_id={detail.id} />}
            {rightDrawerOpenedEdit && <NoteUpdate name="note" className="btn btn-outline btn-sm ms-2" label={t("add_note")} page="client-addnoteform" controlId="clientForm-note" client_id={detail.id} />}
          </div>
        </div>
      </div>
    </>
  );
};

// Notes.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default NoteFormDrawer;
