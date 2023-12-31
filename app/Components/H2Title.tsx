const H2Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h2 className="px-4 my-4 text-[2rem] lg:text-[2.5rem] text-gray-600">
      {title}
    </h2>
  );
};

export default H2Title;
