
import React from "react";
import { useTaxData } from "@/context/TaxDataContext";
import { motion } from "framer-motion";
import { Check, User, DollarSign, Receipt, Briefcase } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StepProps {
  step: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ step, title, isActive, isCompleted, onClick, icon }) => {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <motion.div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold transition-all shadow-md ${
          isActive
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-110"
            : isCompleted
            ? "bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer hover:scale-105"
            : "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed"
        }`}
        whileHover={isCompleted || isActive ? { scale: 1.1 } : {}}
        whileTap={isCompleted || isActive ? { scale: 0.95 } : {}}
        initial={isActive ? { scale: 0.9 } : { scale: 1 }}
        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isCompleted ? (
          <Check className="h-7 w-7" />
        ) : (
          <div>{icon}</div>
        )}
        
        {isActive && (
          <motion.div 
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: ["0 0 0 0 rgba(129, 140, 248, 0)", "0 0 0 10px rgba(129, 140, 248, 0)"]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
      <span
        className={`mt-2 text-xs sm:text-sm text-center transition-colors ${
          isActive ? "font-bold text-purple-700" : isCompleted ? "text-emerald-600" : "text-gray-500"
        }`}
      >
        {title}
      </span>
    </div>
  );
};

const ProgressWizard: React.FC = () => {
  const { currentStep, setCurrentStep } = useTaxData();

  const steps = [
    { step: 1, title: "Personal Info", icon: <User className="h-6 w-6" /> },
    { step: 2, title: "Income", icon: <DollarSign className="h-6 w-6" /> },
    { step: 3, title: "Expenses", icon: <Receipt className="h-6 w-6" /> },
    { step: 4, title: "Reasonable Salary", icon: <Briefcase className="h-6 w-6" /> },
  ];

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative pb-12">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-indigo-600">Progress</span>
            <span className="text-sm font-medium text-indigo-600">{Math.round(progressPercentage)}%</span>
          </div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
          <div className="h-2 bg-gray-200 rounded-full -mt-2" />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between items-start">
          {/* Progress bar background */}
          <div className="absolute left-0 right-0 h-1 bg-gray-200 top-7 z-0"></div>
          
          {/* Active progress bar */}
          <motion.div
            className="absolute left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 top-7 z-10 rounded-r-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>

          {/* Steps */}
          {steps.map((step) => (
            <Step
              key={step.step}
              step={step.step}
              title={step.title}
              icon={step.icon}
              isActive={currentStep === step.step}
              isCompleted={currentStep > step.step}
              onClick={() => handleStepClick(step.step)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressWizard;
