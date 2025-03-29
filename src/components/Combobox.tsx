import React, { useState } from 'react';

interface ComboBoxProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: string[];
  onSelect: (value: string) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  suggestions,
  onSelect,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (suggestion: string) => {
    onSelect(suggestion);
    setDropdownVisible(false);
  };

  return (
    <div className="relative flex flex-col">
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          setDropdownVisible(true);
        }}
        onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
        className="p-2 border border-gray-300 rounded"
        autoComplete="off"
      />
      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md z-10 max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
