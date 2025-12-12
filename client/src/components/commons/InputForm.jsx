const InputForm = ({ label, type, placeholder, name, value, autoComplete, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-base font-poppins font-medium text-gray-700 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        className="w-full py-3 px-4 border-2 border-gray-400 rounded-lg text-gray-800 placeholder-gray-500 text-base font-poppins focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition duration-200"
      />
    </div>
  );
};

export default InputForm;
