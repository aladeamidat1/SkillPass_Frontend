"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { CertificateShareModal } from "@/components/certificate-share-modal"
import {
  GraduationCap,
  Share2,
  QrCode,
  Download,
  Upload,
  Search,
  Calendar,
  Building2,
  ExternalLink,
  Plus,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

// Mock data for demonstration
const mockCertificates = [
  {
    id: "cert_001",
    title: "Bachelor of Computer Science",
    institution: "Tech University",
    issueDate: "2024-05-15",
    status: "verified",
    grade: "First Class Honours",
    credentialType: "Degree",
    blockchainHash: "0x1234...abcd",
    studentName: "Alice Johnson",
  },
  {
    id: "cert_002",
    title: "Full Stack Web Development",
    institution: "Code Academy",
    issueDate: "2023-12-10",
    status: "verified",
    grade: "Distinction",
    credentialType: "Certificate",
    blockchainHash: "0x5678...efgh",
    studentName: "Alice Johnson",
  },
  {
    id: "cert_003",
    title: "Data Science Specialization",
    institution: "Online University",
    issueDate: "2023-08-22",
    status: "pending",
    grade: "Merit",
    credentialType: "Specialization",
    blockchainHash: null,
    studentName: "Alice Johnson",
  },
]

export default function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)

  const filteredCertificates = mockCertificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.institution.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || cert.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-student" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-student/10 text-student border-student/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleShare = (certificate: any) => {
    setSelectedCertificate(certificate)
    setShareModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
            <p className="text-muted-foreground">Manage and share your verified digital credentials</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Request Verification
            </Button>
            <Button className="flex items-center gap-2 bg-student hover:bg-student/90">
              <Plus className="h-4 w-4" />
              Add Certificate
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                  <p className="text-2xl font-bold">{mockCertificates.length}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-student" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-student">
                    {mockCertificates.filter((c) => c.status === "verified").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-student" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {mockCertificates.filter((c) => c.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Institutions</p>
                  <p className="text-2xl font-bold">{new Set(mockCertificates.map((c) => c.institution)).size}</p>
                </div>
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              All
            </Button>
            <Button
              variant={selectedFilter === "verified" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("verified")}
            >
              Verified
            </Button>
            <Button
              variant={selectedFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("pending")}
            >
              Pending
            </Button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid gap-6">
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{certificate.title}</CardTitle>
                      <Badge className={getStatusColor(certificate.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(certificate.status)}
                          <span className="capitalize">{certificate.status}</span>
                        </div>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {certificate.institution}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(certificate.issueDate).toLocaleDateString()}
                      </div>
                      <Badge variant="outline">{certificate.credentialType}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Grade: </span>
                      <span className="font-medium">{certificate.grade}</span>
                    </div>
                    {certificate.blockchainHash && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Blockchain Hash: </span>
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {certificate.blockchainHash}
                        </code>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {certificate.status === "verified" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 bg-transparent"
                          onClick={() => handleShare(certificate)}
                        >
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <QrCode className="h-4 w-4" />
                          QR Code
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <ExternalLink className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start by requesting verification of your credentials"}
            </p>
            <Button className="bg-student hover:bg-student/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Certificate
            </Button>
          </div>
        )}

        {/* Security Notice */}
        <Card className="mt-8 border-student/20 bg-student/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-student mt-0.5" />
              <div>
                <h3 className="font-semibold text-student mb-1">Your certificates are secure</h3>
                <p className="text-sm text-muted-foreground">
                  All verified certificates are stored on the blockchain and cannot be tampered with. You maintain full
                  control over who can access your credentials.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Share Modal */}
      {shareModalOpen && selectedCertificate && (
        <CertificateShareModal
          certificate={selectedCertificate}
          onClose={() => {
            setShareModalOpen(false)
            setSelectedCertificate(null)
          }}
        />
      )}
    </div>
  )
}
