interface FilterTypes {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  value: string;
}

const FilterItem = ({
  label,
  checked,
  onChange,
  type,
  name,
  value,
}: FilterTypes) => (
  <label className="flex items-center gap-2 mb-1 cursor-pointer group">
    <input
      type={type}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
    />
    <span className="text-gray-700 group-hover:text-blue-800 transition-colors">
      {label}
    </span>
  </label>
);

export default FilterItem;
