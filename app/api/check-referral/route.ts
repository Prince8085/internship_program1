import { NextResponse } from 'next/server'

// This would typically come from a database
const validReferrers = [
  "Amit Shah",
  "Priya Sharma",
  "Rajesh Kumar",
  // Add more valid referrers
]

export async function POST(request: Request) {
  const { referrerName } = await request.json()

  const isValid = validReferrers.includes(referrerName)

  return NextResponse.json({ isValid })
}

