import React from "react";
import { AboutHeader, AboutServices } from "../resources/data";
import { AboutCard } from "../components/AboutCard";

export default function About() {
  return (
    <div className="flex flex-col px-6 pt-1">
      <h5 className="my-3 font-medium">{AboutHeader}</h5>
      <div
        className="flex-grow p-4 bg-gray-400 "
        style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
      >
        <h6 className="my-3 text-xl font-bold tracking-wide">What I Offer</h6>
        <div className="grid gap-6 lg:grid-cols-2">
          {AboutServices.map((service) => (
            <div className="bg-gray-200 rounded-lg lg:col-span-1">
              <AboutCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
