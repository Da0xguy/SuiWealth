import { useNavigate } from "react-router-dom";
import { components } from "../data/components";

export default function ComponentsIndex() {
  const navigate = useNavigate();

  const communityTemplates = [
    {
      title: "Yield Lock",
      subtitle: "Fixed Sui income policy",
      description:
        "A reusable Sui lock template that adjusts to protocol yields.",
    },
    {
      title: "Auto Saver",
      subtitle: "Spend & Save split",
      description:
        "A community-backed split that keeps liquidity and compounding reserves.",
    },
    {
      title: "DeFi Blend",
      subtitle: "Smart strategy",
      description:
        "A balanced Sui allocation across staking, pools, and protocol exposure.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-950/95 p-6">
        <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
          Build components
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">
          Create Sui smart components with symbols and community ideas.
        </h1>
        <p className="mt-3 text-sm text-cyan-100/70">
          Choose a component, then customize and activate it as a reusable
          policy.
        </p>
      </div>

      <div className="space-y-4">
        {components.map((component) => {
          const Icon = component.icon;
          return (
            <button
              key={component.slug}
              onClick={() => navigate(`/components/${component.slug}`)}
              className="w-full rounded-3xl border border-cyan-400/20 bg-black/70 p-5 text-left transition hover:border-cyan-400/40 hover:bg-black/80"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-white text-lg font-semibold">
                      {component.title}
                    </h2>
                    <p className="mt-2 text-sm text-cyan-100/70">
                      {component.category}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200 border border-cyan-400/20">
                  {component.badge}
                </span>
              </div>
              <p className="mt-4 text-sm text-cyan-100/70">
                {component.description}
              </p>
            </button>
          );
        })}
      </div>

      <section className="rounded-3xl border border-cyan-400/20 bg-black/80 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">
              Community suggestions
            </p>
            <p className="mt-2 text-sm text-cyan-100/70">
              Ideas other people have created that you can adopt or remix.
            </p>
          </div>
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200 border border-cyan-400/20">
            Popular
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {communityTemplates.map((template) => (
            <div
              key={template.title}
              className="rounded-3xl border border-cyan-400/10 bg-black/70 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {template.title}
                  </p>
                  <p className="mt-1 text-xs text-cyan-100/70">
                    {template.subtitle}
                  </p>
                </div>
                <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200 border border-cyan-400/20">
                  Community
                </span>
              </div>
              <p className="mt-3 text-xs text-cyan-100/70">
                {template.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
