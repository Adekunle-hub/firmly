"use client";

import React, { useState } from "react";
import { Plan } from "../utils/types";
import PlanCard from "./PlanCard";
import { PLANS } from "../utils/plans";




const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<number>(0);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-4">
        {PLANS.map((plan, index) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            selected={selectedPlan === index}
            onSelect={() => setSelectedPlan(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
