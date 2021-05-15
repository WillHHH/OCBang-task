import React from "react";
import { Button } from "antd";

const MainButton = ({
  label,
  onClick,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <Button
      loading={isLoading}
      disabled={disabled}
      type="primary"
      shape="round"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default MainButton;
