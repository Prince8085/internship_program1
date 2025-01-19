import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  // TODO: Fetch the actual resume file from your storage
  const resumeContent = "This is a placeholder for the resume content"

  return new NextResponse(resumeContent, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume_${id}.pdf"`,
    },
  })
}

