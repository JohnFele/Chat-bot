import { useState } from 'react';
import { AlertContext } from './AlertContext';
import Alert from '../components/Alert';

// eslint-disable-next-line react/prop-types
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, options = {}) => {
    setAlert({ message, ...options });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={alert.onClose || hideAlert}
          actionText={alert.actionText}
          onAction={alert.onAction}
          position={alert.position}
          duration={alert.duration}
          showClose={alert.showClose}
        />
      )}
    </AlertContext.Provider>
  );
};
