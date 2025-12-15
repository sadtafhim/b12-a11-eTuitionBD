import React from "react";
import { PropagateLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div>
      <PropagateLoader
        loading={true}
        color="#f6b436"
        size={20}
        speedMultiplier={1}
      />
    </div>
  );
};

export default LoadingSpinner;
