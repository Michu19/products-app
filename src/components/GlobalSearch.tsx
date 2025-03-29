import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchProps {
  placeholder: string;
  suggestions: { label: string; path: string }[];
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  placeholder,
  suggestions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setSearchTerm('');
    setDropdownVisible(false);
  };

  return (
    <div className="relative flex flex-col">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setDropdownVisible(true);
        }}
        onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
        className="p-2 border border-gray-300 rounded"
        autoComplete="off"
      />
      {isDropdownVisible && filteredSuggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md z-10 max-h-40 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion.path)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlobalSearch;
