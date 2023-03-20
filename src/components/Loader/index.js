import React from "react";
import Skeleton from "react-loading-skeleton";

export default (props) => {
  return (
    <div className="row">
      <div className="col-4">
        <Skeleton height={60} />
        <Skeleton height={30} />
      </div>
      <div className="col-6"></div>
      <div className="col-2">
        <Skeleton height={50} />
      </div>
      <div className="col mt-4">
        <Skeleton count={7} height={20} />
      </div>
    </div>
  );
};
