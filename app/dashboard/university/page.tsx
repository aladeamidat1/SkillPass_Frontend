"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { CertificateForm } from "@/components/certificate-form"
import { BulkCertificateUpload } from "@/components/bulk-certificate-upload"
import {
  Users,
  Award,
  FileCheck,
  Search,
  Plus,
  Upload,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Hash,
  User,
  GraduationCap,
  FileText,
  Settings,
  Edit,
} from "lucide-react"

// Mock data for demonstration
const mockStats = {
  totalCertificates: 1247,
  pendingVerifications: 23,
  activeStudents: 892,
  thisMonthIssued: 156,
}

const mockCertificates = [
  {
    id: "cert_uni_001",
    studentName: "Alice Johnson",
    studentEmail: "alice.johnson@email.com",
    title: "Bachelor of Computer Science",
    issueDate: "2024-05-15",
    status: "issued",
    grade: "First Class Honours",
    credentialType: "Degree",
    blockchainHash: "0x1234...abcd",
  },
  {
    id: "cert_uni_002",
    studentName: "Bob Smith",
    studentEmail: "bob.smith@email.com",
    title: "Master of Data Science",
    issueDate: "2024-05-10",
    status: "issued",
    grade: "Distinction",
    credentialType: "Masters",
    blockchainHash: "0x5678...efgh",
  },
  {
    id: "cert_uni_003",
    studentName: "Carol Davis",
    studentEmail: "carol.davis@email.com",
    title: "Certificate in Web Development",
    issueDate: "2024-05-08",
    status: "draft",
    grade: "Merit",
    credentialType: "Certificate",
    blockchainHash: null,
  },
]

const mockPendingVerifications = [
  {
    id: "verify_001",
    studentName: "David Wilson",
    studentEmail: "david.wilson@email.com",
    documentTitle: "Bachelor of Engineering - 2019",
    submittedDate: "2024-05-20",
    documentUrl: "/documents/david_wilson_degree.pdf",
    status: "pending",
  },
  {
    id: "verify_002",
    studentName: "Emma Brown",
    studentEmail: "emma.brown@email.com",
    documentTitle: "Master of Business Administration - 2021",
    submittedDate: "2024-05-18",
    documentUrl: "/documents/emma_brown_mba.pdf",
    status: "under_review",
  },
]

export default function UniversityDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showCertificateForm, setShowCertificateForm] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState<any>(null)
  const [showBulkUpload, setShowBulkUpload] = useState(false)

  const filteredCertificates = mockCertificates.filter((cert) => {
    const matchesSearch =
      cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || cert.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "issued":
        return <CheckCircle className="h-4 w-4 text-university" />
      case "draft":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "revoked":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "issued":
        return "bg-university/10 text-university border-university/20"
      case "draft":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "revoked":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleEditCertificate = (certificate: any) => {
    setEditingCertificate(certificate)
    setShowCertificateForm(true)
  }

  const handleSaveCertificate = (data: any) => {
    console.log("Saving certificate:", data)
    // Handle save/issue logic here
    setShowCertificateForm(false)
    setEditingCertificate(null)
  }

  const handleBulkUploadComplete = (results: any) => {
    console.log("Bulk upload completed:", results)
    setShowBulkUpload(false)
    // Refresh certificates list here
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">University Dashboard</h1>
            <p className="text-muted-foreground">Manage certificates and verify student credentials</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
              onClick={() => setShowBulkUpload(true)}
            >
              <Upload className="h-4 w-4" />
              Bulk Import
            </Button>
            <Button
              className="flex items-center gap-2 bg-university hover:bg-university/90"
              onClick={() => setShowCertificateForm(true)}
            >
              <Plus className="h-4 w-4" />
              Issue Certificate
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
                  <p className="text-2xl font-bold">{mockStats.totalCertificates.toLocaleString()}</p>
                </div>
                <Award className="h-8 w-8 text-university" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Verifications</p>
                  <p className="text-2xl font-bold text-yellow-500">{mockStats.pendingVerifications}</p>
                </div>
                <FileCheck className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">{mockStats.activeStudents.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-university">{mockStats.thisMonthIssued}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-university" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="certificates">Issued Certificates</TabsTrigger>
            <TabsTrigger value="verifications">Pending Verifications</TabsTrigger>
            <TabsTrigger value="settings">Institution Settings</TabsTrigger>
          </TabsList>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates or students..."
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
                  variant={selectedFilter === "issued" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("issued")}
                >
                  Issued
                </Button>
                <Button
                  variant={selectedFilter === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("draft")}
                >
                  Draft
                </Button>
              </div>
            </div>

            {/* Certificates List */}
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
                            <User className="h-4 w-4" />
                            {certificate.studentName}
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
                          <span className="text-muted-foreground">Student Email: </span>
                          <span className="font-medium">{certificate.studentEmail}</span>
                        </div>
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
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        {certificate.status === "draft" && (
                          <Button size="sm" className="flex items-center gap-2 bg-university hover:bg-university/90">
                            <CheckCircle className="h-4 w-4" />
                            Issue
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 bg-transparent"
                          onClick={() => handleEditCertificate(certificate)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Verifications Tab */}
          <TabsContent value="verifications" className="space-y-6">
            <div className="grid gap-6">
              {mockPendingVerifications.map((verification) => (
                <Card key={verification.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{verification.documentTitle}</CardTitle>
                          <Badge
                            className={
                              verification.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                            }
                          >
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span className="capitalize">{verification.status.replace("_", " ")}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {verification.studentName}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Submitted {new Date(verification.submittedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Student Email: </span>
                          <span className="font-medium">{verification.studentEmail}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Document: </span>
                          <span className="font-medium">{verification.documentUrl}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <FileText className="h-4 w-4" />
                          View Document
                        </Button>
                        <Button size="sm" className="flex items-center gap-2 bg-university hover:bg-university/90">
                          <CheckCircle className="h-4 w-4" />
                          Approve & Mint
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <AlertTriangle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockPendingVerifications.length === 0 && (
              <div className="text-center py-12">
                <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No pending verifications</h3>
                <p className="text-muted-foreground">All verification requests have been processed.</p>
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-university" />
                  Institution Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Institution Name</label>
                      <Input defaultValue="Tech University" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Institution ID</label>
                      <Input defaultValue="TECH_UNI_001" className="mt-1" disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Contact Email</label>
                      <Input defaultValue="admin@techuniversity.edu" className="mt-1" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Blockchain Wallet Address</label>
                      <Input defaultValue="0xabcd...1234" className="mt-1" disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Certificate Template</label>
                      <Input defaultValue="Standard University Template" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Auto-approve Threshold</label>
                      <Input defaultValue="Manual Review Required" className="mt-1" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button className="bg-university hover:bg-university/90">Save Changes</Button>
                  <Button variant="outline" className="bg-transparent">
                    Reset to Default
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-university" />
                  Blockchain Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Blockchain Network</h3>
                      <p className="text-sm text-muted-foreground">Connected to Sui Mainnet</p>
                    </div>
                    <Badge className="bg-university/10 text-university border-university/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Smart Contract</h3>
                      <p className="text-sm text-muted-foreground">Certificate Registry v2.1</p>
                    </div>
                    <Badge className="bg-university/10 text-university border-university/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Walrus Storage</h3>
                      <p className="text-sm text-muted-foreground">Document storage integration</p>
                    </div>
                    <Badge className="bg-university/10 text-university border-university/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Certificate Form Modal */}
        {showCertificateForm && (
          <CertificateForm
            onClose={() => {
              setShowCertificateForm(false)
              setEditingCertificate(null)
            }}
            onSave={handleSaveCertificate}
            initialData={editingCertificate}
          />
        )}

        {/* Bulk Upload Modal */}
        {showBulkUpload && (
          <BulkCertificateUpload onClose={() => setShowBulkUpload(false)} onComplete={handleBulkUploadComplete} />
        )}
      </div>
    </div>
  )
}
