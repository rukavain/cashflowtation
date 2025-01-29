"use client";

import { useState, useEffect, useRef } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const dropdownRef = useRef(null);

  const categories = ["Food", "Gift", "Personal", "Transportation"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false); // Close dropdown after selection
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="bg-gray-200 border-2 border-gray-600 text-gray-600 font-bold  py-2 px-4 rounded-xl w-40"
        onClick={toggleDropdown}
      >
        {selectedCategory} {/* Display selected category */}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-gray-200 rounded-xl border border-gray-400">
          {categories.map((category, index) => (
            <li
              key={index}
              className="py-2 px-4 hover:bg-gray-300 cursor-pointer"
              onClick={() => handleSelectCategory(category)} // Update category when clicked
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
