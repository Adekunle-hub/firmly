import AllCasesTable from "./AllCasesTable";
import BillingSummary from "./BillingSummary";
import Bounded from "./Bounded";
import ComplianceAlerts from "./ComplianceAlerts";
import ConflictQueue from "./ConflictQueue";
import Next7Days from "./Deadline";

import StatsCards from "./StatsCard";

import UpcomingSchedule from "./UpcomingSchedule";

export default function DashboardPage() {
  return (
    <Bounded>
      <main className="flex flex-col gap-2 md:gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#181D1A] ">
            Firm Overview
          </h1>
          <p className="text-[13px] text-[#404942] mt-0.5">
            Real-time metrics and alerts for your practice.
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_22rem]">
          <BillingSummary />
          <UpcomingSchedule />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_280px]">
          <ConflictQueue />
          <div className="flex flex-col gap-4">
            <ComplianceAlerts />
            <Next7Days />
          </div>
        </div>

        <AllCasesTable />
      </main>
    </Bounded>
  );
}
