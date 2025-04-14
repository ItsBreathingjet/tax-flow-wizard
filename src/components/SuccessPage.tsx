
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles, PartyPopper, Stars, Award, Gift } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTaxData } from "@/context/TaxDataContext";

const ConfettiPiece = ({ delay }: { delay: number }) => {
  const colors = ["#FF5E5B", "#D65DB1", "#845EC2", "#FFC75F", "#F9F871", "#00C2A8", "#4FC1E9", "#B88DFF"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomLeft = `${Math.random() * 100}%`;
  const randomScale = 0.5 + Math.random() * 0.5;
  const randomRotation = Math.random() * 360;

  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{ 
        backgroundColor: randomColor, 
        left: randomLeft,
        top: "-20px",
        boxShadow: `0 0 10px ${randomColor}80`
      }}
      initial={{ y: -20, opacity: 0, scale: randomScale, rotate: randomRotation }}
      animate={{
        y: ["0%", "1000%"],
        opacity: [0, 1, 1, 0],
        rotate: [randomRotation, randomRotation + 360],
      }}
      transition={{ 
        duration: 4 + Math.random() * 2,
        delay: delay,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 3
      }}
    />
  );
};

const Confetti = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <ConfettiPiece key={i} delay={i * 0.1} />
      ))}
    </div>
  );
};

const FloatingElement = ({ children, delay, x }: { children: React.ReactNode, delay: number, x: number }) => {
  return (
    <motion.div
      className="absolute"
      style={{ x }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [0, -15, 0], 
        opacity: 1,
        rotate: [-5, 5, -5]
      }}
      transition={{ 
        y: { repeat: Infinity, duration: 3, delay },
        opacity: { duration: 0.5, delay },
        rotate: { repeat: Infinity, duration: 7, delay: delay + 0.5 }
      }}
    >
      {children}
    </motion.div>
  );
};

const SuccessPage: React.FC = () => {
  const [showStars, setShowStars] = useState(false);
  const navigate = useNavigate();
  const { setCurrentStep, setIsSubmitted } = useTaxData();
  
  useEffect(() => {
    const timer = setTimeout(() => setShowStars(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Function to handle returning to the beginning
  const handleReturnHome = () => {
    setCurrentStep(1); // Reset to the first step
    setIsSubmitted(false); // Reset the submitted state
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mt-8">
      <Confetti />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2
        }}
      >
        <Card className="overflow-hidden border-0 shadow-2xl bg-white">
          <CardHeader className="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-lg p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjxwYXRoIGQ9Ik0xNiAyNGMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTR6Ii8+PHBhdGggZD0iTTM0IDE0YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            
            <FloatingElement delay={1.5} x={-80}>
              <Stars className="h-8 w-8 text-yellow-300 opacity-80" />
            </FloatingElement>
            <FloatingElement delay={2.2} x={80}>
              <Gift className="h-6 w-6 text-pink-300 opacity-80" />
            </FloatingElement>
            
            <motion.div 
              className="flex justify-center mb-4 relative"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, 0] }}
                  transition={{ 
                    scale: { duration: 0.5, delay: 0.3 },
                    rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                  }}
                >
                  <div className="relative">
                    <CheckCircle className="h-24 w-24 text-white drop-shadow-lg" />
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: 1
                      }}
                    >
                      <CheckCircle className="h-24 w-24 text-white blur-sm" />
                    </motion.div>
                  </div>
                </motion.div>
                
                {showStars && (
                  <>
                    <motion.div 
                      className="absolute -top-4 -right-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Sparkles className="h-8 w-8 text-yellow-300" />
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-4 -left-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <Stars className="h-8 w-8 text-yellow-300" />
                    </motion.div>
                    <motion.div 
                      className="absolute -right-2 bottom-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Award className="h-7 w-7 text-pink-300" />
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-4xl font-bold">Success!</CardTitle>
            </motion.div>
          </CardHeader>
          
          <CardContent className="pt-8 pb-8 text-center bg-gradient-to-b from-white to-purple-50">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl mb-6 text-purple-900 font-medium">
                Your tax information has been successfully submitted!
              </p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-gray-600 mb-8">
                A confirmation has been sent to your email address. Our team will review 
                your information and contact you if any additional details are needed.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                onClick={handleReturnHome}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <PartyPopper className="h-5 w-5" />
                  Return Home
                </div>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuccessPage;

