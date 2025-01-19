import { NextResponse } from 'next/server'

let referralNames = ["Amit Shah", "Priya Sharma", "Rajesh Kumar"] // This should be stored in a database

export async function GET() {
  return NextResponse.json({ referralNames })
}

export async function POST(request: Request) {
  const { name } = await request.json()

  if (!referralNames.includes(name)) {
    referralNames.push(name)
    return NextResponse.json({ success: true, message: "Referral name added successfully" })
  } else {
    return NextResponse.json({ success: false, message: "Referral name already exists" }, { status: 400 })
  }
}

