import Swal from 'sweetalert2/src/sweetalert2.js';

export const removeAllWhitespace = (string: string) => {
  return string.replace(/ /g, '');
};

export const getUserData = () => {
  const userLoginJson = localStorage.getItem('userLogin');
  if (typeof userLoginJson !== 'undefined' && userLoginJson !== null) {
    const userLoginObj = JSON.parse(userLoginJson);
    return userLoginObj;
  }

  return false;
};

export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
