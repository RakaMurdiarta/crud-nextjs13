import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = (props: Props) => {
  return <div className="mx-10">{props.children}</div>;
};

export default Container;
