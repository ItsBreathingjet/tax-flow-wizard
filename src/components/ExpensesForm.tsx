
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTaxData } from "@/context/TaxDataContext";

const ExpensesForm: React.FC = () => {
  const { expensesInfo, setExpensesInfo, setCurrentStep } = useTaxData();
  
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  const handleGeneralExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value ? parseFloat(value.replace(/[^0-9.]/g, '')) : 0;
    
    setExpensesInfo((prev) => ({
      ...prev,
      generalExpenses: {
        ...prev.generalExpenses,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      },
    }));
  };
  
  const handleOtherExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value ? parseFloat(value.replace(/[^0-9.]/g, '')) : 0;
    
    setExpensesInfo((prev) => ({
      ...prev,
      [name]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };
  
  const calculateTotalExpenses = () => {
    const { rent, utilities, insurance, marketing, travel, supplies, professionalFees, other } = expensesInfo.generalExpenses;
    return rent + utilities + insurance + marketing + travel + supplies + professionalFees + other;
  };
  
  const handlePrevious = () => {
    setCurrentStep(2);
  };
  
  const handleNext = () => {
    setCurrentStep(4);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-tax-primary">S-Corporation Expenses</CardTitle>
        <CardDescription className="text-center">
          Enter your business expenses, withdrawals, and distributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">General Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rent">Rent/Lease</Label>
                <Input
                  id="rent"
                  name="rent"
                  value={expensesInfo.generalExpenses.rent ? formatCurrency(expensesInfo.generalExpenses.rent) : ""}
                  onChange={handleGeneralExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="utilities">Utilities</Label>
                <Input
                  id="utilities"
                  name="utilities"
                  value={expensesInfo.generalExpenses.utilities ? formatCurrency(expensesInfo.generalExpenses.utilities) : ""}
                  onChange={handleGeneralExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance</Label>
                <Input
                  id="insurance"
                  name="insurance"
                  value={expensesInfo.generalExpenses.insurance ? formatCurrency(expensesInfo.generalExpenses.insurance) : ""}
                  onChange={handleGeneralExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="marketing">Marketing & Advertising</Label>
                <Input
                  id="marketing"
                  name="marketing"
                  value={expensesInfo.generalExpenses.marketing ? formatCurrency(expensesInfo.generalExpenses.marketing) : ""}
                  onChange={handleGeneralExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travel">Travel & Entertainment</Label>
                <Input
                  id="travel"
                  name="travel"
                  value={expensesInfo.generalExpenses.travel ? formatCurrency(expensesInfo.generalExpenses.travel) : ""}
                  onChange={handleGeneralExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supplies">Office Supplies</Label>
                <Input
                  id="supplies"
                  name="supplies"
                  value={expensesInfo.generalExpenses.supplies ? formatCurrency(expensesInfo.generalExpenses.supplies) : ""}
                  onChange={handleGeneralExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="professionalFees">Professional Fees</Label>
                <Input
                  id="professionalFees"
                  name="professionalFees"
                  value={expensesInfo.generalExpenses.professionalFees ? formatCurrency(expensesInfo.generalExpenses.professionalFees) : ""}
                  onChange={handleGeneralExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="other">Other Expenses</Label>
                <Input
                  id="other"
                  name="other"
                  value={expensesInfo.generalExpenses.other ? formatCurrency(expensesInfo.generalExpenses.other) : ""}
                  onChange={handleGeneralExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <Label className="font-semibold">Total Business Expenses</Label>
                  <span className="font-mono font-semibold text-tax-secondary">
                    {formatCurrency(calculateTotalExpenses())}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Owner Transactions</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerWithdrawals">Owner's Withdrawals</Label>
                <Input
                  id="ownerWithdrawals"
                  name="ownerWithdrawals"
                  value={expensesInfo.ownerWithdrawals ? formatCurrency(expensesInfo.ownerWithdrawals) : ""}
                  onChange={handleOtherExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
                <p className="text-xs text-gray-500">
                  Money taken out of the business for personal use (not considered salary)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="distributionFunds">Distribution Funds</Label>
                <Input
                  id="distributionFunds"
                  name="distributionFunds"
                  value={expensesInfo.distributionFunds ? formatCurrency(expensesInfo.distributionFunds) : ""}
                  onChange={handleOtherExpensesChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
                <p className="text-xs text-gray-500">
                  Additional distributions paid to shareholders above normal withdrawals
                </p>
              </div>
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
              type="button"
              onClick={handleNext}
              className="flex-1 bg-tax-primary hover:bg-tax-primary/90 transition-all"
            >
              Continue to Reasonable Salary
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesForm;
