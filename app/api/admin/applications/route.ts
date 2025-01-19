import { NextResponse } from 'next/server'

// This would typically come from a database
const applications = [
  // ... (previous application objects)
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const status = searchParams.get('status')
  const pageSize = 10

  let filteredApplications = applications

  if (status && status !== 'all') {
    filteredApplications = applications.filter(app => app.status === status)
  }

  const totalPages = Math.ceil(filteredApplications.length / pageSize)
  const paginatedApplications = filteredApplications.slice((page - 1) * pageSize, page * pageSize)

  return NextResponse.json({
    applications: paginatedApplications,
    totalPages,
  })
}

