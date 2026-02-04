interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string; 
  invalidMessage?: string;
}

const Input = ({ label, id, invalidMessage, className = "", ...props }: InputProps) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-semibold mb-2 text-gray-700"
    >
      {label}
    </label>
    <input
      id={id}
      {...props}
      className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all ${className}`}
    />
    <p className="text-red-600 p-1 text-sm">{ invalidMessage }</p>
  </div>
);

export default Input;
