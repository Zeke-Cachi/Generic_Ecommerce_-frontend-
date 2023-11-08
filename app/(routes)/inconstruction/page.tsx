import { MdConstruction } from "react-icons/md";
import H2Title from "@/app/Components/H2Title";

const PageInConstruction = () => {
  return (
    <div className="bg-white">
      <H2Title title="Page under construction" />
      <MdConstruction className="text-[30rem] text-purple-500 mx-auto mb-16" />
    </div>
  );
};

export default PageInConstruction;
