import { toast } from "react-toastify";
// import toastr from "toastr";

const Notify = (props) => {
  const option = {
    position: "bottom-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    newestOnTop: true,
    theme: "dark"
  };
  let text = props.text ? props.text : "";
  let type = props.type ? props.type : "";
  // toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!')
  if (type === "success") {
    toast.success(text);
  } else if (type === "warning") {
    toast.warn(text);
  } else if (type === "error") {
    toast.error(text);
  } else if (type === "info") {
    toast.info(text);
  }
  // toast("Wow so easy !");
};
export { Notify };
