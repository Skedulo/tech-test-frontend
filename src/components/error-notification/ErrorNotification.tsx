import React from "react";
import "./ErrorNotification.css";

interface IErrorNotification {
  children: React.ReactNode,
}

export const ErrorNotification: React.FC<IErrorNotification> = (props: IErrorNotification) => {
  const { children } = props;
  return (
    <div data-testid="error-notification" className="error-notification">{children}</div>
  )
}
