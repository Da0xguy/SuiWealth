import { FiLayers, FiShield, FiTarget, FiDollarSign } from "react-icons/fi";

export const components = [
  {
    slug: "fixed-deposit",
    title: "Fixed Deposit",
    category: "Savings",
    badge: "Setable",
    icon: FiShield,
    status: "Ready",
    target: "4.5% APR",
    note: "Set amount, duration, maturity date, and yield manually.",
    description:
      "Lock Sui with a configurable duration, maturity date, and yield profile.",
    preferences: [
      {
        key: "source",
        label: "Funding source",
        type: "select",
        options: ["Current balance", "Future income"],
      },
      {
        key: "term",
        label: "Term",
        type: "select",
        options: ["1 month", "3 months", "6 months", "1 year"],
      },
    ],
    formFields: [
      {
        key: "amount",
        label: "Amount",
        type: "number",
        placeholder: "12",
      },
      {
        key: "duration",
        label: "Duration",
        type: "select",
        options: ["30 days", "60 days", "90 days", "180 days", "365 days"],
        placeholder: "90 days",
      },
      {
        key: "maturityDate",
        label: "Maturity date",
        type: "date",
        placeholder: "2026-12-31",
      },
      {
        key: "yield",
        label: "Yield",
        type: "text",
        placeholder: "4.5% APR",
      },
    ],
    initialValues: {
      amount: "12",
      duration: "90 days",
      maturityDate: "2026-12-31",
      yield: "4.5% APR",
      source: "Current balance",
      term: "3 months",
    },
    templates: [
      {
        title: "Yield Lock",
        description: "90 day fixed lock",
        values: {
          amount: "12",
          duration: "90 days",
          maturityDate: "2026-12-31",
          yield: "4.5% APR",
          source: "Current balance",
          term: "3 months",
        },
      },
    ],
  },
  {
    slug: "spend-save",
    title: "Spend & Save",
    category: "Budget",
    badge: "Copyable",
    icon: FiDollarSign,
    status: "Active",
    target: "40 / 60 split",
    note: "Adjust split ratios for every incoming wallet deposit.",
    description:
      "Split every incoming Sui deposit across spend and save buckets automatically.",
    formFields: [
      {
        key: "spend",
        label: "Spend %",
        type: "select",
        options: ["20", "30", "40", "50", "60", "70"],
        placeholder: "40",
      },
      {
        key: "save",
        label: "Save %",
        type: "select",
        options: ["20", "30", "40", "50", "60", "70"],
        placeholder: "60",
      },
    ],
    initialValues: {
      spend: "40",
      save: "60",
    },
    templates: [
      {
        title: "Auto Save Split",
        description: "40/60 split",
        values: {
          spend: "40%",
          save: "60%",
        },
      },
    ],
  },
  {
    slug: "target-saving",
    title: "Target Saving",
    category: "Savings",
    badge: "Sharable",
    icon: FiTarget,
    status: "Pending",
    target: "5.0 SUI goal",
    note: "Set the target amount, deadline, and destination manually.",
    description:
      "Create a goal-driven Sui bucket that collects until the target is reached.",
    preferences: [
      {
        key: "purpose",
        label: "What is this target for?",
        type: "text",
        placeholder: "Home, travel, or trading reserve",
      },
    ],
    formFields: [
      {
        key: "goal",
        label: "Goal",
        type: "number",
        placeholder: "5.0",
      },
      {
        key: "deadline",
        label: "Deadline",
        type: "date",
        placeholder: "Jul 31",
      },
      {
        key: "deductionDays",
        label: "Deduct every",
        type: "select",
        options: ["7 days", "14 days", "30 days", "60 days"],
        placeholder: "14 days",
      },
      {
        key: "deductionAmount",
        label: "Deduction amount",
        type: "number",
        placeholder: "0.25",
      },
      {
        key: "route",
        label: "Route",
        type: "text",
        placeholder: "Save until goal met",
      },
    ],
    initialValues: {
      goal: "5.0",
      deadline: "2026-07-31",
      deductionDays: "14 days",
      deductionAmount: "0.25",
      route: "Save until goal met",
      purpose: "",
    },
    templates: [
      {
        title: "Goal Target",
        description: "Save until the balance reaches 5.0 SUI.",
        values: {
          goal: "5.0 SUI",
          deadline: "Jul 31",
          deductionDays: "14 days",
          deductionAmount: "0.25",
          route: "Save until goal met",
        },
      },
    ],
  },
  {
    slug: "protocol-investments",
    title: "Protocol Investments",
    category: "Investments",
    badge: "Composable",
    icon: FiLayers,
    status: "Live",
    target: "Multi-pool",
    note: "Tune strategy, pool, and allocation manually.",
    description:
      "Allocate Sui into DeFi strategies and let the smart agent optimize exposure.",
    formFields: [
      {
        key: "strategy",
        label: "Strategy",
        type: "select",
        options: ["Yield Booster", "Stable Growth", "Balanced Alpha"],
        placeholder: "Yield Booster",
      },
      {
        key: "pool",
        label: "Pool",
        type: "select",
        options: ["SUI/USDC", "SUI/ETH", "SUI/USDT"],
        placeholder: "SUI/USDC",
      },
      {
        key: "allocation",
        label: "Allocation",
        type: "select",
        options: ["60% / 40%", "50% / 50%", "70% / 30%"],
        placeholder: "60% / 40%",
      },
    ],
    initialValues: {
      strategy: "Yield Booster",
      pool: "SUI/USDC",
      allocation: "60% / 40%",
    },
    templates: [
      {
        title: "Protocol Blend",
        description: "Balanced DeFi allocation across two pools.",
        values: {
          strategy: "Yield Booster",
          pool: "SUI/USDC",
          allocation: "60% / 40%",
        },
      },
    ],
  },
];
