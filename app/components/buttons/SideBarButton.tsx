import React from "react";

interface props {
  title: string;
}

function SideBarButton(props: props) {
  return (
    <>
      <li className="">{props.title}</li>
    </>
  );
}

export default SideBarButton;
