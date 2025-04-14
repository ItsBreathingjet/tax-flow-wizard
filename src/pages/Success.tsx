
import React from "react";
import SuccessPage from "@/components/SuccessPage";

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 overflow-hidden">
      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="fixed top-40 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="fixed bottom-20 left-1/4 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <SuccessPage />
    </div>
  );
};

export default Success;
