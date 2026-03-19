export type LoanApplication = {
  id: string;
  companyName: string;
  industry: string;
  incorporationDate: string;
  numEmployees: number;
  requestedAmount: string;
  purposeOfLoan: string;
  dscr: string;
  ltv: string;
  kycStatus: "Cleared" | "Pending" | "Failed" | "In Review";
  legalFlags: "None" | "Pending Lawsuit - Minor" | "Tax Lien - Resolved" | "Active Investigation";
  annualRevenue: string;
  ebitda: string;
  netIncome: string;
  monthlyRevenue: string; // for micro-visualizations
  outstandingDebt: string;
  creditScore: number;
  context: string;
};

export const MOCK_APPLICATIONS: LoanApplication[] = [
  {
    id: "APP-2026-001",
    companyName: "TechFlow Solutions",
    industry: "B2B SaaS",
    incorporationDate: "2021-04-12",
    numEmployees: 45,
    requestedAmount: "$500,000",
    purposeOfLoan: "Working Capital for Enterprise Sales Expansion",
    dscr: "1.25x",
    ltv: "45%",
    kycStatus: "Cleared",
    legalFlags: "None",
    annualRevenue: "$1,440,000",
    ebitda: "$260,000",
    netIncome: "$115,000",
    monthlyRevenue: "$120,000",
    outstandingDebt: "$150,000 (Convertible Note)",
    creditScore: 742,
    context: "Client is a fast-growing B2B SaaS startup seeking working capital. MRR is robust at $120k with a low 0.8% churn rate. Gross margins contracted slightly last quarter due to increased AWS infrastructural costs. Outstanding debt is minimal, structured as a seed round convertible note. Management has strong domain expertise."
  },
  {
    id: "APP-2026-002",
    companyName: "Nexus Manufacturing Co.",
    industry: "Industrial Manufacturing",
    incorporationDate: "2008-11-03",
    numEmployees: 120,
    requestedAmount: "$1,200,000",
    purposeOfLoan: "CapEx for Gen-3 Automated Assembly Lines",
    dscr: "0.95x",
    ltv: "75%",
    kycStatus: "Pending",
    legalFlags: "Pending Lawsuit - Minor",
    annualRevenue: "$5,400,000",
    ebitda: "$380,000",
    netIncome: "-$45,000",
    monthlyRevenue: "$450,000",
    outstandingDebt: "$2,400,000 (Term Loans & Equipment)",
    creditScore: 615,
    context: "Established medium-sized firm seeking equipment financing. Revenue has steadily declined 4% YoY due to overseas competition. Recently lost a key supply contract (15% of annual volume). Heavy outstanding debt load with a concentrated vendor base. Real estate collateral holds solid value, but liquidity is tightly constrained."
  },
  {
    id: "APP-2026-003",
    companyName: "Summit Healthcare Partners",
    industry: "Outpatient Healthcare",
    incorporationDate: "2015-02-18",
    numEmployees: 85,
    requestedAmount: "$850,000",
    purposeOfLoan: "Real Estate Acquisition for 2 New Clinics",
    dscr: "2.10x",
    ltv: "60%",
    kycStatus: "Cleared",
    legalFlags: "None",
    annualRevenue: "$4,560,000",
    ebitda: "$1,100,000",
    netIncome: "$680,000",
    monthlyRevenue: "$380,000",
    outstandingDebt: "$300,000 (SBA 7a)",
    creditScore: 810,
    context: "A regional network of 5 outpatient clinics. Phenomenal historical performance with growing patient volumes and strong Medicare/private insurance reimbursements backing cash flow. Extremely solid debt coverage ratio with zero history of default. Executive team retains deep ties to local anchor hospital systems."
  },
  {
    id: "APP-2026-004",
    companyName: "Apex Logistics LLC",
    industry: "Freight & Shipping",
    incorporationDate: "2012-08-25",
    numEmployees: 210,
    requestedAmount: "$2,500,000",
    purposeOfLoan: "Fleet Modernization (15 new EV semi-trucks)",
    dscr: "1.45x",
    ltv: "80%",
    kycStatus: "In Review",
    legalFlags: "Tax Lien - Resolved",
    annualRevenue: "$18,500,000",
    ebitda: "$2,400,000",
    netIncome: "$950,000",
    monthlyRevenue: "$1,540,000",
    outstandingDebt: "$8,200,000 (Fleet Financing)",
    creditScore: 685,
    context: "Mid-market freight aggregator trying to transition to an EV fleet to secure lucrative ESG-focused corporate contracts. Fuel volatility has dragged down historic margins. Strong client retention rate. Had a past payroll tax lien that was fully resolved in 2024. Collateral value is highly depreciable (vehicles)."
  },
  {
    id: "APP-2026-005",
    companyName: "Golden Harvest AgriCorp",
    industry: "Agriculture",
    incorporationDate: "1998-05-14",
    numEmployees: 35,
    requestedAmount: "$400,000",
    purposeOfLoan: "Seasonal Operating Line of Credit",
    dscr: "1.85x",
    ltv: "35%",
    kycStatus: "Cleared",
    legalFlags: "None",
    annualRevenue: "$3,200,000",
    ebitda: "$850,000",
    netIncome: "$420,000",
    monthlyRevenue: "$266,000 (Highly Seasonal)",
    outstandingDebt: "$0 (Fully amortized previous facilities)",
    creditScore: 780,
    context: "Third-generation commercial farming operation. Seeking a standard seasonal LOC to bridge seed/fertilizer purchasing prior to Q3 harvest. Balance sheet is pristine; land is fully owned and unencumbered. High exposure to commodity price volatility and localized weather events, but holds comprehensive crop insurance."
  },
  {
    id: "APP-2026-006",
    companyName: "Horizon Retail Group",
    industry: "Retail / E-commerce",
    incorporationDate: "2019-10-30",
    numEmployees: 12,
    requestedAmount: "$250,000",
    purposeOfLoan: "Q4 Inventory Purchasing",
    dscr: "1.15x",
    ltv: "0% (Unsecured)",
    kycStatus: "Cleared",
    legalFlags: "None",
    annualRevenue: "$2,100,000",
    ebitda: "$180,000",
    netIncome: "$65,000",
    monthlyRevenue: "$175,000",
    outstandingDebt: "$85,000 (Short-term merchant advances)",
    creditScore: 660,
    context: "Omnichannel retailer with strong Shopify presence and one physical boutique. Relying heavily on Q4 sales. Margin pressure from digital ad spend (CAC has increased 40% YoY). Short-term liquidity is tight. Requesting an unsecured facility based on historical Q4 cash flow sweeps. History of using expensive merchant cash advances."
  },
  {
    id: "APP-2026-007",
    companyName: "Vanguard Construction",
    industry: "Commercial Construction",
    incorporationDate: "2005-01-10",
    numEmployees: 65,
    requestedAmount: "$3,000,000",
    purposeOfLoan: "Revolving Credit Facility for Project Bonding",
    dscr: "2.40x",
    ltv: "50%",
    kycStatus: "Cleared",
    legalFlags: "Pending Lawsuit - Minor",
    annualRevenue: "$22,000,000",
    ebitda: "$3,500,000",
    netIncome: "$1,800,000",
    monthlyRevenue: "$1,830,000",
    outstandingDebt: "$1,500,000 (Equipment Leases)",
    creditScore: 755,
    context: "General contractor specializing in municipal infrastructure. Seeking to upsize their revolver to bid on larger state contracts that require higher surety bonds. Phenomenal backlog of $45M in signed contracts extending through 2028. Subject to one minor slip-and-fall lawsuit fully covered by liability insurance."
  },
  {
    id: "APP-2026-008",
    companyName: "Blue Ocean Hospitality",
    industry: "Hotel & Leisure",
    incorporationDate: "2016-07-22",
    numEmployees: 140,
    requestedAmount: "$1,500,000",
    purposeOfLoan: "Property Renovation & Rebranding",
    dscr: "1.05x",
    ltv: "85%",
    kycStatus: "Pending",
    legalFlags: "None",
    annualRevenue: "$6,800,000",
    ebitda: "$950,000",
    netIncome: "$120,000",
    monthlyRevenue: "$566,000",
    outstandingDebt: "$12,500,000 (Commercial Mortgages)",
    creditScore: 690,
    context: "Boutique hotel operator looking to renovate their flagship property to maintain 4-star status. Occupancy rates have stabilized post-pandemic but RevPAR (Revenue Per Available Room) is lagging local competitors. Highly leveraged balance sheet due to aggressive expansion in 2019. Renovation is critical for sustained revenue."
  },
  {
    id: "APP-2026-009",
    companyName: "PrimeTech CyberSec",
    industry: "Cybersecurity Services",
    incorporationDate: "2022-03-15",
    numEmployees: 28,
    requestedAmount: "$750,000",
    purposeOfLoan: "M&A - Acquiring a smaller competitor",
    dscr: "1.60x",
    ltv: "NA",
    kycStatus: "Cleared",
    legalFlags: "None",
    annualRevenue: "$3,800,000",
    ebitda: "$820,000",
    netIncome: "$410,000",
    monthlyRevenue: "$316,000",
    outstandingDebt: "$0",
    creditScore: 795,
    context: "Rapidly scaling Managed Security Service Provider (MSSP). Debt-free balance sheet. Seeking capital to acquire a regional IT firm to cross-sell cybersecurity packages. Extremely sticky recurring revenue driven by multi-year enterprise contracts. Acquisition target has completed financial due diligence with a clean audit."
  },
  {
    id: "APP-2026-010",
    companyName: "Silver Line Energy Corp",
    industry: "Renewable Energy",
    incorporationDate: "2010-09-08",
    numEmployees: 400,
    requestedAmount: "$5,000,000",
    purposeOfLoan: "Grid Integration CapEx for Solar Farm",
    dscr: "1.35x",
    ltv: "65%",
    kycStatus: "In Review",
    legalFlags: "Active Investigation",
    annualRevenue: "$45,000,000",
    ebitda: "$8,500,000",
    netIncome: "$2,100,000",
    monthlyRevenue: "$3,750,000",
    outstandingDebt: "$28,000,000 (Project Finance Facilities)",
    creditScore: 710,
    context: "Large regional solar developer. Needs bridge financing for substation grid-tie equipment. Cash flows are guaranteed via 20-year Power Purchase Agreements (PPAs) with state utilities. However, currently under an active EPA inquiry regarding land disturbance on their newest site, temporarily gating their existing credit lines."
  }
];
