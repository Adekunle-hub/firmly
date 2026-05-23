import { IconCheck } from "../utils/Icons";
import { PlanCardProps } from "../utils/types";

const PlanCard = ({ plan, selected, onSelect }: PlanCardProps) => {
  return (
    <div
      className={`flex flex-col rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer ${
        selected
          ? "border-[#29724f] bg-white/12"
          : "border-white/10 bg-white/8 hover:bg-white/12"
      }`}
      onClick={onSelect}
    >
     
      <div className="mb-2">
        <span className="text-4xl font-bold text-white">₦{plan.price}</span>

        <span className="ml-1 text-sm text-white/60">{plan.period}</span>
      </div>

      
      <h4 className="mb-1 text-lg font-bold text-white">{plan.name}</h4>

    
      <p className="mb-5 text-sm leading-relaxed text-white/60">{plan.desc}</p>

      
      <ul className="mb-6 flex flex-1 flex-col gap-3">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-white/80"
          >
            <span className="mt-0.5 shrink-0 text-[#5cab82]">
              <IconCheck />
            </span>

            <span>{feature}</span>
          </li>
        ))}
      </ul>

    
      <button
        type="button"
        className={`h-11 cursor-pointer w-full rounded-xl text-sm font-bold transition-colors ${
          selected
            ? "bg-firmly-primary text-white hover:bg-firmly-primary-hover"
            : "border border-white/20 bg-transparent text-white hover:bg-white/10"
        }`}
      >
        {selected ? "Selected Plan" : "Choose Plan"}
      </button>
    </div>
  );
};

export default PlanCard;
