import Swal from "sweetalert2";

const sweatalert = (props) => {
  Swal.fire({
    title: props.title,
    text: props.text,
    icon: props.icon,
  });
};

const swalSuccess = (props) => {
  Swal.fire({
    title: props.title,
    text: props.text,
    icon: "success",
  });
};

const swalError = (props) => {
  Swal.fire({
    title: props.title,
    text: props.text,
    icon: "error",
  });
};

const swalConfirm = (btn, props) => {
  if (btn.getAttribute("confirmOK") === "1" || btn.getAttribute("confirmOK") === 1) {
    btn.setAttribute("confirmOK", "0");
    return true;
  }
  Swal.fire({
    title: `<h5 class="mb-0">${props.title}</h5>`,
    text: props.message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: props.confirmButtonText,
  }).then((result) => {
    if (result.value) {
      btn.setAttribute("confirmOK", "1");
      if (props.message === "statusupdate") {
        const event = new Event("change", { bubbles: true });
        btn.dispatchEvent(event);
      } else {
        btn.click();
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      btn.setAttribute("confirmOK", "0");
    }
  });
  return false;
};

export { sweatalert, swalSuccess, swalError, swalConfirm };
