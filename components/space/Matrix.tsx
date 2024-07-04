import React from "react";

type Props = {
  openMatrixWidget: boolean;
};

const Matrix = ({ openMatrixWidget }: Props) => {
  return (
    <div className={`${openMatrixWidget ? "" : "hidden"} absolute`}>Matrix</div>
  );
};

export default Matrix;
