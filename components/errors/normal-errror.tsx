import React from "react";
import { PiNetworkSlash } from "react-icons/pi";

export default function NormalError({ message }: { message: string }) {
  return (
    <div className="w-full h-full  z-50 bg-background flex items-center justify-center text-gray-300 flex-col">
      <PiNetworkSlash size={30} className="" />
      <div className="h-4" />
      {message}
    </div>
  );
}
export function CenterError({ message }: { message: string }) {
  return (
    <div className="w-screen h-screen  z-50 bg-background flex items-center justify-center text-gray-300 flex-col">
      <PiNetworkSlash size={30} className="" />
      <div className="h-4" />
      {message}
    </div>
  );
}
