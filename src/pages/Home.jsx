import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { useOutletContext } from "react-router-dom";


const defaultDishes = [

];

const categories = [
  "All Dishes",
  "Hot Dishes",
  "Cold Dishes",
  "Soup",
  "Grill",
  "Appetizer",
  "Dessert",
];

export default function Home() {
  const { handleAddToCart } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Dishes");
  const [selectedDine, setSelectedDine] = useState("Dine In");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dishes, setDishes] = useState(defaultDishes);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customDishes")) || [];
    if (saved.length > 0) {
      setDishes([...defaultDishes, ...saved]);
    }
  }, []);

  const filtered = dishes.filter(
    (dish) =>
      (selectedCategory === "All Dishes" || dish.category === selectedCategory) &&
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-[#252836] px-8 py-6 rounded-tl-3xl min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Jaegar Resto</h1>
          <p className="text-gray-400 text-sm">Tuesday, 2 Feb 2021</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1F1D2B] text-sm rounded-lg pl-10 pr-4 py-2 outline-none text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-[#EA7C69]"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-lg font-semibold text-white">Choose Dishes</h2>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-[#1F1D2B] px-3 py-1 rounded-md text-sm text-gray-300 hover:bg-[#EA7C69] hover:text-white"
          >
            {selectedDine} <ChevronDown size={16} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-[#1F1D2B] border border-[#2D303E] rounded-lg shadow-lg z-10">
              {["Dine In", "To Go", "Delivery"].map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedDine(option);
                    setShowDropdown(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-[#EA7C69] hover:text-white ${
                    selectedDine === option ? "text-[#EA7C69]" : "text-gray-300"
                  }`}
                >
                  {option}
                  {selectedDine === option && <Check size={14} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6 mb-6 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`pb-2 text-sm font-medium border-b-2 transition-all duration-300 ${
              selectedCategory === cat
                ? "border-[#EA7C69] text-[#EA7C69]"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {filtered.map((dish) => (
            <div
              key={dish.id}
              onClick={() => handleAddToCart(dish)} 
              className="relative mt-[70px] bg-[#1F1D2B] w-[220px] h-[250px] rounded-2xl pt-16 pb-4 flex flex-col items-center text-center hover:scale-105 hover:shadow-lg hover:shadow-[#EA7C6940] cursor-pointer transition-all duration-300 mx-auto"
            >
              <div className="absolute -top-12">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-28 h-28 object-contain"
                />
              </div>
              <div className="">
                <p className="text-sm font-medium mb-1 leading-tight truncate text-white w-[200px]">
                  {dish.name}
                </p>
                <p className="text-[#EA7C69] font-semibold text-sm mb-1">
                  {dish.price}
                </p>
                <p className="text-gray-500 text-xs">{dish.available}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400 text-lg">❌ Bunday taom topilmadi.</p>
        </div>
      )}
    </div>
  );
}
