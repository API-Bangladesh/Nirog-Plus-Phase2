import Swal from 'sweetalert2';
export const showSuccessNotification = (title, message) => {
  Swal.fire({
    icon: 'success',
    title: title,
    timer: 2000,
    timerProgressBar: true,
    text: message,
  });
};

export const showErrorNotification = (title, message) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: message,
  });
};

export const showSuccessTimerNotification = (title, message) => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: title,
    text: message,
  });
};





