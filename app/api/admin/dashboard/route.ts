import { NextResponse } from 'next/server'

export async function GET() {
  // TODO: Fetch real data from your database
  const dashboardData = {
    totalApplications: 128,
    pendingReview: 12,
    approved: 98,
    totalRevenue: 470000
  }

  return NextResponse.json(dashboardData)
}

