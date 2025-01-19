import { ReferralManager } from "@/components/ReferralManager"

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Referral Management</h1>
      <div className="bg-background/95 p-4 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Manage Referral Names</h2>
        <p className="text-sm text-muted-foreground">
          Add or remove referral names for the internship program. These names will be used to validate referrals during the application process.
        </p>
      </div>
      <ReferralManager />
    </div>
  )
}

