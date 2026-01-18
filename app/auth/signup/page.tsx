import React from "react";
import { SignUpForm } from "./components/SignUpForm";
import Radial from "@/app/components/Radial";


const Page = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Blurred Radial Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 blur-lg opacity-60">
          <Radial />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Page;

