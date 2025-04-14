
import React, { useEffect } from "react";
import { useTaxData } from "@/context/TaxDataContext";
import ProgressWizard from "@/components/ProgressWizard";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import IncomeForm from "@/components/IncomeForm";
import ExpensesForm from "@/components/ExpensesForm";
import ReasonableSalaryForm from "@/components/ReasonableSalaryForm";
import SuccessPage from "@/components/SuccessPage";
import { Navigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-tax-dark mb-2">
            S-Corp Tax Wizard
          </h1>
          <p className="text-gray-600">
            Complete your S-Corporation tax filing in just a few simple steps
          </p>
        </header>

        <ProgressWizard />

        <div className="mt-8">
          {renderCurrentStep()}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Tax Flow Wizard • All rights reserved</p>
          <p className="mt-1">Your data is encrypted and secure</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
