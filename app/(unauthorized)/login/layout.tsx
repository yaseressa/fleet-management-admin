import React from "react";

const layout = ({ children }: any) => {
  return (
    <div className="bg-gradient-to-br  to-secondary from-secondary via-tertiary">
      {children}
    </div>
  );
};

export default layout;
