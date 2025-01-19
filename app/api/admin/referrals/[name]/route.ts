import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: { name: string } }) {
  const { name } = params

  // TODO: Remove the referral name from your database
  console.log(`Removing referral name: ${name}`)

  return NextResponse.json({ success: true, message: "Referral name removed successfully" })
}

