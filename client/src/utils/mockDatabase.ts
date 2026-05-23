

export interface MockUserProfile {
  id: string;
  name: string;
  email: string;
  role: "Firm Admin" | "Lawyer" | "Partner" | "Client";
  avatarUrl?: string;
  firmName?:string
}

export interface MockUserRecord {
  email: string;
  password: string;
  expectedOtp: string; 
  user: MockUserProfile;
}

export const MOCK_USERS: MockUserRecord[] = [
  {
    email: "admin@firmly.ng",
    password: "Password123",
    expectedOtp: "123456", 

    user: {
      id: "usr_admin_01",
      name: "Mujeeb Adekunle",
      email: "admin@firmly.ng",
      firmName:"Pearson Hardman",
      role: "Firm Admin",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    }
  },
  {
    email: "lawyer@firmly.ng",
    password: "Password123",
    expectedOtp: "654321", // ◄ Test code for Adejoke
    user: {
      id: "usr_lawyer_02",
      name: "Adejoke Owolabi",
      email: "lawyer@firmly.ng",
      firmName:"Pearson Specter litt",
      role: "Lawyer",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    }
  }
];