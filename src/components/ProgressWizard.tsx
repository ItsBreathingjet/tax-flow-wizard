
import React from "react";
import { useTaxData } from "@/context/TaxDataContext";

interface StepProps {
  step: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const Step: React.FC<StepProps> = ({ step, title, isActive, isCompleted, onClick }) => {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all ${
          isActive
            ? "bg-tax-primary scale-110 shadow-md"
            : isCompleted
            ? "bg-tax-secondary cursor-pointer hover:scale-105"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {step}
      </div>
      <span
        className={`mt-2 text-xs sm:text-sm text-center transition-colors ${
          isActive ? "font-bold text-tax-primary" : isCompleted ? "text-tax-secondary" : "text-gray-500"
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
    { step: 1, title: "Personal Info" },
    { step: 2, title: "Income" },
    { step: 3, title: "Expenses" },
    { step: 4, title: "Reasonable Salary" },
  ];

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex justify-between items-center">
        {/* Progress bar background */}
        <div className="absolute left-0 right-0 h-1 bg-gray-200 top-5 z-0"></div>
        
        {/* Active progress bar */}
        <div
          className="absolute left-0 h-1 bg-tax-primary top-5 z-10 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {/* Steps */}
        {steps.map((step) => (
          <Step
            key={step.step}
            step={step.step}
            title={step.title}
            isActive={currentStep === step.step}
            isCompleted={currentStep > step.step}
            onClick={() => handleStepClick(step.step)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressWizard;
