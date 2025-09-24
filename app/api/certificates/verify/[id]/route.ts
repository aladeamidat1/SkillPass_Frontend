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
    universityName: "University of Technology",
    description: "Computer Science degree with specialization in AI",
    createdAt: "2024-06-15T10:00:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const certificate = certificates.find((cert) => cert.id === params.id)

  if (!certificate) {
    return NextResponse.json({
      success: false,
      verified: false,
      message: "Certificate not found",
    })
  }

  if (certificate.status !== "issued") {
    return NextResponse.json({
      success: false,
      verified: false,
      message: "Certificate is not issued yet",
    })
  }

  // Simulate blockchain verification
  const blockchainVerified = certificate.blockchainHash && certificate.blockchainHash.startsWith("0x")

  return NextResponse.json({
    success: true,
    verified: blockchainVerified,
    certificate: {
      ...certificate,
      verificationDate: new Date().toISOString(),
      blockchainNetwork: "Ethereum Mainnet",
      transactionHash: certificate.blockchainHash,
    },
    message: blockchainVerified ? "Certificate verified successfully" : "Certificate verification failed",
  })
}
