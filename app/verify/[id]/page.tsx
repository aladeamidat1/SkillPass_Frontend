"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  CheckCircle,
  AlertTriangle,
  Calendar,
  Building2,
  User,
  Hash,
  ExternalLink,
  Download,
  Copy,
  FileText,
  Shield,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Mock certificate data
const mockCertificateData = {
  cert_001: {
    isValid: true,
    certificate: {
      id: "cert_001",
      title: "Bachelor of Computer Science",
      studentName: "Alice Johnson",
      institution: "Tech University",
      issueDate: "2024-05-15",
      grade: "First Class Honours",
      credentialType: "Degree",
      blockchainHash: "0x1234567890abcdef1234567890abcdef12345678",
      verificationUrl: "https://skillpass.app/verify/cert_001",
    },
    verificationDetails: {
      blockchainNetwork: "Sui Mainnet",
      contractAddress: "0xabcd...1234",
      transactionHash: "0x9876...5432",
      verifiedAt: new Date().toISOString(),
      issuerVerified: true,
      tamperProof: true,
    },
  },
}

export default function VerifyCertificatePage() {
  const params = useParams()
  const certificateId = params.id as string
  const [certificateData, setCertificateData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch certificate data
    setTimeout(() => {
      const data = mockCertificateData[certificateId as keyof typeof mockCertificateData]
      setCertificateData(data || { isValid: false })
      setIsLoading(false)
    }, 1000)
  }, [certificateId])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-employer mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying Certificate</h2>
            <p className="text-muted-foreground">Please wait while we verify the certificate on the blockchain...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link
          href="/verify"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to verification
        </Link>

        {/* Status Card */}
        <Card
          className={`mb-8 border-2 ${
            certificateData?.isValid ? "border-employer/50 bg-employer/5" : "border-destructive/50 bg-destructive/5"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {certificateData?.isValid ? (
                <CheckCircle className="h-12 w-12 text-employer" />
              ) : (
                <AlertTriangle className="h-12 w-12 text-destructive" />
              )}
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {certificateData?.isValid ? "Certificate Verified" : "Certificate Not Found"}
                </h1>
                <p className="text-muted-foreground">
                  {certificateData?.isValid
                    ? "This certificate is authentic and has been verified on the blockchain"
                    : "This certificate could not be found or may be invalid"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Details */}
        {certificateData?.isValid && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-employer" />
                  Certificate Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Certificate Title</label>
                      <p className="text-lg font-semibold">{certificateData.certificate.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{certificateData.certificate.studentName}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Issuing Institution</label>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{certificateData.certificate.institution}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Issue Date</label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">
                          {new Date(certificateData.certificate.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Grade/Result</label>
                      <p className="font-medium">{certificateData.certificate.grade}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Credential Type</label>
                      <Badge className="bg-employer/10 text-employer border-employer/20">
                        {certificateData.certificate.credentialType}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <label className="text-sm font-medium text-muted-foreground">Blockchain Hash</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <code className="text-sm bg-muted px-3 py-2 rounded font-mono flex-1">
                      {certificateData.certificate.blockchainHash}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(certificateData.certificate.blockchainHash)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <ExternalLink className="h-4 w-4" />
                    View on Blockchain
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-employer" />
                  Verification Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">Blockchain Network</span>
                      <Badge className="bg-employer/10 text-employer border-employer/20">
                        {certificateData.verificationDetails.blockchainNetwork}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">Issuer Verified</span>
                      <Badge className="bg-employer/10 text-employer border-employer/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">Tamper-Proof</span>
                      <Badge className="bg-employer/10 text-employer border-employer/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Confirmed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">Verified At</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(certificateData.verificationDetails.verifiedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Not Found State */}
        {!certificateData?.isValid && (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Certificate Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The certificate with ID "{certificateId}" could not be found or verified on the blockchain.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>This could mean:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>The certificate ID is incorrect</li>
                  <li>The certificate has not been issued yet</li>
                  <li>The certificate has been revoked</li>
                  <li>The link may be expired or invalid</li>
                </ul>
              </div>
              <Link href="/verify">
                <Button className="bg-employer hover:bg-employer/90">Try Another Verification</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="mt-8 border-employer/20 bg-employer/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-employer mt-0.5" />
              <div>
                <h3 className="font-semibold text-employer mb-1">Verification Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  This verification is performed against the immutable blockchain record. The certificate authenticity
                  is guaranteed by cryptographic proof and cannot be falsified.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
