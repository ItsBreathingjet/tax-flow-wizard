
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  ssn: string;
}

export interface IncomeInfo {
  personalIncome: {
    wages: number;
    interest: number;
    dividends: number;
    capitalGains: number;
    otherIncome: number;
  };
  sCorpIncome: {
    revenue: number;
    costOfGoods: number;
    grossProfit: number;
  };
}

export interface ExpensesInfo {
  generalExpenses: {
    rent: number;
    utilities: number;
    insurance: number;
    marketing: number;
    travel: number;
    supplies: number;
    professionalFees: number;
    other: number;
  };
  ownerWithdrawals: number;
  distributionFunds: number;
}

export interface ReasonableSalary {
  amount: number;
}

interface TaxDataContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  incomeInfo: IncomeInfo;
  setIncomeInfo: React.Dispatch<React.SetStateAction<IncomeInfo>>;
  expensesInfo: ExpensesInfo;
  setExpensesInfo: React.Dispatch<React.SetStateAction<ExpensesInfo>>;
  reasonableSalary: ReasonableSalary;
  setReasonableSalary: React.Dispatch<React.SetStateAction<ReasonableSalary>>;
  isSubmitted: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  ssn: '',
};

const defaultIncomeInfo: IncomeInfo = {
  personalIncome: {
    wages: 0,
    interest: 0,
    dividends: 0,
    capitalGains: 0,
    otherIncome: 0,
  },
  sCorpIncome: {
    revenue: 0,
    costOfGoods: 0,
    grossProfit: 0,
  }
};

const defaultExpensesInfo: ExpensesInfo = {
  generalExpenses: {
    rent: 0,
    utilities: 0,
    insurance: 0,
    marketing: 0,
    travel: 0,
    supplies: 0,
    professionalFees: 0,
    other: 0,
  },
  ownerWithdrawals: 0,
  distributionFunds: 0,
};

const defaultReasonableSalary: ReasonableSalary = {
  amount: 0,
};

export const TaxDataContext = createContext<TaxDataContextType | undefined>(undefined);

export const TaxDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo);
  const [incomeInfo, setIncomeInfo] = useState<IncomeInfo>(defaultIncomeInfo);
  const [expensesInfo, setExpensesInfo] = useState<ExpensesInfo>(defaultExpensesInfo);
  const [reasonableSalary, setReasonableSalary] = useState<ReasonableSalary>(defaultReasonableSalary);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const value = {
    currentStep,
    setCurrentStep,
    personalInfo,
    setPersonalInfo,
    incomeInfo,
    setIncomeInfo,
    expensesInfo,
    setExpensesInfo,
    reasonableSalary,
    setReasonableSalary,
    isSubmitted,
    setIsSubmitted,
  };

  return (
    <TaxDataContext.Provider value={value}>
      {children}
    </TaxDataContext.Provider>
  );
};

export const useTaxData = (): TaxDataContextType => {
  const context = useContext(TaxDataContext);
  if (context === undefined) {
    throw new Error('useTaxData must be used within a TaxDataProvider');
  }
  return context;
};
