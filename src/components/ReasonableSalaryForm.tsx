
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTaxData } from "@/context/TaxDataContext";
import { toast } from "sonner";

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
          access_key: '6a86c5f0-9bb3-4110-90a6-ae82e0e99fb1', // This is a dummy key for the demo
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
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-tax-primary">Reasonable Salary</CardTitle>
        <CardDescription className="text-center">
          Determine your reasonable salary as an S-Corporation owner
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="p-5 bg-gray-50 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-3">What is a Reasonable Salary?</h3>
              <p className="text-sm text-gray-700 mb-3">
                A "reasonable salary" is what the IRS requires S-Corporation owners to pay themselves as W-2 wages before taking distributions. 
                This salary must reflect what would be paid to someone in a similar role in your industry.
              </p>
              <p className="text-sm text-gray-700">
                Setting too low a salary may trigger an IRS audit, as it could appear you're avoiding payroll taxes. 
                Too high a salary means you miss the tax benefits of S-Corporation distributions. Generally, your 
                salary should be at least 30-40% of your business profits.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-lg">Your Reasonable Salary</Label>
              <Input
                id="salary"
                value={reasonableSalary.amount ? formatCurrency(reasonableSalary.amount) : ""}
                onChange={handleChange}
                placeholder="$0.00"
                className="font-mono text-lg"
                onFocus={(e) => e.target.select()}
              />
              <p className="text-xs text-gray-500">
                Enter what you believe is a reasonable annual salary for your position and industry
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Salary Recommendation</h4>
              <p className="text-sm text-gray-700">
                Based on your S-Corp's gross profit and industry standards, a reasonable salary typically 
                falls between 30% to 60% of your business profits. Consider factors like your qualifications, 
                hours worked, and industry norms when determining this amount.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-tax-secondary hover:bg-tax-secondary/90 transition-all"
            >
              Submit Tax Information
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReasonableSalaryForm;
