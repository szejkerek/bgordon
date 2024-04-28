import React from "react";
import { AboutHeader, AboutServices } from "../resources/about";
import { AboutCard } from "../components/AboutCard";

export default function About() {
  return (
    <div>
      <h5>{AboutHeader}</h5>
      <div>
        <h6>What I Offer</h6>
        <div>
          {AboutServices.map((service) => (
            <AboutCard service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
