import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
// import config from "../../../../config";
import { openPhotoDrawer } from "store/slices/clientphotoSlice";
import config from "../../../../config";
import PhotoDrawer from "./PhotoDrawer";

const Photos = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <>
      <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
        <div className="complete-box-wrp text-center">
          <img src={config.imagepath + "addphoto-box.png"} alt="" className="mb-md-4 mb-3" />
          <h5 className="mb-2 fw-semibold">
            {t("add_client_profile_photo_note")}
            <br />
            <a className="add-photo cursor-pointer" onClick={() => dispatch(openPhotoDrawer())}>
              {t("Add_your_first_photo")}
            </a>
          </h5>
        </div>
      </div>
      <PhotoDrawer />
    </>
  );
};

// Photos.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default Photos;
