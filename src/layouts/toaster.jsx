// toaster.jsx
import { toast } from 'react-toastify';

function EntryMessage(email) {
  const notify = () =>
    toast.success(`🦄 Welcome ${email}!`, { // Use the passed email parameter
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  notify();
}

export default EntryMessage;
