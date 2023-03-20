import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import NotificationAlert from "react-notification-alert";
import ToastContext from "./context";

function withToastProvider(Component) {
  function WithToastProvider(props) {
    const notificationAlertRef = React.useRef(null);

    const add = (place, type, content) => {
      var type;

      var options = {};
      options = {
        place: place,
        message: (
          <div>
            <div>{content}</div>
          </div>
        ),
        type: type,
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3,
      };
      notificationAlertRef.current.notificationAlert(options);
    };

    const providerValue = useMemo(() => {
      return { add };
    });

    return (
      <ToastContext.Provider value={providerValue}>
        <Component {...props} />
        <div className="rna-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
      </ToastContext.Provider>
    );
  }

  return WithToastProvider;
}

export default withToastProvider;
