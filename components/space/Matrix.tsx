import React from "react";

type Props = {
  openMatrixWidget: boolean;
};

const Matrix = ({ openMatrixWidget }: Props) => {
  return (
    <div className={`${openMatrixWidget ? "" : "hidden"} absolute z-10`}>
      Matrix
    </div>
  );
};

export default Matrix;
