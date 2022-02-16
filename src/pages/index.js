import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { salonmoduleListViewApi, salonpermission } from "../store/slices/salonmoduleSlice";

const SalonModule = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  useEffect(() => {
    dispatch(salonmoduleListViewApi({ role_id: currentUser && currentUser.role_id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(salonpermission({ module_id: 6, permissonName: "list" }));
      }
    });
  }, []);
};

// const salonpermission = () => {
//   const salonmodule = useSelector((state) => state.salonmodule.isListView);
//   console.log(salonmodule);
//   const salonpermission = salonmodule
//     .filter((list) => list.id === 9)
//     .map((list) => {
//       console.log(list);
//     });
//   // console.log(salonpermission);
//   return;
// };

export { SalonModule };
