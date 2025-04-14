
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessPage: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16" />
          </div>
          <CardTitle className="text-3xl font-bold">Success!</CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-8 text-center">
          <p className="text-lg mb-6">
            Your tax information has been successfully submitted.
          </p>
          <p className="text-gray-600 mb-8">
            A confirmation has been sent to your email address. Our team will review your information and contact you if any additional details are needed.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-tax-primary hover:bg-tax-primary/90 px-8 py-6 text-lg"
            >
              <Link to="/">
                Return Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
