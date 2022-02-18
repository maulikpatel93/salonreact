import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { salonmoduleListViewApi, salonmoduleAccessViewApi } from "../store/slices/salonmoduleSlice";

const SalonModule = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(salonmoduleListViewApi()).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        //dispatch(salonpermission({ module_id: 6, permissonName: "list" }));
      }
    });
    dispatch(salonmoduleAccessViewApi({ type: "staff_access" }));
  }, []);
};

export { SalonModule };
