
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTaxData } from "@/context/TaxDataContext";

const IncomeForm: React.FC = () => {
  const { incomeInfo, setIncomeInfo, setCurrentStep } = useTaxData();
  
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  const handlePersonalIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value ? parseFloat(value.replace(/[^0-9.]/g, '')) : 0;
    
    setIncomeInfo((prev) => ({
      ...prev,
      personalIncome: {
        ...prev.personalIncome,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      },
    }));
  };
  
  const handleSCorpIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value ? parseFloat(value.replace(/[^0-9.]/g, '')) : 0;
    
    setIncomeInfo((prev) => ({
      ...prev,
      sCorpIncome: {
        ...prev.sCorpIncome,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      },
    }));
  };

  // Calculate gross profit whenever revenue or cost of goods changes
  useEffect(() => {
    const grossProfit = incomeInfo.sCorpIncome.revenue - incomeInfo.sCorpIncome.costOfGoods;
    
    setIncomeInfo((prev) => ({
      ...prev,
      sCorpIncome: {
        ...prev.sCorpIncome,
        grossProfit: grossProfit < 0 ? 0 : grossProfit,
      },
    }));
  }, [incomeInfo.sCorpIncome.revenue, incomeInfo.sCorpIncome.costOfGoods, setIncomeInfo]);
  
  const handlePrevious = () => {
    setCurrentStep(1);
  };
  
  const handleNext = () => {
    setCurrentStep(3);
  };
  
  const calculateTotalPersonalIncome = () => {
    const { wages, interest, dividends, capitalGains, otherIncome } = incomeInfo.personalIncome;
    return wages + interest + dividends + capitalGains + otherIncome;
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-tax-primary">Income Information</CardTitle>
        <CardDescription className="text-center">
          Enter your personal and S-Corporation income details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Income</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wages">Wages & Salary</Label>
                <Input
                  id="wages"
                  name="wages"
                  value={incomeInfo.personalIncome.wages ? formatCurrency(incomeInfo.personalIncome.wages) : ""}
                  onChange={handlePersonalIncomeChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interest">Interest Income</Label>
                <Input
                  id="interest"
                  name="interest"
                  value={incomeInfo.personalIncome.interest ? formatCurrency(incomeInfo.personalIncome.interest) : ""}
                  onChange={handlePersonalIncomeChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dividends">Dividend Income</Label>
                <Input
                  id="dividends"
                  name="dividends"
                  value={incomeInfo.personalIncome.dividends ? formatCurrency(incomeInfo.personalIncome.dividends) : ""}
                  onChange={handlePersonalIncomeChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capitalGains">Capital Gains</Label>
                <Input
                  id="capitalGains"
                  name="capitalGains"
                  value={incomeInfo.personalIncome.capitalGains ? formatCurrency(incomeInfo.personalIncome.capitalGains) : ""}
                  onChange={handlePersonalIncomeChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otherIncome">Other Income</Label>
                <Input
                  id="otherIncome"
                  name="otherIncome"
                  value={incomeInfo.personalIncome.otherIncome ? formatCurrency(incomeInfo.personalIncome.otherIncome) : ""}
                  onChange={handlePersonalIncomeChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <Label className="font-semibold">Total Personal Income</Label>
                  <span className="font-mono font-semibold text-tax-secondary">
                    {formatCurrency(calculateTotalPersonalIncome())}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold mb-4">S-Corporation Income</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Total Revenue</Label>
                <Input
                  id="revenue"
                  name="revenue"
                  value={incomeInfo.sCorpIncome.revenue ? formatCurrency(incomeInfo.sCorpIncome.revenue) : ""}
                  onChange={handleSCorpIncomeChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="costOfGoods">Cost of Goods Sold</Label>
                <Input
                  id="costOfGoods"
                  name="costOfGoods"
                  value={incomeInfo.sCorpIncome.costOfGoods ? formatCurrency(incomeInfo.sCorpIncome.costOfGoods) : ""}
                  onChange={handleSCorpIncomeChange}
                  placeholder="$0.00"
                  className="font-mono"
                  onFocus={(e) => e.target.select()}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <Label className="font-semibold">Gross Profit</Label>
                  <span className="font-mono font-semibold text-tax-secondary">
                    {formatCurrency(incomeInfo.sCorpIncome.grossProfit)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Calculated as Revenue minus Cost of Goods Sold
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
              Continue to Expenses
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeForm;
