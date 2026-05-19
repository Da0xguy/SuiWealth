import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiZap,
  FiShare2,
  FiLayers,
  FiTarget,
  FiDollarSign,
} from "react-icons/fi";

const featureCards = [
  {
    icon: FiZap,
    title: "Fixed Deposit",
    description:
      "Choose amount and term, lock Sui, and earn higher yield for longer durations.",
  },
  {
    icon: FiDollarSign,
    title: "Spend & Save",
    description:
      "Set one split percentage and route incoming Sui automatically to spend or save.",
  },
  {
    icon: FiTarget,
    title: "Target Savings",
    description:
      "Create goal-based plans with auto-deductions until your target is reached.",
  },
  {
    icon: FiLayers,
    title: "Flexible Savings",
    description:
      "Add or withdraw anytime and earn yield from DeFi protocols in a flexible vault.",
  },
];

const creationSteps = [
  {
    title: "Choose a component",
    description:
      "Pick Fixed Deposit, Spend & Save, Target Saving, or a protocol strategy.",
    icon: FiLayers,
  },
  {
    title: "Set the policy",
    description:
      "Configure allocation rules, risk thresholds, and protocol exposure.",
    icon: FiTarget,
  },
  {
    title: "Activate the agent",
    description:
      "Let the smart agent execute and rebalance your Sui positions automatically.",
    icon: FiZap,
  },
  {
    title: "Monitor performance",
    description:
      "See active flows, withdraw options, and smart recommendations.",
    icon: FiShare2,
  },
];

const walletBalance = 12.8;
const activeFlows = 3;

export default function Home() {
  const [progress, setProgress] = useState({ spend: 0, save: 0, invest: 0 });

  useEffect(() => {
    const target = { spend: 40, save: 30, invest: 30 };
    const duration = 900;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = Math.min(timestamp - startTime, duration);
      const ratio = elapsed / duration;

      setProgress({
        spend: Math.round(target.spend * ratio),
        save: Math.round(target.save * ratio),
        invest: Math.round(target.invest * ratio),
      });

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-12"
    >
      <section className="rounded-3xl bg-slate-950/95 p-6 sm:p-8 shadow-md shadow-slate-950/20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-lg bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/30 uppercase tracking-wider">
              Connect Sui wallet · Create Smart Wallet
            </span>
            <h1 className="orbitron text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One-click smart wallet for Sui money management.
            </h1>
            <p className="max-w-2xl text-cyan-100/70 text-sm sm:text-base">
              Connect your wallet, set default allocation rules, and let the
              smart agent split incoming Sui across spending, savings, goals,
              and yield.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-3 text-xs font-bold text-slate-950 uppercase tracking-wider transition hover:bg-cyan-400"
              >
                Open dashboard
                <FiArrowRight className="ml-2 h-4 w-4" />
              </a>
              <span className="text-xs text-cyan-300/60">
                Start with Spend & Save, Target Savings, Fixed Deposit, or
                Flexible Savings.
              </span>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-900/85 p-4">
            <div className="space-y-4">
              <div className="rounded-lg bg-black/80 p-4 border border-cyan-400/20">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cyan-300">
                      Sui wallet balance
                    </p>
                    <h2 className="text-lg font-bold text-white">
                      {walletBalance.toFixed(1)} SUI
                    </h2>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
                    Live
                  </span>
                </div>
                <div className="space-y-2 rounded-lg bg-black/60 p-3 border border-purple-400/20">
                  <div className="flex items-center justify-between text-xs text-cyan-200">
                    <span>Spend</span>
                    <span>{progress.spend}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-black/80 border border-cyan-400/30">
                    <div
                      className="h-1 rounded-full bg-linear-to-r from-cyan-400 to-purple-500"
                      style={{ width: `${progress.spend}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-cyan-200">
                    <span>Save</span>
                    <span>{progress.save}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-black/80 border border-cyan-400/30">
                    <div
                      className="h-1 rounded-full bg-linear-to-r from-purple-400 to-pink-500"
                      style={{ width: `${progress.save}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-cyan-200">
                    <span>Invest</span>
                    <span>{progress.invest}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-black/80 border border-cyan-400/30">
                    <div
                      className="h-1 rounded-full bg-linear-to-r from-pink-400 to-cyan-500"
                      style={{ width: `${progress.invest}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-black/80 p-4 border border-purple-400/20">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  Active money flows
                </p>
                <p className="mt-2 text-xs text-cyan-100/60">
                  {activeFlows} smart Sui components are working now inside your
                  wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-2xl bg-slate-900/85 p-4 transition hover:bg-slate-900/95"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs text-cyan-100/60">
                {feature.description}
              </p>
            </motion.article>
          );
        })}
      </section>

      <section className="rounded-3xl bg-slate-950/95 p-6 sm:p-8 shadow-md shadow-slate-950/20">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
              Create your component
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              4 steps to launch a financial component
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {creationSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-2xl bg-slate-900/80 p-4"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-cyan-100/60">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
