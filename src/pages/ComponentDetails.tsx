import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { components } from "../data/components";
import { FiCheckCircle } from "react-icons/fi";
import { useToast, ToastContainer } from "../components/Toast";
import {
  sendInvestmentConfirmationEmail,
  generateConfirmationToken,
  generateConfirmationLink,
} from "../services/email";

const suiProtocols = [
  {
    id: "sui-stable-vault",
    name: "Sui Stable Yield Vault",
    description:
      "A low-volatility Sui-native stablecoin pool with consistent yield from USDC/SUI deposits.",
    expectedYield: "5.8% APR",
    reason:
      "Sui on-chain liquidity depth and stablecoin demand show this pool is likely to perform well in the current market.",
  },
  {
    id: "sui-liquid-optimizer",
    name: "Sui Liquidity Optimizer",
    description:
      "An active protocol that rebalances Sui assets into the strongest move-based pools.",
    expectedYield: "8.5% APR",
    reason:
      "It uses Sui transfer flows and on-chain program usage to pick the most promising pools.",
  },
  {
    id: "sui-yield-booster",
    name: "Sui Yield Booster",
    description:
      "A higher-return strategy targeting emerging Sui DeFi protocols with strong native demand.",
    expectedYield: "11.2% APR",
    reason:
      "The model prioritizes Sui move-protocol growth signals and reuses trusted native execution paths.",
  },
];

export default function ComponentDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toasts, addToast, removeToast, updateToast } = useToast();

  const component = useMemo(
    () => components.find((item) => item.slug === slug),
    [slug],
  );

  const [formState, setFormState] = useState<
    Record<string, string | undefined>
  >({});
  const [investmentPercent, setInvestmentPercent] = useState(30);
  const [suggestion, setSuggestion] = useState<null | (typeof suiProtocols)[0]>(
    null,
  );
  const [suggestionStatus, setSuggestionStatus] = useState<
    "idle" | "scouting" | "ready"
  >("idle");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [presenceAnswers, setPresenceAnswers] = useState({
    monthlyActive: false,
    weeklyTrading: false,
    riskTolerance: "medium" as "low" | "medium" | "high",
  });
  const [modalAction, setModalAction] = useState<"adopt" | "withdraw" | null>(
    null,
  );
  const [showSummary, setShowSummary] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const scoutBestProtocol = () => {
    setSuggestionStatus("scouting");
    setTimeout(() => {
      const protocol =
        investmentPercent <= 30
          ? suiProtocols[0]
          : investmentPercent <= 60
            ? suiProtocols[1]
            : suiProtocols[2];
      setSuggestion(protocol);
      setSuggestionStatus("ready");
    }, 700);
  };

  const isProtocolInvestment = component?.slug === "protocol-investments";
  const protocolInvestmentReady =
    isProtocolInvestment &&
    termsAgreed &&
    presenceAnswers.monthlyActive &&
    suggestion;

  useEffect(() => {
    if (component) {
      setFormState(
        component.initialValues as Record<string, string | undefined>,
      );
      setModalAction(null);
      setShowSummary(false);
      setShowConfirm(false);
      setShowResult(false);
    }
  }, [component]);

  if (!component) {
    return (
      <div className="rounded-3xl border border-cyan-400/20 bg-black/80 p-6 text-center">
        <p className="text-sm text-cyan-100/70">Component not found.</p>
        <button
          onClick={() => navigate("/components")}
          className="mt-4 rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Back to components
        </button>
      </div>
    );
  }

  const updateField = (key: string, value: string) => {
    setFormState((prev) => {
      const nextState = {
        ...prev,
        [key]: value,
      };

      if (component?.slug === "spend-save") {
        if (key === "spend") {
          const spendAmount = Math.max(0, Math.min(100, Number(value) || 0));
          nextState.save = String(100 - spendAmount);
        }
        if (key === "save") {
          const saveAmount = Math.max(0, Math.min(100, Number(value) || 0));
          nextState.spend = String(100 - saveAmount);
        }
      }

      if (component?.slug === "fixed-deposit" && key === "term") {
        const now = new Date();
        let maturity = new Date(now);

        if (value === "1 month") {
          maturity.setMonth(maturity.getMonth() + 1);
        } else if (value === "3 months") {
          maturity.setMonth(maturity.getMonth() + 3);
        } else if (value === "6 months") {
          maturity.setMonth(maturity.getMonth() + 6);
        } else if (value === "1 year") {
          maturity.setFullYear(maturity.getFullYear() + 1);
        }

        nextState.maturityDate = maturity.toISOString().split("T")[0];
      }

      return nextState;
    });
  };

  const adoptTemplate = (values: Record<string, string>) => {
    setFormState((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const beginAction = (action: "adopt" | "withdraw") => {
    if (isProtocolInvestment) {
      if (action === "adopt" && !protocolInvestmentReady) return;
    }
    setModalAction(action);
    setShowSummary(true);
  };

  const confirmAction = async () => {
    setShowSummary(false);
    setShowConfirm(true);

    let toastId = "";
    if (isProtocolInvestment && modalAction === "adopt") {
      // For protocol investments, send email and show processing toast
      toastId = addToast(
        "loading",
        "Processing investment adoption...",
        "Sending confirmation email with approval link",
      );

      try {
        const token = generateConfirmationToken();
        const confirmLink = generateConfirmationLink(token);

        const emailResult = await sendInvestmentConfirmationEmail({
          email: "user@example.com", // In production, get from user auth
          recipientName: "User",
          protocolName: suggestion?.name || "",
          expectedYield: suggestion?.expectedYield || "",
          investmentAmount: `${investmentPercent}% allocation`,
          confirmationLink: confirmLink,
        });

        if (emailResult.success) {
          updateToast(toastId, {
            type: "success",
            title: "Investment adoption in progress",
            message: `Confirmation email sent. Check your inbox to approve the ${suggestion?.name || "protocol investment"}.`,
            duration: 5000,
          });
        } else {
          updateToast(toastId, {
            type: "error",
            title: "Email sending failed",
            message: emailResult.error || "Could not send confirmation email",
            duration: 4000,
          });
        }
      } catch (error) {
        updateToast(toastId, {
          type: "error",
          title: "Processing failed",
          message: "An error occurred while processing your investment",
          duration: 4000,
        });
      }
    } else {
      // For regular policies, just show success
      toastId = addToast(
        "loading",
        "Adopting policy...",
        "Processing your Sui transaction",
      );

      await new Promise((r) => setTimeout(r, 1200));

      updateToast(toastId, {
        type: "success",
        title: "Policy adopted successfully",
        message: `${component?.title} is now active on your wallet.`,
        duration: 4000,
      });
    }

    setShowConfirm(false);
    setShowResult(true);
  };

  return (
    <div className="space-y-8">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="rounded-3xl border border-cyan-400/20 bg-black/80 p-6 text-left">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-lg bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/30 uppercase">
              {component.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-white">
              {component.title}
            </h1>
          </div>
          {component.badge && (
            <span className="rounded-xl bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200 ring-1 ring-cyan-400/30">
              {component.badge}
            </span>
          )}
        </div>
        <p className="mt-4 text-sm text-cyan-100/70">{component.description}</p>

        <div className="mt-6 space-y-5">
          {isProtocolInvestment ? (
            <>
              <div className="space-y-4 rounded-3xl bg-slate-900/85 p-5">
                <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                  Investment allocation
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="investmentPercent"
                      className="text-sm font-semibold text-white"
                    >
                      How much to invest?
                    </label>
                    <span className="text-sm text-cyan-200 font-semibold">
                      {investmentPercent}%
                    </span>
                  </div>
                  <input
                    id="investmentPercent"
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={investmentPercent}
                    onChange={(event) =>
                      setInvestmentPercent(Number(event.target.value))
                    }
                    className="w-full accent-cyan-400"
                  />
                  <p className="text-xs text-cyan-100/70">
                    The remaining balance stays in spend or savings.
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl bg-slate-900/85 p-5">
                <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                  Agreement terms
                </p>
                <div className="space-y-3 rounded-3xl bg-slate-950 p-4 max-h-40 overflow-y-auto text-xs text-cyan-100/70">
                  <p>
                    <strong>1. Investment Risk:</strong> You understand that Sui
                    protocol investments carry risk. Smart contracts may be
                    exploited and market conditions can change rapidly.
                  </p>
                  <p>
                    <strong>2. No Guarantee:</strong> Past protocol yields are
                    not guaranteed. The recommendation is based on on-chain
                    signals but is not a promise of future returns.
                  </p>
                  <p>
                    <strong>3. Auto-Rebalance:</strong> The smart agent will
                    automatically rebalance your allocation if the recommended
                    protocol changes or shows degraded performance.
                  </p>
                  <p>
                    <strong>4. Withdrawal:</strong> You can withdraw or end this
                    allocation at any time, subject to protocol lock-in periods.
                  </p>
                </div>
                <label className="flex items-start gap-3 mt-4">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-cyan-400"
                  />
                  <span className="text-xs text-cyan-100">
                    I agree to the terms and understand the risks.
                  </span>
                </label>
              </div>

              <div className="space-y-4 rounded-3xl bg-slate-900/85 p-5">
                <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                  User presence
                </p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={presenceAnswers.monthlyActive}
                      onChange={(e) =>
                        setPresenceAnswers({
                          ...presenceAnswers,
                          monthlyActive: e.target.checked,
                        })
                      }
                      className="h-4 w-4 accent-cyan-400"
                    />
                    <span className="text-sm text-cyan-100">
                      I monitor this wallet at least once per month
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={presenceAnswers.weeklyTrading}
                      onChange={(e) =>
                        setPresenceAnswers({
                          ...presenceAnswers,
                          weeklyTrading: e.target.checked,
                        })
                      }
                      className="h-4 w-4 accent-cyan-400"
                    />
                    <span className="text-sm text-cyan-100">
                      I am actively trading or managing Sui positions
                    </span>
                  </label>
                  <div>
                    <label
                      htmlFor="riskTolerance"
                      className="text-sm text-cyan-100"
                    >
                      Risk tolerance
                    </label>
                    <select
                      id="riskTolerance"
                      value={presenceAnswers.riskTolerance}
                      onChange={(e) =>
                        setPresenceAnswers({
                          ...presenceAnswers,
                          riskTolerance: e.target.value as any,
                        })
                      }
                      className="mt-2 w-full rounded-2xl border border-cyan-400/20 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={scoutBestProtocol}
                disabled={!termsAgreed || !presenceAnswers.monthlyActive}
                className={`w-full rounded-3xl px-5 py-3 text-sm font-semibold transition ${
                  !termsAgreed || !presenceAnswers.monthlyActive
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                }`}
              >
                {suggestionStatus === "scouting"
                  ? "Analyzing..."
                  : "Scout best Sui protocol"}
              </button>

              {suggestionStatus === "ready" && suggestion && (
                <div className="space-y-4 rounded-3xl bg-slate-950 p-5">
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {suggestion.name}
                      </p>
                      <p className="mt-1 text-xs text-cyan-100/70">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-900 p-3">
                      <p className="text-xs uppercase tracking-wider text-cyan-300">
                        Expected yield
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">
                        {suggestion.expectedYield}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-900 p-3">
                      <p className="text-xs uppercase tracking-wider text-cyan-300">
                        Risk
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">
                        {presenceAnswers.riskTolerance}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-cyan-100/70">
                    {suggestion.reason}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {component.preferences?.map((preference) => {
                const hasOptions = "options" in preference;
                return (
                  <label key={preference.key} className="block">
                    <span className="text-xs uppercase tracking-widest text-cyan-300">
                      {preference.label}
                    </span>
                    {hasOptions && (preference as any).options ? (
                      <select
                        value={formState[preference.key] || ""}
                        onChange={(e) =>
                          updateField(preference.key, e.target.value)
                        }
                        className="mt-2 w-full rounded-2xl border border-cyan-400/20 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                      >
                        {(preference as any).options?.map((option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={preference.type}
                        value={formState[preference.key] || ""}
                        onChange={(e) =>
                          updateField(preference.key, e.target.value)
                        }
                        placeholder={(preference as any).placeholder}
                        className="mt-2 w-full rounded-2xl border border-cyan-400/20 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                      />
                    )}
                  </label>
                );
              })}

              {component.formFields.map((field) => {
                const fieldOptions =
                  "options" in field ? (field as any).options : undefined;

                return (
                  <label key={field.key} className="block">
                    <span className="text-xs uppercase tracking-widest text-cyan-300">
                      {field.label}
                    </span>
                    {fieldOptions ? (
                      <select
                        value={formState[field.key] || ""}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-cyan-400/20 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                      >
                        {fieldOptions.map((option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        inputMode={
                          field.type === "number" ? "numeric" : undefined
                        }
                        value={formState[field.key] || ""}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        placeholder={(field as any).placeholder}
                        className="mt-2 w-full rounded-2xl border border-cyan-400/20 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                      />
                    )}
                  </label>
                );
              })}
            </>
          )}
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6">
          <button
            onClick={() => beginAction("adopt")}
            disabled={isProtocolInvestment && !protocolInvestmentReady}
            className={`w-full rounded-3xl px-6 py-4 font-semibold text-slate-950 transition ${
              isProtocolInvestment && !protocolInvestmentReady
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-400"
            }`}
          >
            {isProtocolInvestment ? "Adopt investment" : "Adopt Policy"}
          </button>
          {(component.status === "Active" || component.status === "Live") && (
            <button
              onClick={() => beginAction("withdraw")}
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-800 px-6 py-4 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              End / Withdraw Policy
            </button>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-400/20 bg-black/80 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-semibold">Suggested Templates</h2>
            <p className="mt-2 text-sm text-cyan-100/70">
              Use one of these starting points and apply it to the current flow.
            </p>
          </div>
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200 border border-cyan-400/20">
            Templates
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {component.templates.map((template) => (
            <div
              key={template.title}
              className="rounded-2xl border border-cyan-400/10 bg-black/60 p-4"
            >
              <h3 className="text-white text-sm font-semibold">
                {template.title}
              </h3>
              <p className="mt-2 text-xs text-cyan-100/70">
                {template.description}
              </p>
              <button
                onClick={() => adoptTemplate(template.values)}
                className="mt-4 rounded-xl bg-cyan-400/15 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/20"
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {showSummary ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-black/95 p-6 text-left shadow-2xl shadow-cyan-500/30">
            <div className="mb-5 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                Review adoption summary
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Confirm policy details before Sui approval
              </h2>
            </div>
            <div className="space-y-4 rounded-3xl bg-slate-950/70 p-4 text-sm text-cyan-100">
              <p className="text-cyan-200">Policy</p>
              <div className="grid gap-3 text-left text-sm">
                {component.preferences?.map((preference) => (
                  <div key={preference.key}>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                      {preference.label}
                    </p>
                    <p className="mt-1 text-white">
                      {formState[preference.key] || "—"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-cyan-400/20 pt-4">
                <p className="text-cyan-200">Configuration</p>
                <div className="mt-3 grid gap-3">
                  {component.formFields.map((field) => (
                    <div key={field.key}>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                        {field.label}
                      </p>
                      <p className="mt-1 text-white">
                        {formState[field.key] || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSummary(false)}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showConfirm ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-black/95 p-6 text-center shadow-2xl shadow-cyan-500/30">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
              {modalAction === "adopt"
                ? "Adopting policy"
                : "Withdrawing policy"}
            </p>
            <p className="mt-4 text-sm text-cyan-100/70">
              Sending Sui transaction. Please confirm in your wallet.
            </p>
            <div className="mt-6 inline-flex h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400"></div>
          </div>
        </div>
      ) : null}

      {showResult ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-black/95 p-6 text-center shadow-2xl shadow-cyan-500/30">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <FiCheckCircle className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
              {modalAction === "adopt" ? "Policy adopted" : "Policy withdrawn"}
            </p>
            <p className="mt-3 text-2xl font-bold text-white">
              {component.title}
            </p>
            <p className="mt-2 text-sm text-cyan-100/70">
              {modalAction === "adopt"
                ? "Your Sui wallet is now managing this financial component automatically."
                : "This policy has been ended. Your Sui is no longer subject to these rules."}
            </p>
            <button
              onClick={() => {
                setShowResult(false);
                navigate("/dashboard");
              }}
              className="mt-6 w-full rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              View dashboard
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
