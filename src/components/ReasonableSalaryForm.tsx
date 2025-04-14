
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTaxData } from "@/context/TaxDataContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { DollarSign, AlertCircle, ArrowLeft, Send, TrendingUp } from "lucide-react";

const ReasonableSalaryForm: React.FC = () => {
  const { 
    reasonableSalary, 
    setReasonableSalary, 
    setCurrentStep,
    personalInfo,
    incomeInfo,
    expensesInfo,
    setIsSubmitted
  } = useTaxData();
  
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value ? parseFloat(value.replace(/[^0-9.]/g, '')) : 0;
    
    setReasonableSalary({
      amount: isNaN(numericValue) ? 0 : numericValue,
    });
  };
  
  const handlePrevious = () => {
    setCurrentStep(3);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data for submission
    const formData = {
      personalInfo,
      incomeInfo,
      expensesInfo,
      reasonableSalary
    };
    
    try {
      toast.loading("Submitting your tax data...");
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '4ca3797f-5560-4338-b6e9-f3bfeeb85920', // Using the provided access key
          subject: `Tax Filing for ${personalInfo.firstName} ${personalInfo.lastName}`,
          from_name: `${personalInfo.firstName} ${personalInfo.lastName}`,
          formData
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.dismiss();
        toast.success("Your tax information has been submitted successfully!");
        setIsSubmitted(true);
      } else {
        toast.dismiss();
        toast.error("There was an error submitting your information. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("There was an error submitting your information. Please try again.");
      console.error("Submission error:", error);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="w-full max-w-3xl mx-auto overflow-hidden border-0 shadow-xl bg-white">
        <CardHeader className="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8">
          <motion.div 
            className="mb-3 flex justify-center"
            variants={itemVariants}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl md:text-3xl font-bold">Reasonable Salary</CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className="text-white/90 mt-2">
              Determine your reasonable salary as an S-Corporation owner
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="pt-8 pb-8 px-6 md:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-6 border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-700 mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-indigo-500" />
                  What is a Reasonable Salary?
                </h3>
                <p className="text-gray-700 mb-3">
                  A "reasonable salary" is what the IRS requires S-Corporation owners to pay themselves as W-2 wages before taking distributions. 
                  This salary must reflect what would be paid to someone in a similar role in your industry.
                </p>
                <p className="text-gray-700">
                  Setting too low a salary may trigger an IRS audit, as it could appear you're avoiding payroll taxes. 
                  Too high a salary means you miss the tax benefits of S-Corporation distributions. Generally, your 
                  salary should be at least 30-40% of your business profits.
                </p>
              </div>
              
              <motion.div
                className="space-y-2"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Label htmlFor="salary" className="text-lg font-medium text-gray-700">Your Reasonable Salary</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="salary"
                    value={reasonableSalary.amount ? formatCurrency(reasonableSalary.amount) : ""}
                    onChange={handleChange}
                    placeholder="$0.00"
                    className="pl-10 font-mono text-lg py-6 border-2 border-indigo-100 focus-visible:ring-indigo-500"
                    onFocus={(e) => e.target.select()}
                  />
                </div>
                <p className="text-xs text-gray-500 ml-1">
                  Enter what you believe is a reasonable annual salary for your position and industry
                </p>
              </motion.div>
              
              <motion.div
                className="p-6 bg-blue-50 border border-blue-200 rounded-xl"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Salary Recommendation
                </h4>
                <p className="text-gray-700">
                  Based on your S-Corp's gross profit and industry standards, a reasonable salary typically 
                  falls between 30% to 60% of your business profits. Consider factors like your qualifications, 
                  hours worked, and industry norms when determining this amount.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="flex-1 py-6 border-2 border-indigo-100 hover:bg-indigo-50 transition-all"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Previous
              </Button>
              <Button
                type="submit"
                className="flex-1 py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all shadow-md hover:shadow-lg"
              >
                Submit Tax Information
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReasonableSalaryForm;
