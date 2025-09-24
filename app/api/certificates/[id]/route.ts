import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, this would connect to your actual database
const certificates: any[] = [
  {
    id: "1",
    studentName: "John Doe",
    studentEmail: "john@example.com",
    title: "Bachelor of Computer Science",
    credentialType: "Degree",
    grade: "First Class Honours",
    issueDate: "2024-06-15",
    status: "issued",
    blockchainHash: "0x1234567890abcdef",
    universityId: "uni-1",
    description: "Computer Science degree with specialization in AI",
    createdAt: "2024-06-15T10:00:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const certificate = certificates.find((cert) => cert.id === params.id)

  if (!certificate) {
    return NextResponse.json({ success: false, message: "Certificate not found" }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    certificate,
  })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const certificateIndex = certificates.findIndex((cert) => cert.id === params.id)

    if (certificateIndex === -1) {
      return NextResponse.json({ success: false, message: "Certificate not found" }, { status: 404 })
    }

    certificates[certificateIndex] = {
      ...certificates[certificateIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      certificate: certificates[certificateIndex],
      message: "Certificate updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update certificate" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const certificateIndex = certificates.findIndex((cert) => cert.id === params.id)

  if (certificateIndex === -1) {
    return NextResponse.json({ success: false, message: "Certificate not found" }, { status: 404 })
  }

  certificates.splice(certificateIndex, 1)

  return NextResponse.json({
    success: true,
    message: "Certificate deleted successfully",
  })
}
