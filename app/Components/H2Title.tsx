import React from "react";

const H2Title: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className="px-4 my-4 text-[2.5rem]">{title}</h2>;
};

export default H2Title;
