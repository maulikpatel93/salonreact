import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
// import config from "../../../../config";
import { swalConfirm } from "../../../../component/Sweatalert2";
import { clientphotoGridViewApi, clientphotoUpdateApi, clientphotoDeleteApi, closePhotoDrawer } from "store/slices/clientphotoSlice";
import config from "../../../../config";
import ImageUpload from "component/form/ImageUpload";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { checkaccess } from "helpers/functions";

const PhotoDrawer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const rightDrawerOpened = useSelector((state) => state.clientphoto.isPhotoDrawer);
  const photoViews = useSelector((state) => state.clientphoto.isGridView);
  const photoObjectData = photoViews && photoViews.data ? photoViews.data : photoViews;
  const detail = useSelector((state) => state.client.isDetailData);

  const fetchDataPhotoList = () => {
    dispatch(clientphotoGridViewApi({ client_id: detail.id, next_page_url: photoViews.next_page_url }));
  };

  const handleClientDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure?_delete"), message: t("Success"), confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(clientphotoDeleteApi({ id: event.id }));
    }
  };

  return (
    <>
      <div className={"drawer addphoto-drawer " + rightDrawerOpened}>
        <div className="drawer-wrp position-relative">
          <div className="drawer-header">
            <h2 className="mb-4 pe-md-5 pe-3">
              {t("Photos")} {checkaccess({ name: "create", role_id: role_id, controller: "clientphotos", access }) && <ImageUpload name="photo" className="btn btn-outline btn-sm ms-2" accept="image/*" label={t("add_photo")} page="client-addphotoform" controlId="clientForm-photo" client_id={detail.id} />}
            </h2>
            <a className="close" onClick={() => dispatch(closePhotoDrawer())}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body" id="photolist">
            <InfiniteScroll className="row" dataLength={photoObjectData && photoObjectData.length ? photoObjectData.length : "0"} next={fetchDataPhotoList} scrollableTarget="photolist" hasMore={photoViews.next_page_url ? true : false} loader={<PaginationLoader />}>
              {photoObjectData.length > 0 ? (
                <>
                  {Object.keys(photoObjectData).map((item, i) => {
                    let id = photoObjectData[item].id;
                    let photo_url = photoObjectData[item].photo_url;
                    let client_id = photoObjectData[item].client_id;
                    let is_profile_photo = photoObjectData[item].is_profile_photo;
                    return (
                      <div className="col-6 mb-md-4 mb-3" key={i}>
                        <div className="img-wrap">
                          <img src={photo_url} alt="" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          {checkaccess({ name: "profileimage", role_id: role_id, controller: "clientphotos", access }) && (
                            <a
                              className={(is_profile_photo === "1" ? "disabled " : "") + "btn btn-outline-primary btn-sm cursor-pointer"}
                              onClick={() => {
                                dispatch(clientphotoUpdateApi({ id: id, client_id: client_id }));
                                dispatch(clientphotoGridViewApi({ client_id: client_id }));
                              }}
                            >
                              {t("Profile_Image")}
                            </a>
                          )}
                          {checkaccess({ name: "delete", role_id: role_id, controller: "clientphotos", access }) && (
                            <a className="remove mt-md-0 mt-2 cursor-pointer" data-obj={JSON.stringify(photoObjectData[item])} onClick={handleClientDelete}>
                              {t("Remove")}
                            </a>
                          )}
                        </div>
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

// Photos.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default PhotoDrawer;
