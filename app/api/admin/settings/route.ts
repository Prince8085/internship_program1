import { NextResponse } from 'next/server'

let prices = {
  internshipFee: 5000,
  referralDiscount: 300,
  discountedFee: 2200,
}

export async function GET() {
  return NextResponse.json(prices)
}

export async function PUT(request: Request) {
  const updatedPrices = await request.json()
  prices = { ...prices, ...updatedPrices }
  return NextResponse.json({ success: true, message: "Prices updated successfully" })
}

