
export type ConflictStatus = "No Conflict" | "Potential Conflict" | "Confirmed Conflict";
export type Plan = {
  id:string;
  price: string;
  period: string;
  name: string;
  desc: string;
  features: string[];
};

export type PlanCardProps = {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
};

export type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export interface Case {
  id: string;
  title: string;
  client: string;
  type: string;
  stage: string;
  assigned: string;
  hearing: string;
}



export type Client = {
  id: string;
  clientId: string;
  name: string;
  caseType: string;
  email: string;
  conflict: ConflictStatus;
  phone: string;
}

export interface CaseDetail {
  id: string;
  title: string;
  caseNumber: string;
  status: string;
  caseType: string;
  filingDate: string;
  jurisdiction: string;
}

export interface DocumentDetail {
  id: string;
  name: string;
  type: string;
  dateUploaded: string;
  size: string;
}

export interface DetailedClient extends Client {
  clientType: string;
  dateRegistered: string;
  conflictStatus: string;
  address: string;
  state: string;
  lga: string;
  nationality: string;
  workplace: string;
  preferredContact: string;
  linkedCases: CaseDetail[];
  documents: DocumentDetail[];
}

export interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  subPositive?: boolean;
  icon: React.ReactNode;
}

