"use client";

import { useEffect, useState } from "react";
import {
  getCurrentSubscription,
  getUsage,
  upgradePlan,
  cancelSubscription,
} from "@/lib/api/billing.api";

export default function BillingPage() {
  const [usage, setUsage] = useState(null);
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadBilling() {
    try {
      const [usageData, subData] = await Promise.all([
        getUsage(),
        getCurrentSubscription(),
      ]);

      setUsage(usageData);
      setSub(subData);
    } catch (err) {
      console.error("Billing load error:", err);
      alert("Failed to load billing info");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBilling();
  }, []);

  async function handleUpgrade(plan) {
    try {
      await upgradePlan(plan);
      alert(`Upgraded to ${plan}`);
      loadBilling(); // refresh state instead of reload
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleCancel() {
    if (!confirm("Cancel subscription and downgrade to FREE?")) return;

    try {
      await cancelSubscription();
      alert("Subscription canceled");
      loadBilling();
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <div className="p-6">Loading billing…</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Billing</h1>

      {/* Current Plan */}
      <div className="border rounded-xl p-4">
        <p className="text-sm text-gray-500">Current Plan</p>
        <p className="text-xl font-medium">{sub?.plan}</p>
        <p className="text-sm text-gray-500">Status: {sub?.status}</p>
      </div>

      {/* Usage */}
      <div className="border rounded-xl p-4">
        <p className="text-sm text-gray-500">Monthly Resume Usage</p>
        <p className="text-lg">
          {usage?.resumesParsed} /{" "}
          {usage?.limit === null ? "Unlimited" : usage?.limit}
        </p>
      </div>

      {/* Actions */}
      <div className="space-x-3">
        {sub?.plan !== "PRO" && (
          <button
            onClick={() => handleUpgrade("PRO")}
            className="px-4 py-2 rounded-lg bg-black text-white text-sm"
          >
            Upgrade to PRO
          </button>
        )}

        {sub?.plan !== "TEAM" && (
          <button
            onClick={() => handleUpgrade("TEAM")}
            className="px-4 py-2 rounded-lg bg-black text-white text-sm"
          >
            Upgrade to TEAM
          </button>
        )}

        {sub?.plan !== "FREE" && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel Subscription
          </button>
        )}
      </div>
    </div>
  );
}
