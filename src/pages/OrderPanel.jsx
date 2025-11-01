import React, { useState } from "react";
import { Trash2, MapPin, CreditCard, Wallet, Banknote, CheckCircle } from "lucide-react";
import { useMessages } from "../context/MessageContext";
import { useNotifications } from "../context/NotificationContext"; 

export default function OrderPanel({ cart, setCart }) {
  const [dineOption, setDineOption] = useState("Dine In");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const { addMessage } = useMessages();
  const { addNotification } = useNotifications(); 

  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    date: "",
    cvv: "",
  });
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRemoveOne = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.qty,
    0
  );

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (/^[A-Za-z\s]*$/.test(value)) setCardInfo({ ...cardInfo, name: value });
    } else if (name === "number") {
      if (/^[0-9\s]*$/.test(value) && value.length <= 19) {
        let formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
        setCardInfo({ ...cardInfo, number: formatted });
      }
    } else if (name === "date") {
      if (/^[0-9/]*$/.test(value) && value.length <= 5) {
        let formatted = value
          .replace(/\D/g, "")
          .replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        setCardInfo({ ...cardInfo, date: formatted });
      }
    } else if (name === "cvv") {
      if (/^[0-9]*$/.test(value) && value.length <= 3)
        setCardInfo({ ...cardInfo, cvv: value });
    }
  };

  const handleContinue = () => {
    if (cart.length === 0) {
      alert("Avval savatchaga mahsulot qo'shing 🍜");
      return;
    }
    setShowPayment(true);
  };

  const handleConfirmPayment = () => {
    if (dineOption === "Delivery" && !location) {
      alert("Iltimos, manzilingizni kiriting 📍");
      return;
    }

    addNotification(
      "Yangi buyurtma",
      `${dineOption} uchun to‘lov qabul qilindi. Umumiy summa: $${total.toFixed(2)}`
    );

    setTimeout(() => {
      setShowPayment(false);
      setSuccess(true);
      setCart([]);
      setTimeout(() => setSuccess(false), 4000);
    }, 1000);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Sizning brauzeringiz lokatsiyani qo'llab-quvvatlamaydi");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
      },
      () => alert("Lokatsiyani olishda xatolik yuz berdi 😔")
    );
  };

  const paymentMethods = [
    { name: "Credit Card", icon: CreditCard },
    { name: "Paypal", icon: Wallet },
    { name: "Cash", icon: Banknote }
  ];

  return (
    <div className="h-full bg-[#1F1D2B] p-6 flex flex-col relative overflow-hidden">

      <div className="absolute top-0 right-0 w-64 h-64 bg-[#EA7C69]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#EA7C69]/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Orders #34536
            </h2>
            <p className="text-sm text-gray-500 mt-1">Buyurtmalaringizni boshqaring</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 bg-[#252836] backdrop-blur-sm p-1.5 rounded-xl border border-[#393C49]">
          {["Dine In", "To Go", "Delivery"].map((option) => (
            <button
              key={option}
              onClick={() => setDineOption(option)}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${dineOption === option
                  ? "bg-[#EA7C69] text-white shadow-lg shadow-[#EA7C69]/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-gray-500 text-xs font-medium mb-4 px-2">
          <span className="w-1/2">Mahsulot</span>
          <span className="w-1/4 text-center">Soni</span>
          <span className="w-1/4 text-right">Narxi</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700/20 to-gray-800/20 flex items-center justify-center mb-3">
                <span className="text-4xl">🛒</span>
              </div>
              <p className="text-gray-500 text-sm">Savatcha bo'sh</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-[#252836] to-[#1F1D2B] rounded-2xl p-4 border border-[#393C49] hover:border-[#EA7C69]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#EA7C69]/20"
                style={{ animation: `slideIn 0.3s ease-out ${idx * 0.1}s both` }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3 w-1/2">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#EA7C69]/30"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#EA7C69] rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg shadow-[#EA7C69]/50">
                        {item.qty}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-[#EA7C69]/20 to-[#EA7C69]/10 px-4 py-2 rounded-lg border border-[#EA7C69]/30">
                      <span className="text-sm font-bold text-[#EA7C69]">
                        ${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveOne(item.id)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-all duration-200 group"
                    >
                      <Trash2 size={16} className="text-red-400 group-hover:text-red-300" />
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Izoh qoldiring..."
                  className="w-full bg-[#252836] backdrop-blur-sm text-xs rounded-lg px-3 py-2 outline-none text-gray-300 placeholder-gray-600 border border-[#393C49] focus:border-[#EA7C69]/50 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                      addMessage(`${item.name} — ${item.price}: ${e.target.value}`);
                      e.target.value = "";
                      alert("✅ Izoh yuborildi! 'Message' bo‘limidan ko‘rishingiz mumkin.");
                    }
                  }}
                />

              </div>
            ))
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-[#393C49]">
          <div className="bg-gradient-to-br from-[#252836] to-[#1F1D2B] rounded-2xl p-4 mb-4 border border-[#393C49]">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-400">Chegirma</span>
              <span className="text-gray-300">$0.00</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#393C49]">
              <span className="text-lg font-semibold text-white">Jami</span>
              <span className="text-2xl font-bold text-[#EA7C69]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-[#EA7C69] hover:bg-[#e86a55] text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-[#EA7C69]/30 hover:shadow-xl hover:shadow-[#EA7C69]/40 active:scale-95"
          >
            To'lovga o'tish
          </button>
        </div>
      </div>

      {showPayment && (
        <div className="absolute inset-0 bg-[#1F1D2B] p-6 rounded-lg flex flex-col z-20 animate-slideUp">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Payment
              </h2>
              <p className="text-sm text-gray-500 mt-1">3 ta to'lov usuli mavjud</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-400 mb-3 block">To'lov usuli</label>
            <div className="grid grid-cols-3 gap-3 bg-[#252836] backdrop-blur-sm p-1.5 rounded-xl border border-[#393C49]">
              {paymentMethods.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => setPaymentMethod(name)}
                  className={`flex flex-col items-center gap-2 px-3 py-4 rounded-lg transition-all duration-300 ${paymentMethod === name
                      ? "bg-[#EA7C69] text-white shadow-lg shadow-[#EA7C69]/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-medium">{name}</span>
                </button>
              ))}
            </div>
          </div>

          {dineOption === "Delivery" && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-400 mb-2 block">
                Yetkazib berish manzili
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Manzilingizni kiriting"
                  className="flex-1 bg-[#252836] backdrop-blur-sm px-4 py-3 rounded-xl text-sm text-gray-200 outline-none placeholder-gray-600 border border-[#393C49] focus:border-[#EA7C69]/50 transition-all"
                />
                <button
                  onClick={handleGetLocation}
                  className="bg-[#EA7C69] hover:bg-[#e86a55] px-4 rounded-xl text-white flex items-center gap-2 font-medium shadow-lg shadow-[#EA7C69]/30 transition-all"
                >
                  <MapPin size={18} />
                </button>
              </div>
            </div>
          )}

          {paymentMethod === "Credit Card" && (
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Karta egasi</label>
                <input
                  type="text"
                  name="name"
                  value={cardInfo.name}
                  onChange={handleCardChange}
                  placeholder="Levi Ackerman"
                  className="w-full bg-[#252836] backdrop-blur-sm px-4 py-3 rounded-xl text-sm text-gray-200 outline-none placeholder-gray-600 border border-[#393C49] focus:border-[#EA7C69]/50 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Karta raqami</label>
                <input
                  type="text"
                  name="number"
                  value={cardInfo.number}
                  onChange={handleCardChange}
                  placeholder="2564 1421 0897 1244"
                  className="w-full bg-[#1F1D2B]/60 backdrop-blur-sm px-4 py-3 rounded-xl text-sm text-gray-200 outline-none placeholder-gray-600 border border-orange-500/20 focus:border-orange-500/40 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Amal qilish muddati</label>
                  <input
                    type="text"
                    name="date"
                    value={cardInfo.date}
                    onChange={handleCardChange}
                    placeholder="02/2025"
                    className="w-full bg-[#1F1D2B]/60 backdrop-blur-sm px-4 py-3 rounded-xl text-sm text-gray-200 outline-none placeholder-gray-600 border border-orange-500/20 focus:border-orange-500/40 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={cardInfo.cvv}
                    onChange={handleCardChange}
                    placeholder="•••"
                    className="w-full bg-[#1F1D2B]/60 backdrop-blur-sm px-4 py-3 rounded-xl text-sm text-gray-200 outline-none placeholder-gray-600 border border-orange-500/20 focus:border-orange-500/40 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Buyurtma turi</label>
              <div className="bg-[#252836] backdrop-blur-sm px-4 py-3 rounded-xl text-sm text-gray-200 border border-[#393C49]">
                {dineOption}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Stol raqami</label>
              <div className="bg-[#1F1D2B]/60 backdrop-blur-sm px-4 py-3 rounded-xl text-sm text-gray-200 border border-orange-500/20">
                140
              </div>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowPayment(false)}
              className="bg-[#252836] backdrop-blur-sm hover:bg-[#2D303E] text-gray-300 py-3.5 rounded-xl font-semibold border border-[#393C49] transition-all active:scale-95"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleConfirmPayment}
              className="bg-[#EA7C69] hover:bg-[#e86a55] text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-[#EA7C69]/30 hover:shadow-xl hover:shadow-[#EA7C69]/40 active:scale-95"
            >
              Tasdiqlash
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="absolute inset-0 bg-[#1F1D2B]/95 backdrop-blur-md flex items-center justify-center text-center p-6 z-30 animate-fadeIn">
          <div className="bg-gradient-to-br from-[#252836] to-[#1F1D2B] rounded-3xl p-8 border border-[#393C49] shadow-2xl max-w-sm">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-bounce shadow-lg shadow-green-500/50">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
              Buyurtma qabul qilindi!
            </h2>
            {dineOption === "Delivery" ? (
              <p className="text-gray-400 leading-relaxed">
                Zakazingiz <span className="text-[#EA7C69] font-semibold">10–15 daqiqada</span> manzilingizga yetkaziladi 🛵
              </p>
            ) : (
              <p className="text-gray-400 leading-relaxed">
                Sizning to'lovingiz <span className="text-[#EA7C69] font-semibold">muvaffaqiyatli</span> amalga oshirildi 💳
              </p>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
