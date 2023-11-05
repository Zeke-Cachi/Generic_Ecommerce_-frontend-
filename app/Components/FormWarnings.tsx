const FormWarnings: React.FC<{ message: string }> = ({ message }) => {
  return <p className="text-red-500 text-xs font-bold mb-2">{message}</p>;
};

export default FormWarnings;
