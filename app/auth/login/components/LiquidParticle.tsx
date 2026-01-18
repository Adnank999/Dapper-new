"use client";
import { InteractiveShader } from "@/app/components/LiquidCrystal";
import React, { useState } from "react";

const LiquidParticle = () => {
  const [params, setParams] = useState({
    hue: 260,
    speed: 0.4,
    noise: 0.2,
    warp: 0.1,
    zoom: 1.5,
    brightness: 0.9,
  });

  return (
    <div className="relative w-full h-screen bg-gray-900 font-sans antialiased overflow-hidden">
        <InteractiveShader {...params} />
    </div>
  );
};

export default LiquidParticle;
