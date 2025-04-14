
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles, PartyPopper, Stars } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ConfettiPiece = ({ delay }: { delay: number }) => {
  const colors = ["#FF5E5B", "#D65DB1", "#845EC2", "#FFC75F", "#F9F871", "#00C2A8"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomLeft = `${Math.random() * 100}%`;
  const randomScale = 0.5 + Math.random() * 0.5;

  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{ 
        backgroundColor: randomColor, 
        left: randomLeft,
        top: "-20px"
      }}
      initial={{ y: -20, opacity: 0, scale: randomScale }}
      animate={{
        y: ["0%", "1000%"],
        opacity: [0, 1, 1, 0],
        rotate: [0, 360],
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
      {[...Array(20)].map((_, i) => (
        <ConfettiPiece key={i} delay={i * 0.1} />
      ))}
    </div>
  );
};

const SuccessPage: React.FC = () => {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStars(true), 500);
    return () => clearTimeout(timer);
  }, []);

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
        <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="text-center bg-gradient-to-r from-purple-500 via-tax-primary to-violet-500 text-white rounded-t-lg p-8">
            <motion.div 
              className="flex justify-center mb-4"
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
                <CheckCircle className="h-20 w-20 text-white" />
                {showStars && (
                  <>
                    <motion.div 
                      className="absolute -top-2 -right-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Sparkles className="h-6 w-6 text-yellow-300" />
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-2 -left-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <Stars className="h-6 w-6 text-yellow-300" />
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
          
          <CardContent className="pt-8 pb-8 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl mb-6 text-tax-dark font-medium">
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
                asChild
                className="bg-gradient-to-r from-tax-primary via-blue-400 to-tax-primary hover:from-blue-500 hover:to-blue-600 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Link to="/" className="flex items-center gap-2">
                  <PartyPopper className="h-5 w-5" />
                  Return Home
                </Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
