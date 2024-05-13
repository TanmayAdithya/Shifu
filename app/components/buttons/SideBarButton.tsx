import React from "react";

interface props {
  title: string;
}

function SideBarButton(props: props) {
  const title = props.title;
  return (
    <>
      <button className="h-10  bg-green-700">{title}</button>
    </>
  );
}

export default SideBarButton;
