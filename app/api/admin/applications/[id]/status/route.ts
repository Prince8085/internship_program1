import { NextResponse } from 'next/server'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const { status } = await request.json()

  // TODO: Update the application status in your database
  console.log(`Updating application ${id} status to ${status}`)

  return NextResponse.json({ success: true, message: "Status updated successfully" })
}

