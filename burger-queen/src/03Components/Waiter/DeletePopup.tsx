import Swal, { SweetAlertResult } from "sweetalert2";
import styles from "./DeletePopup.module.css";

export const DeletePopup = (): Promise<SweetAlertResult<DeleteButton>> => {
  return Swal.fire<DeleteButton>({
    title: 'Estás seguro de que quieres eliminar este producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#C1D78F',
    confirmButtonText: 'Eliminar!',
    cancelButtonText: 'Cancelar',
    background: '#FFF5E0',
    customClass:{
      title: styles["swal2-title"]
    }
  });
};

interface DeleteButton {
  isConfirmed: boolean;
  isDenied: boolean;
}
