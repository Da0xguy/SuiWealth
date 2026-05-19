import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiDollarSign,
  FiZap,
  FiLayers,
} from "react-icons/fi";
import ActiveComponentDetail from "../components/ActiveComponentDetail";

const metrics = [
  {
    label: "Total balance",
    value: "12.8 SUI",
    detail: "Connected wallet total",
    icon: FiDollarSign,
  },
  {
    label: "Spending balance",
    value: "7.5 SUI",
    detail: "Available for everyday use",
    icon: FiArrowUpRight,
  },
  {
    label: "Savings",
    value: "3.1 SUI",
    detail: "Flexible and goal savings",
    icon: FiCheckCircle,
  },
  {
    label: "Investments",
    value: "2.3 SUI",
    detail: "Active DeFi positions",
    icon: FiLayers,
  },
  {
    label: "Yield earned",
    value: "0.18 SUI",
    detail: "Total interest generated",
    icon: FiZap,
  },
];

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState<
    "fixed-deposit" | "auto-save" | null
  >(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-10"
    >
      <section className="rounded-3xl bg-slate-950/95 p-6 sm:p-8 shadow-md shadow-slate-950/20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-300">
              Live Money Rails
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Dashboard
            </h2>
            <p className="mt-3 max-w-2xl text-cyan-100/60 text-sm">
              Track active policies, allocations, and money flows across all
              your accounts.
            </p>
          </div>
          <div className="inline-flex rounded-lg bg-black/60 px-3 py-2 text-xs text-cyan-300 ring-1 ring-cyan-400/50 backdrop-blur font-bold uppercase tracking-wider">
            Policy: <span className="ml-2 text-cyan-200">Stream #042</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-2xl bg-slate-900/85 p-4 transition hover:bg-slate-900/95"
            >
              <div className="mb-3 flex items-center justify-between text-cyan-300">
                <span className="text-xs uppercase tracking-wider font-bold">
                  {metric.label}
                </span>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <p className="mt-2 text-xs text-cyan-100/60">{metric.detail}</p>
            </motion.div>
          );
        })}
      </section>

      <section className="rounded-3xl bg-slate-900/85 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-300">
              Quick actions
            </p>
            <h3 className="mt-2 text-xl font-bold text-white">
              One-tap money controls
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <button className="rounded-3xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              Send
            </button>
            <button className="rounded-3xl bg-black/70 border border-cyan-400/20 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-black/80">
              Receive
            </button>
            <button className="rounded-3xl bg-black/70 border border-cyan-400/20 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-black/80">
              Allocate Funds
            </button>
            <button className="rounded-3xl bg-black/70 border border-cyan-400/20 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-black/80">
              Create Savings Plan
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-3xl bg-slate-900/85 p-6"
        >
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            Active Components
          </h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-black/60 p-4 border border-cyan-400/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                    Yield Lock
                  </p>
                  <p className="mt-2 text-base font-bold text-white">
                    Fixed Deposit Policy
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300 font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="mt-3 text-xs text-cyan-100/60">
                2.3 SUI is locked in a smart yield contract.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedComponent("fixed-deposit")}
                  className="rounded-2xl bg-cyan-400/15 px-3 py-2 text-xs text-cyan-100 transition hover:bg-cyan-400/25"
                >
                  View Details
                </button>
                <button className="rounded-2xl border border-cyan-400/20 bg-black/70 px-3 py-2 text-xs text-cyan-100 transition hover:bg-black/80">
                  End policy
                </button>
              </div>
            </div>
            <div className="rounded-lg bg-black/60 p-4 border border-purple-400/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-purple-300 font-bold">
                    Split Saver
                  </p>
                  <p className="mt-2 text-base font-bold text-white">
                    Auto Save Policy
                  </p>
                </div>
                <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-300 font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="mt-3 text-xs text-cyan-100/60">
                3.1 SUI is routing between spend and savings buckets.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedComponent("auto-save")}
                  className="rounded-2xl bg-cyan-400/15 px-3 py-2 text-xs text-cyan-100 transition hover:bg-cyan-400/25"
                >
                  View Details
                </button>
                <button className="rounded-2xl border border-cyan-400/20 bg-black/70 px-3 py-2 text-xs text-cyan-100 transition hover:bg-black/80">
                  End policy
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-lg border border-purple-400/30 bg-gradient-to-br from-black via-cyan-950/20 to-black p-6 shadow-lg shadow-purple-500/10"
        >
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            Recent Activity
          </h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-black/60 p-4 border border-purple-400/20">
              <p className="text-xs uppercase tracking-widest text-purple-300 font-bold">
                Last Action
              </p>
              <p className="mt-2 text-base font-bold text-white">
                Policy Triggered
              </p>
              <p className="mt-2 text-xs text-cyan-100/60">
                Smart agent allocated Sui into the chosen protocol strategy.
              </p>
            </div>
            <div className="rounded-lg bg-black/60 p-4 border border-cyan-400/20">
              <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                Next Step
              </p>
              <p className="mt-2 text-base font-bold text-white">
                Review allocations
              </p>
              <p className="mt-2 text-xs text-cyan-100/60">
                Adjust target ratios or add a new protocol policy.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Fixed Deposit Detail Modal */}
      <ActiveComponentDetail
        isOpen={selectedComponent === "fixed-deposit"}
        onClose={() => setSelectedComponent(null)}
        component={{
          title: "Fixed Deposit Policy",
          amount: "2.3 SUI",
          status: "Active",
          description:
            "Your Sui is locked in a smart yield contract earning consistent returns.",
        }}
        metrics={{
          amountInvested: "2.3 SUI",
          currentValue: "2.35 SUI",
          profitLoss: "+0.05 SUI",
          profitPercentage: "2.17",
          yieldEarned: "0.05 SUI",
          endDate: "Dec 31, 2024",
          daysRemaining: 227,
        }}
      />

      {/* Auto Save Detail Modal */}
      <ActiveComponentDetail
        isOpen={selectedComponent === "auto-save"}
        onClose={() => setSelectedComponent(null)}
        component={{
          title: "Auto Save Policy",
          amount: "3.1 SUI",
          status: "Active",
          description:
            "Your Sui automatically splits between spend and savings buckets with yield.",
        }}
        metrics={{
          amountInvested: "3.1 SUI",
          currentValue: "3.18 SUI",
          profitLoss: "+0.08 SUI",
          profitPercentage: "2.58",
          yieldEarned: "0.08 SUI",
          endDate: "Ongoing",
          daysRemaining: 365,
        }}
      />
    </motion.div>
  );
}
