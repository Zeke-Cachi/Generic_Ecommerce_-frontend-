import { MdConstruction } from "react-icons/md";
import H2Title from "@/app/Components/H2Title";

const PageInConstruction = () => {
  return (
    <div className="bg-white py-16 lg:py-4">
      <H2Title title="Page under construction" />
      <MdConstruction className="text-[10rem] lg:text-[30rem] text-purple-500 mx-auto mb-16" />
    </div>
  );
};

export default PageInConstruction;
