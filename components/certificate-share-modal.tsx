"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Mail, X, Download } from "lucide-react"

interface CertificateShareModalProps {
  certificate: any
  onClose: () => void
}

export function CertificateShareModal({ certificate, onClose }: CertificateShareModalProps) {
  const [copied, setCopied] = useState(false)
  const verificationUrl = `https://skillpass.app/verify/${certificate.id}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateQRCode = () => {
    // In a real implementation, you would generate a QR code here
    return "/qr-code-for-certificate-verification.jpg"
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Share Certificate</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="link" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="link">Share Link</TabsTrigger>
              <TabsTrigger value="qr">QR Code</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>

            <TabsContent value="link" className="space-y-4">
              <div className="space-y-2">
                <Label>Verification Link</Label>
                <div className="flex gap-2">
                  <Input value={verificationUrl} readOnly className="flex-1" />
                  <Button variant="outline" onClick={() => copyToClipboard(verificationUrl)} className="bg-transparent">
                    {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share this link with employers or anyone who needs to verify your certificate.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Certificate ID</Label>
                <div className="flex gap-2">
                  <Input value={certificate.id} readOnly className="flex-1" />
                  <Button variant="outline" onClick={() => copyToClipboard(certificate.id)} className="bg-transparent">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Alternative way to verify - enter this ID on the verification page.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="qr" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <img
                    src={generateQRCode() || "/placeholder.svg"}
                    alt="QR Code for certificate verification"
                    className="w-48 h-48 border rounded-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan this QR code to instantly verify the certificate on any device.
                </p>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download QR Code
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Recipient Email</Label>
                  <Input id="recipientEmail" type="email" placeholder="employer@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailSubject">Subject</Label>
                  <Input id="emailSubject" defaultValue={`Certificate Verification - ${certificate.title}`} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailMessage">Message</Label>
                  <textarea
                    id="emailMessage"
                    className="w-full p-3 border rounded-md min-h-[120px] bg-background"
                    defaultValue={`Dear Hiring Manager,

Please find my verified certificate for ${certificate.title} issued by ${certificate.institution}.

You can verify this certificate instantly using the following link:
${verificationUrl}

Or use the certificate ID: ${certificate.id}

Best regards,
${certificate.studentName}`}
                  />
                </div>
                <Button className="w-full bg-student hover:bg-student/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
