import React from "react";

type Props = {
  importance: "primary" | "secondary" | "tertiary";
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
};

const ActionButton = (props: Props) => {
  return <div>ActionButton</div>;
};

export default ActionButton;
