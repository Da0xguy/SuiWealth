import { motion } from "framer-motion";
import { FiArchive, FiCopy, FiShare2 } from "react-icons/fi";

const policies = [
  {
    title: "SalaryStream Router",
    badge: "High Yield",
    description:
      "40% spend / 30% flexible yield / 20% fixed deposit / 10% LP savings.",
    tags: ["Salary", "Remittance", "Auto-split"],
  },
  {
    title: "RemitShield Policy",
    badge: "Conditional",
    description:
      "If amount > $500, add 10% to emergency vault, else route to family savings.",
    tags: ["Family", "Trust", "Conditional"],
  },
  {
    title: "Daily Stream Saver",
    badge: "Composable",
    description:
      "Stream small amounts daily while minting a yield receipt position object.",
    tags: ["Streaming", "Receipt NFT", "Policy Object"],
  },
];

export default function Policies() {
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
              Policy Library
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Programmable Policies
            </h2>
            <p className="mt-3 text-cyan-100/60 text-sm">
              Create reusable on-chain policy objects that control exactly how
              your funds flow.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs text-cyan-300 ring-1 ring-cyan-400/50 font-bold uppercase tracking-wider">
            <FiArchive className="h-4 w-4 text-cyan-400" />3 Active
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {policies.map((policy) => (
          <motion.article
            key={policy.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-3xl bg-slate-900/85 p-4 transition hover:bg-slate-900/95"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {policy.title}
                </h3>
                <p className="mt-2 text-xs text-cyan-100/60">
                  {policy.description}
                </p>
              </div>
              <span className="rounded-full bg-slate-800/80 px-2 py-1 text-xs text-cyan-200 font-bold uppercase tracking-wider whitespace-nowrap">
                {policy.badge}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {policy.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/60 px-2 py-0.5 text-xs text-cyan-300 border border-cyan-400/20 font-bold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 text-xs">
              <button className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/30 bg-black/60 px-3 py-1.5 text-white transition hover:bg-black/80 font-bold uppercase tracking-wider">
                <FiCopy className="h-3 w-3" />
                Clone
              </button>
              <button className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 px-3 py-1.5 font-bold text-black uppercase tracking-wider transition hover:shadow-lg hover:shadow-cyan-500/50">
                <FiShare2 className="h-3 w-3" />
                Share
              </button>
            </div>
          </motion.article>
        ))}
      </section>
    </motion.div>
  );
}
