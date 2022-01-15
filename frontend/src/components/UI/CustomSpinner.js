import React from "react";
import { Spinner } from "react-bootstrap";

const CustomSpinner = ({ size }) => {
  return (
    <div className="d-flex justify-content-center my-4">
      <Spinner
        animation="border"
        variant="secondary"
        size={size ? size : "lg"}
      ></Spinner>
    </div>
  );
};

export default CustomSpinner;
