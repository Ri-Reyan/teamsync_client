"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  period?: string;
  popular?: boolean;
  bgColor: string;
  btnBg: string;
  btnText: string;
  features: string[];
}

const pricingPlans: PricingTier[] = [
  {
    name: "STARTER",
    tagline: "Perfect for small teams just getting started",
    price: "$0",
    period: "/forever",
    popular: false,
    bgColor: "bg-white",
    btnBg: "bg-[#FF6B6B]",
    btnText: "text-white",
    features: [
      "Up to 5 team members",
      "Isolated Workspace (Single Tenant)",
      "Real-time Kanban Sync (Socket.io)",
      "Basic AI Task Summaries (10/mo)",
      "Community Support",
      "Mobile & Web access",
    ],
  },
  {
    name: "PROFESSIONAL",
    tagline: "For growing teams that need more power",
    price: "$49",
    period: "/mo",
    popular: true,
    bgColor: "bg-black text-white",
    btnBg: "bg-[#FFD93D]",
    btnText: "text-black",
    features: [
      "Up to 50 team members",
      "Unlimited Isolated Workspaces",
      "Sub-second Real-time Socket Sync",
      "Unlimited AI Weekly Digests & Summaries",
      "RBAC Role-Based Access Control",
      "Priority 24/7 Support",
      "Custom Workflow Automation",
      "Full API Access & Webhooks",
    ],
  },
  {
    name: "ENTERPRISE",
    tagline: "For organizations that need advanced features",
    price: "Custom",
    popular: false,
    bgColor: "bg-white",
    btnBg: "bg-[#FF6B6B]",
    btnText: "text-white",
    features: [
      "Unlimited team members",
      "Dedicated Database & SLA Guarantees",
      "Custom AI Model Fine-tuning",
      "Dedicated Account Manager",
      "Custom Integrations & Audit Logs",
      "Custom Contract & Billing",
    ],
  },
];

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.from(".pricing-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // 2. Pricing Cards Reveal
      gsap.from(".pricing-card", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // 3. Sequential Staggered Features Animation (Blank to Visible One-by-One)
      pricingPlans.forEach((_, cardIndex) => {
        const featureItems = `.feature-item-${cardIndex}`;

        gsap.from(featureItems, {
          x: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.pricing-card-${cardIndex}`,
            start: "top 70%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full border-b-4 border-black bg-[#FFFDF5] py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title Header */}
        <div className="pricing-header text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            SIMPLE, TRANSPARENT <br />
            PRICING
          </h2>

          <div className="inline-block border-2 border-black bg-[#FFD93D] px-4 py-1.5 neo-shadow-sm font-black text-xs sm:text-sm uppercase">
            Choose the plan that&apos;s right for your team
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`pricing-card pricing-card-${idx} relative flex flex-col justify-between neo-border neo-shadow-lg p-6 sm:p-8 ${plan.bgColor}`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 border-2 border-black bg-[#FFD93D] px-4 py-1 font-black text-xs uppercase tracking-wider text-black neo-shadow-sm flex items-center gap-1">
                  <Sparkles className="size-3.5 fill-black" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                {/* Plan Title & Tagline */}
                <div className="text-center pb-6 border-b-2 border-current">
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs font-bold opacity-80 min-h-8">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="text-center py-6 border-b-2 border-current">
                  <span className="text-5xl font-black tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm font-bold opacity-80">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Features List (One after one animated) */}
                <ul className="py-6 space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className={`feature-item-${idx} flex items-start gap-3 text-sm font-bold`}
                    >
                      <div className="mt-0.5 p-0.5 border-2 border-current bg-[#FFD93D] text-black shrink-0">
                        <Check className="size-3.5 stroke-4" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t-2 border-current">
                <button
                  className={`w-full neo-btn py-3.5 px-4 font-black uppercase text-sm tracking-wider ${plan.btnBg} ${plan.btnText}`}
                >
                  {plan.name === "ENTERPRISE"
                    ? "CONTACT SALES"
                    : "START FREE TRIAL"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
