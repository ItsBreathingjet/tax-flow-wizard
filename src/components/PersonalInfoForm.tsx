
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaxData } from "@/context/TaxDataContext";

const PersonalInfoForm: React.FC = () => {
  const { personalInfo, setPersonalInfo, setCurrentStep } = useTaxData();
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }
    
    if (name === "phone") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value.replace(/\D/g, ''))) {
        return "Please enter a valid 10-digit phone number";
      }
    }
    
    if (name === "ssn") {
      const ssnRegex = /^\d{9}$/;
      if (!ssnRegex.test(value.replace(/\D/g, ''))) {
        return "Please enter a valid 9-digit SSN";
      }
    }
    
    if (name === "zipCode") {
      const zipRegex = /^\d{5}$/;
      if (!zipRegex.test(value.replace(/\D/g, ''))) {
        return "Please enter a valid 5-digit ZIP code";
      }
    }
    
    return "";
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "phone") {
      formattedValue = formatPhone(value);
    } else if (name === "ssn") {
      formattedValue = formatSSN(value);
    }

    setPersonalInfo((prev) => ({ ...prev, [name]: formattedValue }));
    
    const error = validateField(name, formattedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    let hasError = false;
    
    Object.entries(personalInfo).forEach(([key, value]) => {
      const error = validateField(key, value.toString());
      if (error) {
        newErrors[key] = error;
        hasError = true;
      }
    });
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    // Proceed to next step
    setCurrentStep(2);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-tax-primary">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handleChange}
                placeholder="123-456-7890"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              name="address"
              value={personalInfo.address}
              onChange={handleChange}
              placeholder="Enter your street address"
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={personalInfo.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={personalInfo.state}
                onChange={handleChange}
                placeholder="Enter your state"
                className={errors.state ? "border-red-500" : ""}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={personalInfo.zipCode}
                onChange={handleChange}
                placeholder="12345"
                className={errors.zipCode ? "border-red-500" : ""}
                maxLength={5}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ssn">Social Security Number (SSN)</Label>
            <Input
              id="ssn"
              name="ssn"
              value={personalInfo.ssn}
              onChange={handleChange}
              placeholder="123-45-6789"
              className={errors.ssn ? "border-red-500" : ""}
            />
            {errors.ssn && (
              <p className="text-red-500 text-sm mt-1">{errors.ssn}</p>
            )}
            <p className="text-xs text-gray-500">
              Your SSN is encrypted and secure. We need this information to process your tax filing.
            </p>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-tax-primary hover:bg-tax-primary/90 transition-all"
          >
            Continue to Income Information
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
