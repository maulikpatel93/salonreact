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

const Photos = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const photoViews = useSelector((state) => state.clientphoto.isGridView);
  const photoObjectData = photoViews && photoViews.data ? photoViews.data : photoViews;
  const detail = useSelector((state) => state.client.isDetailData);

  const fetchDataPhotoList = () => {
    dispatch(clientphotoGridViewApi({ client_id: detail.id, next_page_url: photoViews.next_page_url }));
  };

  const handleClientDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete?"), message: t("Success"), confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(clientphotoDeleteApi({ id: event.id }));
    }
  };
  return (
    <>
      <div className="drawer-header">
        <h2 className="mb-4 pe-md-5 mb-lg-5">
          {t("Photos")} {checkaccess({ name: "create", role_id: role_id, controller: "clientphotos", access }) && <ImageUpload name="photo" className="btn btn-outline btn-sm ms-2" accept="image/*" label={t("Add Photo")} page="client-addphotoform" controlId="clientForm-photo" client_id={detail.id} />}
        </h2>
      </div>
      <div className="content-wrp">
        <InfiniteScroll className="row" dataLength={photoObjectData && photoObjectData.length ? photoObjectData.length : "0"} next={fetchDataPhotoList} scrollableTarget="documentlist" hasMore={photoViews.next_page_url ? true : false} loader={<PaginationLoader />}>
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
                          className={(is_profile_photo === 1 ? "disabled " : "") + "btn btn-outline-primary btn-sm cursor-pointer"}
                          onClick={() => {
                            dispatch(clientphotoUpdateApi({ id: id, client_id: client_id }));
                            dispatch(clientphotoGridViewApi({ client_id: client_id }));
                          }}
                        >
                          {t("Profile Image")}
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
            <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
              <div className="complete-box-wrp text-center">
                <img src={config.imagepath + "docs.png"} alt="" className="mb-md-4 mb-3" />
                <h5 className="mb-2 fw-semibold">
                  {t("Add a client profile photo and keep a record of their treatments.")}
                  <br />
                  {checkaccess({ name: "create", role_id: role_id, controller: "clientdocuments", access }) && <ImageUpload name="photo" className="" accept="image/*" label={t("Add your first photo.")} page="client-addphotoform-circle" controlId="clientForm-photo" client_id={detail.id} />}
                  {/* <a
              className="add-document cursor-pointer"
              onClick={() => }
            >
              {t("Add your first document.")}
            </a> */}
                </h5>
              </div>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

// Photos.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default Photos;
