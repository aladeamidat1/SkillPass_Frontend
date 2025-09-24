"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  Search,
  QrCode,
  Shield,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Building2,
  User,
  Hash,
  ExternalLink,
  Download,
  Copy,
  Scan,
  FileText,
} from "lucide-react"

// Mock verification data
const mockVerificationResult = {
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
}

export default function VerifyPage() {
  const [verificationInput, setVerificationInput] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<typeof mockVerificationResult | null>(null)
  const [showScanner, setShowScanner] = useState(false)

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!verificationInput.trim()) return

    setIsVerifying(true)
    // Simulate API call
    setTimeout(() => {
      setVerificationResult(mockVerificationResult)
      setIsVerifying(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-employer/10 border border-employer/20 mb-6">
            <Shield className="h-4 w-4 text-employer mr-2" />
            <span className="text-sm text-employer font-medium">Instant Verification</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Verify Certificate</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Instantly verify the authenticity of any SkillPass certificate using blockchain technology
          </p>
        </div>

        {/* Verification Form */}
        <Card className="mb-8 border-employer/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-employer" />
              Enter Certificate Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerification} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Enter certificate ID, verification link, or blockchain hash"
                    value={verificationInput}
                    onChange={(e) => setVerificationInput(e.target.value)}
                    className="pr-12"
                    disabled={isVerifying}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowScanner(!showScanner)}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>

                {showScanner && (
                  <Card className="border-employer/20 bg-employer/5">
                    <CardContent className="p-6 text-center">
                      <Scan className="h-12 w-12 text-employer mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">QR Code Scanner</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Position the QR code within the camera frame to scan
                      </p>
                      <Button variant="outline" onClick={() => setShowScanner(false)}>
                        Close Scanner
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-employer hover:bg-employer/90 text-employer-foreground"
                disabled={isVerifying || !verificationInput.trim()}
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Verify Certificate
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Verification Result */}
        {verificationResult && (
          <div className="space-y-6">
            {/* Status Card */}
            <Card
              className={`border-2 ${
                verificationResult.isValid
                  ? "border-employer/50 bg-employer/5"
                  : "border-destructive/50 bg-destructive/5"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {verificationResult.isValid ? (
                    <CheckCircle className="h-12 w-12 text-employer" />
                  ) : (
                    <AlertTriangle className="h-12 w-12 text-destructive" />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {verificationResult.isValid ? "Certificate Verified" : "Verification Failed"}
                    </h2>
                    <p className="text-muted-foreground">
                      {verificationResult.isValid
                        ? "This certificate is authentic and has been verified on the blockchain"
                        : "This certificate could not be verified or may be invalid"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Details */}
            {verificationResult.isValid && (
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
                        <p className="text-lg font-semibold">{verificationResult.certificate.title}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{verificationResult.certificate.studentName}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Issuing Institution</label>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">{verificationResult.certificate.institution}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Issue Date</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium">
                            {new Date(verificationResult.certificate.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Grade/Result</label>
                        <p className="font-medium">{verificationResult.certificate.grade}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Credential Type</label>
                        <Badge className="bg-employer/10 text-employer border-employer/20">
                          {verificationResult.certificate.credentialType}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <label className="text-sm font-medium text-muted-foreground">Blockchain Hash</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <code className="text-sm bg-muted px-3 py-2 rounded font-mono flex-1">
                        {verificationResult.certificate.blockchainHash}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(verificationResult.certificate.blockchainHash)}
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
            )}

            {/* Verification Details */}
            {verificationResult.isValid && (
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
                          {verificationResult.verificationDetails.blockchainNetwork}
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
                          {new Date(verificationResult.verificationDetails.verifiedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* How it Works */}
        {!verificationResult && (
          <Card className="border-employer/20 bg-employer/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-employer" />
                How Verification Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-employer/10 border border-employer/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-employer font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Enter Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Paste the certificate ID, verification link, or scan the QR code
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-employer/10 border border-employer/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-employer font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Blockchain Check</h3>
                  <p className="text-sm text-muted-foreground">
                    Our system queries the blockchain to verify authenticity
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-employer/10 border border-employer/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-employer font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get immediate verification results with detailed certificate information
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="border-employer/20 bg-employer/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-employer mt-0.5" />
              <div>
                <h3 className="font-semibold text-employer mb-1">Secure & Reliable</h3>
                <p className="text-sm text-muted-foreground">
                  All verifications are performed against the immutable blockchain record. Certificates cannot be
                  forged, altered, or falsified once issued by verified institutions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
