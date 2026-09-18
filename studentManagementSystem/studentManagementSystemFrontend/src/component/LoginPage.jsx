import React, { useState, useEffect } from 'react';

export default function AuthForm() {
  // यह स्टेट तय करेगी कि लॉगिन स्क्रीन दिखेगी या रजिस्ट्रेशन स्क्रीन
  const [isActive, setIsActive] = useState(false);

  // Boxicons और Poppins Font को तुरंत और सही तरीके से लोड करने के लिए
  useEffect(() => {
    // 1. Boxicons CSS को सीधे HTML Head में इंजेक्ट करना
    const linkExist = document.getElementById('boxicons-cdn');
    if (!linkExist) {
      const link = document.createElement('link');
      link.id = 'boxicons-cdn';
      link.rel = 'stylesheet';
      link.href = 'https://jsdelivr.net';
      document.head.appendChild(link);
    }

    // 2. Poppins Font को सीधे HTML Head में इंजेक्ट करना
    const fontExist = document.getElementById('poppins-cdn');
    if (!fontExist) {
      const fontLink = document.createElement('link');
      fontLink.id = 'poppins-cdn';
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://googleapis.com';
      document.head.appendChild(fontLink);
    }
  }, []);

  return (
    // मुख्य बैकग्राउंड कंटेनर
    <div 
      className="min-h-screen flex justify-center items-center bg-[#eef3fa] p-4 sm:p-6 md:p-10 select-none"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* मुख्य सफ़ेद कार्ड बॉक्स - जो मोबाइल और डेस्कटॉप दोनों पर सही साइज में रहेगा */}
      <div className="relative w-full max-w-[450px] md:max-w-[850px] h-auto min-h-[550px] md:h-[520px] bg-white rounded-2xl md:rounded-[30px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.15)] flex flex-col md:block">
        {/* ================= LOGIN FORM ================= */}
        <div 
          className={`absolute top-0 right-0 w-full md:w-1/2 h-full flex items-center justify-center p-8 sm:p-10 bg-white text-center transition-all duration-700 ease-in-out z-20
            ${isActive 
              ? 'opacity-0 pointer-events-none md:-translate-x-full md:opacity-0' 
              : 'opacity-100 pointer-events-auto md:translate-x-0'
            }`}
        >
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-[#333] text-2xl sm:text-3xl md:text-[34px] font-bold mb-4 md:mb-6">Login</h1>

            <div className="relative w-full my-4">
              <input 
                type="text" 
                placeholder="Username" 
                required 
                className="w-full h-11 border-none outline-none rounded-lg bg-[#eeeeee] pl-4 pr-11 text-sm text-[#333] placeholder-[#999] focus:ring-2 focus:ring-[#6d8edb]/50"
              />
              <i className="bx bxs-user absolute right-4 top-1/2 -translate-y-1/2 text-[#333] text-lg z-30"></i>
            </div>

            <div className="relative w-full my-4">
              <input 
                type="password" 
                placeholder="Password" 
                required 
                className="w-full h-11 border-none outline-none rounded-lg bg-[#eeeeee] pl-4 pr-11 text-sm text-[#333] placeholder-[#999] focus:ring-2 focus:ring-[#6d8edb]/50"
              />
              <i className="bx bxs-lock-alt absolute right-4 top-1/2 -translate-y-1/2 text-[#333] text-lg z-30"></i>
            </div>

            <div className="text-right -mt-2 mb-4">
              <a href="#" className="text-[#555] text-xs no-underline hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full h-10 border-none rounded-lg bg-[#6d8edb] text-white text-sm font-semibold cursor-pointer transition duration-300 hover:bg-[#5d80d2] active:scale-[0.98]">
              Login
            </button>

            <p className="text-[#555] text-xs my-4">or login with social platforms</p>

            <div className="flex justify-center gap-3">
              {['google', 'facebook', 'github', 'linkedin'].map((platform) => (
                <a key={platform} href="#" className="w-10 h-10 flex justify-center items-center border border-[#ccc] rounded-lg text-[#333] no-underline text-xl transition duration-300 hover:bg-[#6d8edb] hover:text-white hover:border-[#6d8edb] z-30">
                  <i className={`bx bxl-${platform}`}></i>
                </a>
              ))}
            </div>

            {/* मोबाइल व्यू के लिए बटन */}
            <p className="md:hidden text-sm text-[#555] mt-6">
              Don't have an account?{' '}
              <button type="button" onClick={() => setIsActive(true)} className="text-[#6d8edb] font-semibold underline">Register</button>
            </p>
          </form>
        </div>

        {/* ================= REGISTRATION FORM ================= */}
        <div 
          className={`absolute top-0 right-0 w-full md:w-1/2 h-full flex items-center justify-center p-8 sm:p-10 bg-white text-center transition-all duration-700 ease-in-out z-20
            ${isActive 
              ? 'opacity-100 pointer-events-auto md:-translate-x-full' 
              : 'opacity-0 pointer-events-none md:translate-x-0 md:opacity-0'
            }`}
        >
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-[#333] text-2xl sm:text-3xl md:text-[34px] font-bold mb-4 md:mb-6">Registration</h1>

            <div className="relative w-full my-4">
              <input 
                type="text" 
                placeholder="Username" 
                required 
                className="w-full h-11 border-none outline-none rounded-lg bg-[#eeeeee] pl-4 pr-11 text-sm text-[#333] placeholder-[#999] focus:ring-2 focus:ring-[#6d8edb]/50"
              />
              <i className="bx bxs-user absolute right-4 top-1/2 -translate-y-1/2 text-[#333] text-lg z-30"></i>
            </div>

            <div className="relative w-full my-4">
              <input 
                type="email" 
                placeholder="Email" 
                required 
                className="w-full h-11 border-none outline-none rounded-lg bg-[#eeeeee] pl-4 pr-11 text-sm text-[#333] placeholder-[#999] focus:ring-2 focus:ring-[#6d8edb]/50"
              />
              <i className="bx bxs-envelope absolute right-4 top-1/2 -translate-y-1/2 text-[#333] text-lg z-30"></i>
            </div>

            <div className="relative w-full my-4">
              <input 
                type="password" 
                placeholder="Password" 
                required 
                className="w-full h-11 border-none outline-none rounded-lg bg-[#eeeeee] pl-4 pr-11 text-sm text-[#333] placeholder-[#999] focus:ring-2 focus:ring-[#6d8edb]/50"
              />
              <i className="bx bxs-lock-alt absolute right-4 top-1/2 -translate-y-1/2 text-[#333] text-lg z-30"></i>
            </div>

            <button type="submit" className="w-full h-10 border-none rounded-lg bg-[#6d8edb] text-white text-sm font-semibold cursor-pointer transition duration-300 hover:bg-[#5d80d2] active:scale-[0.98]">
              Register
            </button>

            <p className="text-[#555] text-xs my-4">or register with social platforms</p>

            <div className="flex justify-center gap-3">
              {['google', 'facebook', 'github', 'linkedin'].map((platform) => (
                <a key={platform} href="#" className="w-10 h-10 flex justify-center items-center border border-[#ccc] rounded-lg text-[#333] no-underline text-xl transition duration-300 hover:bg-[#6d8edb] hover:text-white hover:border-[#6d8edb] z-30">
                  <i className={`bx bxl-${platform}`}></i>
                </a>
              ))}
            </div>

            {/* मोबाइल व्यू के लिए बटन */}
            <p className="md:hidden text-sm text-[#555] mt-6">
              Already have an account?{' '}
              <button type="button" onClick={() => setIsActive(false)} className="text-[#6d8edb] font-semibold underline">Login</button>
            </p>
          </form>
        </div>
        {/* ================= TOGGLE PANEL (डेस्कटॉप स्लाइडिंग पैनल) ================= */}
        <div className="absolute inset-0 w-full h-full z-30 pointer-events-none hidden md:block">
          
          {/* Left Panel (लॉगिन के समय बाईं तरफ रहेगा) */}
          <div 
            className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center p-8 bg-[#6d8edb] text-white text-center rounded-[30px_100px_100px_30px] transition-all duration-700 ease-in-out
              ${isActive 
                ? 'translate-x-full rounded-[100px_30px_30px_100px] opacity-0 pointer-events-none' 
                : 'translate-x-0 pointer-events-auto opacity-100'
              }`}
          >
            <h1 className="text-3xl font-bold mb-3">Hello, Welcome!</h1>
            <p className="text-sm mb-6">Don't have an account?</p>
            <button 
              className="w-full max-w-[160px] h-10 border-2 border-white rounded-lg bg-transparent text-white text-sm font-semibold cursor-pointer transition duration-300 hover:bg-white hover:text-[#6d8edb] active:scale-95"
              onClick={() => setIsActive(true)}
            >
              Register
            </button>
          </div>

          {/* Right Panel (रजिस्टर दबाने पर दाईं तरफ एक्टिव होगा) */}
          <div 
            className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center p-8 bg-[#6d8edb] text-white text-center rounded-[100px_30px_30px_100px] transition-all duration-700 ease-in-out
              ${isActive 
                ? 'translate-x-full pointer-events-auto opacity-100' 
                : 'translate-x-0 opacity-0 pointer-events-none'
              }`}
          >
            <h1 className="text-3xl font-bold mb-3">Welcome Back!</h1>
            <p className="text-sm mb-6">Already have an account?</p>
            <button 
              className="w-full max-w-[160px] h-10 border-2 border-white rounded-lg bg-transparent text-white text-sm font-semibold cursor-pointer transition duration-300 hover:bg-white hover:text-[#6d8edb] active:scale-95"
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>

        </div>

      </div> {/* मुख्य कार्ड बॉक्स बंद */}
    </div> 
  );
}
