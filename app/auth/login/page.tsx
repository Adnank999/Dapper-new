import React from "react";
import { LoginForm } from "./components/LoginForm";

import { GlassShader } from "@/app/components/GlassShader";

const page = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 blur-3xl opacity-80">
          <GlassShader/>
        </div>
      </div>
      <div className="relative z-10">
        {" "}
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
