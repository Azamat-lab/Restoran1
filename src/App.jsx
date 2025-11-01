
  import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import OrderPanel from "./pages/OrderPanel";

export default function App() {
  const [cart, setCart] = useState([]);
  const [dishes, setDishes] = useState([]); 
  const location = useLocation();

  const handleAddToCart = (dish) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === dish.id);
      if (existing) {
        return prev.map((p) =>
          p.id === dish.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...dish, qty: 1 }];
      }
    });
  };

  const handleAddDish = (newDish) => {
    setDishes((prev) => [...prev, newDish]);
  };

  const handleEditDish = (updatedDish) => {
    setDishes((prev) =>
      prev.map((dish) =>
        dish.id === updatedDish.id ? updatedDish : dish
      )
    );
  };

  const isHome = location.pathname === "/";

  return (
    <div className="flex bg-[#1F1D2B] text-white h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto ml-[90px]">
        <Outlet context={{ handleAddToCart, handleAddDish, handleEditDish, dishes }} />
      </div>

      {isHome && (
        <div className="w-[380px] border-l border-[#2D303E]">
          <OrderPanel cart={cart} setCart={setCart} />
        </div>
      )}
    </div>
  );
}
