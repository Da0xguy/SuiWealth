import { motion } from "framer-motion";
import { FiBook, FiLink, FiSmartphone } from "react-icons/fi";

const activeComponentCount = 4;
const walletBalance = 12.8;

const activeStreams = [
  {
    name: "Auto Route",
    detail: "Receipt triggered Sui splitting policy",
    status: "Live",
  },
  {
    name: "Yield Booster",
    detail: "Protocol allocation managed by the agent",
    status: "Active",
  },
  {
    name: "Savings Vault",
    detail: "Flexible Sui reserve guarding volatility",
    status: "Live",
  },
];

const documentation = [
  {
    title: "How pay streams work",
    summary: "Learn how Sui deposits route through policies.",
  },
  {
    title: "Create a new stream",
    summary: "Step-by-step flow for launching a component.",
  },
  {
    title: "Safe withdraw rules",
    summary: "When and how to end or withdraw an active policy.",
  },
];

export default function PayStream() {
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
            <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
              Money Rails
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Active pay streams
            </h2>
            <p className="mt-3 text-cyan-100/60 text-sm">
              Your Sui wallet streams funds into active policies and smart
              protocol allocations.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs text-cyan-300 ring-1 ring-cyan-400/50 font-bold uppercase tracking-wider">
            <FiLink className="h-4 w-4 text-cyan-400" /> {activeComponentCount}{" "}
            active comps
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-cyan-400/10 bg-black/70 p-4">
            <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
              Wallet balance
            </p>
            <p className="mt-3 text-3xl font-bold text-white">
              {walletBalance.toFixed(1)} SUI
            </p>
            <p className="mt-2 text-xs text-cyan-100/60">
              Constant landing balance used for onboarding previews.
            </p>
          </div>
          <div className="rounded-3xl border border-cyan-400/10 bg-black/70 p-4">
            <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
              Auto split
            </p>
            <p className="mt-3 text-sm font-bold text-white">
              Incoming Sui wallet deposits are split across active components
              automatically.
            </p>
            <p className="mt-2 text-xs text-cyan-100/60">
              The wallet triggers the splits when funds arrive, matching your
              USD component rules.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-3xl bg-slate-900/85 p-6"
        >
          <div className="inline-flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs text-cyan-300 ring-1 ring-cyan-400/50 font-bold uppercase tracking-wider">
            <FiSmartphone className="h-4 w-4 text-cyan-400" />
            Active policy streams
          </div>
          <div className="mt-6 space-y-4">
            {activeStreams.map((stream) => (
              <div
                key={stream.name}
                className="rounded-3xl border border-cyan-400/10 bg-black/70 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                      {stream.name}
                    </p>
                    <p className="mt-2 text-base font-bold text-white">
                      {stream.detail}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300 font-bold uppercase tracking-wider">
                    {stream.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-3xl bg-slate-900/85 p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-purple-300 font-bold">
                Documentation
              </p>
              <p className="mt-2 text-sm text-cyan-100/70">
                Quick reference for active streams and policy docs.
              </p>
            </div>
            <FiBook className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="mt-5 space-y-3">
            {documentation.map((doc) => (
              <div
                key={doc.title}
                className="rounded-3xl border border-cyan-400/10 bg-black/60 p-4"
              >
                <p className="text-sm font-semibold text-white">{doc.title}</p>
                <p className="mt-2 text-xs text-cyan-100/70">{doc.summary}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
