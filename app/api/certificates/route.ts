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
  {
    id: "2",
    studentName: "Jane Smith",
    studentEmail: "jane@example.com",
    title: "Master of Business Administration",
    credentialType: "Masters",
    grade: "Distinction",
    issueDate: "2024-05-20",
    status: "issued",
    blockchainHash: "0xabcdef1234567890",
    universityId: "uni-1",
    description: "MBA with focus on Digital Transformation",
    createdAt: "2024-05-20T14:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const universityId = searchParams.get("universityId")
  const studentEmail = searchParams.get("studentEmail")
  const status = searchParams.get("status")

  let filteredCertificates = certificates

  if (universityId) {
    filteredCertificates = filteredCertificates.filter((cert) => cert.universityId === universityId)
  }

  if (studentEmail) {
    filteredCertificates = filteredCertificates.filter((cert) => cert.studentEmail === studentEmail)
  }

  if (status) {
    filteredCertificates = filteredCertificates.filter((cert) => cert.status === status)
  }

  return NextResponse.json({
    certificates: filteredCertificates,
    total: filteredCertificates.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const newCertificate = {
      id: Date.now().toString(),
      ...data,
      status: data.action === "issue" ? "issued" : "draft",
      blockchainHash: data.action === "issue" ? `0x${Math.random().toString(16).substr(2, 16)}` : null,
      createdAt: new Date().toISOString(),
      universityId: "uni-1", // In production, get from authenticated user
    }

    certificates.push(newCertificate)

    return NextResponse.json({
      success: true,
      certificate: newCertificate,
      message: data.action === "issue" ? "Certificate issued successfully" : "Certificate saved as draft",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create certificate" }, { status: 500 })
  }
}
