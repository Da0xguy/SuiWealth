import {
  FiX,
  FiArrowUpRight,
  FiDollarSign,
  FiZap,
  FiCalendar,
} from "react-icons/fi";

interface ActiveComponentDetailProps {
  isOpen: boolean;
  onClose: () => void;
  component: {
    title: string;
    amount: string;
    status: string;
    description: string;
  };
  metrics: {
    amountInvested: string;
    currentValue: string;
    profitLoss: string;
    profitPercentage: string;
    yieldEarned: string;
    endDate: string;
    daysRemaining: number;
  };
}

export default function ActiveComponentDetail({
  isOpen,
  onClose,
  component,
  metrics,
}: ActiveComponentDetailProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl border border-cyan-400/20 bg-black/95 p-6 shadow-2xl shadow-cyan-500/30 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
              Active Policy
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {component.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 hover:text-slate-200 transition"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <p className="text-sm text-cyan-100/70 mb-6">{component.description}</p>

        {/* Status Badge */}
        <div className="mb-6">
          <span className="inline-flex rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider border border-emerald-400/30">
            {component.status}
          </span>
        </div>

        {/* Main Metrics Grid */}
        <div className="space-y-4 mb-6">
          {/* Amount Invested */}
          <div className="rounded-2xl bg-slate-900/85 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                Amount Invested
              </span>
              <DollarSign className="h-5 w-5 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {metrics.amountInvested}
            </p>
            <p className="mt-1 text-xs text-cyan-100/60">Initial allocation</p>
          </div>

          {/* Current Value */}
          <div className="rounded-2xl bg-slate-900/85 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                Current Value
              </span>
              <ArrowUpRight className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {metrics.currentValue}
            </p>
            <p className="mt-1 text-xs text-cyan-100/60">
              Including earned yield
            </p>
          </div>

          {/* Profit/Loss */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-900/85 p-4">
              <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-2">
                Profit/Loss
              </p>
              <p
                className={`text-xl font-bold ${
                  parseFloat(metrics.profitLoss) >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {metrics.profitLoss}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/85 p-4">
              <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-2">
                Return %
              </p>
              <p
                className={`text-xl font-bold ${
                  parseFloat(metrics.profitPercentage) >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {metrics.profitPercentage}%
              </p>
            </div>
          </div>

          {/* Yield Earned */}
          <div className="rounded-2xl bg-slate-900/85 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                Yield Earned
              </span>
              <Zap className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {metrics.yieldEarned}
            </p>
            <p className="mt-1 text-xs text-cyan-100/60">
              Generated from protocol
            </p>
          </div>
        </div>

        {/* End Date Info */}
        <div className="rounded-2xl bg-slate-950 p-4 mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
              Policy End Date
            </span>
            <Calendar className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-lg font-bold text-white">{metrics.endDate}</p>
          <p className="mt-2 text-xs text-cyan-100/70">
            {metrics.daysRemaining} days remaining
          </p>
          <div className="mt-3 w-full bg-slate-900 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full"
              style={{
                width: `${Math.max(0, Math.min(100, (metrics.daysRemaining / 365) * 100))}%`,
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            View Full Details
          </button>
          <button className="w-full rounded-2xl border border-cyan-400/20 bg-slate-800 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-slate-700">
            Withdraw Policy
          </button>
        </div>
      </div>
    </div>
  );
}

function DollarSign({ className }: { className: string }) {
  return <FiDollarSign className={className} />;
}

function ArrowUpRight({ className }: { className: string }) {
  return <FiArrowUpRight className={className} />;
}

function Zap({ className }: { className: string }) {
  return <FiZap className={className} />;
}

function Calendar({ className }: { className: string }) {
  return <FiCalendar className={className} />;
}
