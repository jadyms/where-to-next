import React, { FunctionComponent, ReactNode } from "react";

export type ContainerProperties = {
  readonly children: ReactNode;
};
const Container: FunctionComponent<ContainerProperties> = ({ children }) => {
  return (
    <div className="w-screen h-screen sm:mx-auto overflow-clip max-w-screen-7xl">
      <div className="w-full h-full pb-20">{children}</div>
    </div>
  );
};
export default Container;
