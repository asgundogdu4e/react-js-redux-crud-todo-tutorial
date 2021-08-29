import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const warning = "warning",
  error = "error",
  success = "success",
  info = "info",
  question = "question";

const YesNoAlert = (text, title, icon) =>
  new Promise((resolve) => {
    Swal.fire({
      text,
      title,
      icon: icon || question,
      showCancelButton: true,
      confirmButtonText: `Evet`,
      confirmButtonColor: "#42ba96",
      cancelButtonText: `Hayır`,
      cancelButtonColor: "#d33",
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });

const DeleteAlert = () =>
  new Promise((resolve) => {
    Swal.fire({
      text: "Bu kaydı silmek istediğinizden emin misiniz?",
      title: "Emin misiniz?",
      icon: warning,
      showCancelButton: true,
      confirmButtonText: `Evet !`,
      confirmButtonColor: "#d33",
      cancelButtonText: `Hayır`,
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });

export { warning, error, success, info, question, YesNoAlert, DeleteAlert };
