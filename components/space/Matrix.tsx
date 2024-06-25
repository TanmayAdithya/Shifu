import React from "react";

type Props = {
  openMatrixWidget: boolean;
};

const Matrix = ({ openMatrixWidget }: Props) => {
  return <div className={`${openMatrixWidget ? "" : "hidden"}`}>Matrix</div>;
};

export default Matrix;
