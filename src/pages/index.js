import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { GetUser } from "store/slices/authSlice";
import { salonmoduleListViewApi, salonmoduleAccessViewApi } from "../store/slices/salonmoduleSlice";

const SalonModule = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(salonmoduleListViewApi()).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        //dispatch(salonpermission({ module_id: 6, permissonName: "list" }));
      }
    });
    dispatch(salonmoduleAccessViewApi({ type: "staff_access" }));
    if (location && location.pathname === "/dashboard") {
      dispatch(GetUser());
    }
  }, [location]);
};

export { SalonModule };
