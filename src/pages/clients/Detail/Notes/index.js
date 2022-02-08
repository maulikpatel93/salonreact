import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
// import config from "../../../../config";
import { openNoteDrawer } from "store/slices/clientnoteSlice";
import config from "../../../../config";
import NoteDrawer from "./NoteDrawer";
import NoteFormDrawer from "./NoteFormDrawer";

const Notes = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const rightDrawerOpened = useSelector((state) => state.clientnote.isOpenedAddForm);
  return (
    <>
      <div className="complete-box text-center d-flex flex-column justify-content-center mt-xs-4">
        <div className="complete-box-wrp text-center">
          <img src={config.imagepath + "nots.png"} alt="" className="mb-md-4 mb-3" />
          <h5 className="mb-2 fw-semibold">
            {t("Keep a note of anything you need to remember about your client.")}
            <br />
            <a className="add-note cursor-pointer" onClick={() => dispatch(openNoteDrawer())}>
              {t("Add your first note.")}
            </a>
          </h5>
        </div>
      </div>
      <NoteDrawer />
      <NoteFormDrawer />
      {/* <NoteAddFormDrawer /> */}
    </>
  );
};

export default Notes;
