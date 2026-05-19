import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiCopy,
  FiLayers,
  FiShield,
  FiTarget,
  FiDollarSign,
} from "react-icons/fi";

const components = [
  {
    title: "Fixed Deposit",
    category: "Savings",
    badge: "Setable",
    description:
      "Lock dollars with a configurable duration, maturity date, and yield profile.",
    tags: ["Yield", "Lock", "Date"],
    icon: FiShield,
    status: "Ready",
    target: "4.5% APR",
    note: "Set amount, duration, maturity date, and yield manually.",
    formFields: [
      { key: "amount", label: "Amount", type: "text", placeholder: "$12,000" },
      {
        key: "duration",
        label: "Duration",
        type: "text",
        placeholder: "90 days",
      },
      {
        key: "maturityDate",
        label: "Maturity date",
        type: "text",
        placeholder: "2026-12-31",
      },
      { key: "yield", label: "Yield", type: "text", placeholder: "4.5% APR" },
    ],
    initialValues: {
      amount: "$12,000",
      duration: "90 days",
      maturityDate: "2026-12-31",
      yield: "4.5% APR",
    },
  },
  {
    title: "Spend & Save",
    category: "Budget",
    badge: "Copyable",
    description:
      "Split every incoming USD deposit across spend and save buckets automatically.",
    tags: ["Budget", "Auto-Split", "USD"],
    icon: FiDollarSign,
    status: "Active",
    target: "40 / 60 split",
    note: "Adjust the split ratios for every incoming wallet deposit.",
    formFields: [
      { key: "spend", label: "Spend", type: "text", placeholder: "40%" },
      { key: "save", label: "Save", type: "text", placeholder: "60%" },
      {
        key: "notes",
        label: "Notes",
        type: "text",
        placeholder: "Auto-split on receipt",
      },
    ],
    initialValues: {
      spend: "40%",
      save: "60%",
      notes: "Auto-split on receipt",
    },
  },
  {
    title: "Target Saving",
    category: "Savings",
    badge: "Sharable",
    description:
      "Create a goal-driven USD bucket that collects until the target is reached.",
    tags: ["Goal", "Target", "USD"],
    icon: FiTarget,
    status: "Pending",
    target: "$5,000 goal",
    note: "Set the target amount, deadline, and destination manually.",
    formFields: [
      { key: "goal", label: "Goal", type: "text", placeholder: "$5,000" },
      {
        key: "deadline",
        label: "Deadline",
        type: "text",
        placeholder: "Jul 31",
      },
      {
        key: "route",
        label: "Route",
        type: "text",
        placeholder: "Save until goal met",
      },
    ],
    initialValues: {
      goal: "$5,000",
      deadline: "Jul 31",
      route: "Save until goal met",
    },
  },
  {
    title: "Protocol Investments",
    category: "Investments",
    badge: "Composable",
    description:
      "Allocate USD into Sui DeFi strategies and keep components reusable.",
    tags: ["DeFi", "Protocols", "USD"],
    icon: FiLayers,
    status: "Live",
    target: "Multi-pool",
    note: "Tune strategy, pool, and allocation manually.",
    formFields: [
      {
        key: "strategy",
        label: "Strategy",
        type: "text",
        placeholder: "Yield Booster",
      },
      { key: "pool", label: "Pool", type: "text", placeholder: "SUI/USDC" },
      {
        key: "allocation",
        label: "Allocation",
        type: "text",
        placeholder: "60% / 40%",
      },
    ],
    initialValues: {
      strategy: "Yield Booster",
      pool: "SUI/USDC",
      allocation: "60% / 40%",
    },
  },
];

const categories = [
  { title: "Savings" },
  { title: "Budget" },
  { title: "Investments" },
];

const suggestedTemplates = [
  {
    title: "Auto Save Split",
    component: "Spend & Save",
    description:
      "Adopt a ready USD split that saves 60% and spends 40% as funds land in the wallet.",
    values: {
      spend: "40%",
      save: "60%",
      notes: "Auto-split on wallet receipt",
    },
  },
  {
    title: "Goal Target",
    component: "Target Saving",
    description:
      "Use a USD goal template that saves until the balance reaches $5,000.",
    values: {
      goal: "$5,000",
      deadline: "Jul 31",
      route: "Save until goal met",
    },
  },
  {
    title: "Yield Lock",
    component: "Fixed Deposit",
    description:
      "Adopt a dated fixed deposit with a maturity date and locked dollar amount.",
    values: {
      amount: "$12,000",
      duration: "90 days",
      maturityDate: "2026-12-31",
      yield: "4.5% APR",
    },
  },
];

export default function Components() {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState(
    params.componentId
      ? decodeURIComponent(params.componentId)
      : components[0].title,
  );
  const [formState, setFormState] = useState<
    Record<string, Record<string, string>>
  >(() =>
    components.reduce(
      (acc, component) => {
        acc[component.title] = component.initialValues as unknown as Record<
          string,
          string
        >;
        return acc;
      },
      {} as Record<string, Record<string, string>>,
    ),
  );

  useEffect(() => {
    if (params.componentId) {
      const decoded = decodeURIComponent(params.componentId);
      const exists = components.some(
        (component) => component.title === decoded,
      );
      if (exists) {
        setSelectedComponent(decoded);
      } else {
        navigate("/components", { replace: true });
      }
    }
  }, [params.componentId, navigate]);

  const active =
    components.find((component) => component.title === selectedComponent) ||
    components[0];
  const activeComponentCount = components.filter(
    (item) => item.status === "Active" || item.status === "Live",
  ).length;

  const adoptTemplate = (template: {
    component: string;
    values: Record<string, string | undefined>;
  }) => {
    setSelectedComponent(template.component);
    setFormState((prev) => ({
      ...prev,
      [template.component]: {
        ...prev[template.component],
        ...(template.values as Record<string, string>),
      },
    }));
  };

  const updateField = (key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [selectedComponent]: {
        ...prev[selectedComponent],
        [key]: value,
      },
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-10"
    >
      <section className="rounded-2xl border border-cyan-400/40 bg-linear-to-br from-black via-purple-900/30 to-black p-6 sm:p-8 shadow-2xl shadow-cyan-500/20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
              Financial Components
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Every component is manually configured for USD flows.
            </h2>
            <p className="mt-3 text-cyan-100/60 text-sm">
              Start from suggested templates, then edit each component directly.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs text-cyan-300 ring-1 ring-cyan-400/50 font-bold uppercase tracking-wider">
            <FiLayers className="h-4 w-4 text-cyan-400" />
            {activeComponentCount} active flows
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.75fr]">
        <div className="rounded-3xl border border-cyan-400/20 bg-black/80 p-5 shadow-sm shadow-cyan-500/5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                Selected component
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {active.title}
              </h2>
              <p className="mt-3 text-sm text-cyan-100/70">{active.note}</p>
            </div>
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200 border border-cyan-400/20">
              {active.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            {active.formFields.map((field) => (
              <label key={field.key} className="block">
                <span className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  value={formState[selectedComponent][field.key]}
                  onChange={(event) =>
                    updateField(field.key, event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-cyan-400/20 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                  placeholder={field.placeholder}
                />
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button className="rounded-2xl bg-cyan-400/15 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25">
              Save settings
            </button>
            <button className="rounded-2xl border border-cyan-400/20 bg-black/60 px-4 py-3 text-sm text-cyan-100 transition hover:bg-black/80">
              Copy component
            </button>
            <button className="rounded-2xl border border-cyan-400/20 bg-black/60 px-4 py-3 text-sm text-cyan-100 transition hover:bg-black/80">
              Share template
            </button>
          </div>
          <div className="mt-6 rounded-3xl bg-cyan-400/10 p-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Ready to adopt this policy?
            </p>
            <p className="mt-2 text-sm text-cyan-100/80">
              This will start the policy and make the component live on future
              payments.
            </p>
            <button className="mt-5 inline-flex rounded-3xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              Adopt policy
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border border-cyan-400/10 bg-black/80 p-4"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300 font-semibold">
                {category.title}
              </p>
              <div className="mt-3 space-y-3">
                {components
                  .filter((component) => component.category === category.title)
                  .map((component) => (
                    <button
                      key={component.title}
                      type="button"
                      onClick={() => {
                        const slug = encodeURIComponent(component.title);
                        navigate(`/components/${slug}`);
                      }}
                      className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                        selectedComponent === component.title
                          ? "border-cyan-400/70 bg-cyan-400/10"
                          : "border-cyan-400/10 bg-black/60 hover:border-cyan-400/40 hover:bg-black/70"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {component.title}
                          </p>
                          <p className="mt-2 text-xs text-cyan-200/80">
                            {component.description}
                          </p>
                        </div>
                        <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-200 ring-1 ring-cyan-400/20">
                          {component.badge}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-[11px] text-cyan-300">
                        <span>{component.target}</span>
                        <span>{component.status}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-cyan-400/10 bg-black/80 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
                Suggested templates
              </p>
              <p className="mt-2 text-sm text-cyan-100/70">
                Use these sample USD flows as a starting point and adopt them
                directly into your manual setup.
              </p>
            </div>
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200 border border-cyan-400/20">
              Adoptable
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {suggestedTemplates.map((template) => (
              <div
                key={template.title}
                className="rounded-3xl border border-cyan-400/10 bg-black/70 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {template.title}
                    </p>
                    <p className="mt-2 text-xs text-cyan-200/80">
                      {template.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => adoptTemplate(template)}
                    className="inline-flex items-center gap-1 rounded-2xl bg-cyan-400/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400/25"
                  >
                    <FiCopy className="h-3 w-3" />
                    Adopt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
