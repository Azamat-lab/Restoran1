
import React, { useState, useEffect } from "react";

export default function Settings() {
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    available: "",
    category: "Hot Dishes",
    image: "",
  });
  const [activeCategory, setActiveCategory] = useState("Hot Dishes");
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState("Products Management");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customDishes")) || [];
    setDishes(saved);
  }, []);

  const saveToLocalStorage = (newList) => {
    localStorage.setItem("customDishes", JSON.stringify(newList));
    setDishes(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.available || !form.image) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    if (editingDish) {
      const updated = dishes.map((d) =>
        d.id === editingDish.id ? { ...form, id: d.id } : d
      );
      saveToLocalStorage(updated);
      setEditingDish(null);
    } else {
      const newDish = { ...form, id: Date.now() };
      saveToLocalStorage([...dishes, newDish]);
    }

    setForm({
      name: "",
      price: "",
      available: "",
      category: activeCategory,
      image: "",
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu taomni o‘chirmoqchimisiz?")) {
      const updated = dishes.filter((d) => d.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setForm(dish);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingDish(null);
    setForm({
      name: "",
      price: "",
      available: "",
      category: activeCategory,
      image: "",
    });
    setShowModal(true);
  };

  const categories = [
    "Hot Dishes",
    "Cold Dishes",
    "Soup",
    "Grill",
    "Appetizer",
    "Dessert",
  ];

  const filteredDishes = dishes.filter((d) => d.category === activeCategory);

  const sections = [
    { title: "Appereance", subtitle: "Dark and Light mode, Font size", icon: "🎨" },
    { title: "Your Restaurant", subtitle: "Setup name, address, etc", icon: "🏠" },
    { title: "Products Management", subtitle: "Manage your product, pricing, etc", icon: "🍽️" },
    { title: "Notifications", subtitle: "Customize your notifications", icon: "🔔" },
    { title: "Security", subtitle: "Configure Password, PIN, etc", icon: "🔐" },
    { title: "About Us", subtitle: "Find out more about Posly", icon: "ℹ️" },
  ];

  return (
    <div className="bg-[#252836] min-h-screen flex text-white font-sans">
      <div className="w-80 bg-[#252836] border-r border-orange-900/40 p-6 shadow-lg shadow-black/50">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text mb-10 tracking-wide">
          ⚙️ Settings
        </h1>

        <div className="space-y-3">
          {sections.map((sec) => (
            <div
              key={sec.title}
              onClick={() => setActiveSection(sec.title)}
              className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                activeSection === sec.title
                  ? "bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-md shadow-orange-500/40"
                  : "bg-[#14100d] hover:bg-[#1f1612] text-gray-300"
              }`}
            >
              <div className="text-2xl">{sec.icon}</div>
              <div>
                <p className="font-semibold">{sec.title}</p>
                <p className="text-xs text-gray-400">{sec.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-10 bg-gradient-to-br from-[#12100e] via-[#1a1410] to-[#1f1611]">
        {activeSection === "Products Management" ? (
          <div className="rounded-3xl border border-orange-700/30 bg-[#252836]/80 shadow-lg shadow-black/60 p-10 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-orange-400">
                  🍽 Products Management
                </h2>
                <p className="text-gray-400">
                  Manage your restaurant’s menu items below
                </p>
              </div>
              <button className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-all">
                Manage Categories
              </button>
            </div>

            <div className="flex gap-3 mb-8 bg-[#252836] p-2 rounded-2xl border border-orange-900/20">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-md shadow-orange-500/40"
                      : "text-gray-400 hover:text-white hover:bg-orange-500/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                onClick={openAddModal}
                className="group border-2 border-dashed border-orange-800/40 hover:border-orange-500 cursor-pointer rounded-3xl p-10 flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center mb-4 text-4xl font-light">
                  +
                </div>
                <p className="font-semibold group-hover:text-orange-400 transition">
                  Add New Dish
                </p>
              </div>

              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="relative bg-[#252836] rounded-3xl p-6 text-center border border-orange-900/20 hover:border-orange-500/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                >
                  <button
                    onClick={() => handleDelete(dish.id)}
                    className="absolute top-3 right-3 bg-red-500/20 hover:bg-red-500/40 rounded-full p-1 transition"
                  >
                    ❌
                  </button>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-28 h-28 object-cover rounded-full border-4 border-[#2B1C10] mx-auto mb-4"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/150/FF7E33/fff?text=No+Image")
                    }
                  />
                  <h3 className="font-bold text-lg">{dish.name}</h3>
                  <p className="text-orange-400 font-semibold text-xl mt-1">
                    {dish.price}
                  </p>
                  <p className="text-gray-500">{dish.available}</p>
                  <button
                    onClick={() => handleEdit(dish)}
                    className="mt-4 bg-gradient-to-r from-orange-600 to-orange-400 px-5 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-all hover:shadow-md hover:shadow-orange-500/30"
                  >
                    ✏️ Edit Dish
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-xl mt-20 text-center">
            ⚙️ Select a section from the sidebar to view settings.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1410] p-8 rounded-2xl w-[400px] border border-orange-800/40 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-orange-400 text-center">
              {editingDish ? "Edit Dish" : "Add New Dish"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Dish Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#120e0b] border border-orange-800/40 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#120e0b] border border-orange-800/40 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Availability (e.g. Available)"
                value={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#120e0b] border border-orange-800/40 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#120e0b] border border-orange-800/40 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-orange-400 px-6 py-2 rounded-lg font-semibold hover:scale-105 shadow-md hover:shadow-orange-500/40 transition-all"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
