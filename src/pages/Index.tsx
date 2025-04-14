
import React from "react";
import { useTaxData } from "@/context/TaxDataContext";
import ProgressWizard from "@/components/ProgressWizard";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import IncomeForm from "@/components/IncomeForm";
import ExpensesForm from "@/components/ExpensesForm";
import ReasonableSalaryForm from "@/components/ReasonableSalaryForm";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const { currentStep, isSubmitted } = useTaxData();

  // If form is submitted, redirect to success page
  if (isSubmitted) {
    return <Navigate to="/success" />;
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <IncomeForm />;
      case 3:
        return <ExpensesForm />;
      case 4:
        return <ReasonableSalaryForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50 py-10 px-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed top-20 right-[10%] w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="fixed top-40 left-[15%] w-36 h-36 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="fixed bottom-20 right-[20%] w-28 h-28 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-2">
            S-Corp Tax Wizard
          </h1>
          <motion.p 
            className="text-gray-600 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Complete your S-Corporation tax filing in just a few simple steps
          </motion.p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ProgressWizard />
        </motion.div>

        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {renderCurrentStep()}
        </motion.div>

        <motion.footer 
          className="mt-12 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Tax Flow Wizard • All rights reserved</p>
          <p className="mt-1">Your data is encrypted and secure</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
