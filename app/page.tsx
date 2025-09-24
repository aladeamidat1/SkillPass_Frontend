import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Shield, ArrowRight, CheckCircle, Award, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/professional-african-student-with-laptop-in-modern.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 text-white">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">SKILLPASS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            Prevent Credential Fraud. Issue Verifiable Certificates on the Blockchain
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto text-pretty">
            Secure, tamper-proof digital certificates powered by blockchain technology
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[oklch(0.55_0.15_195)] hover:bg-[oklch(0.5_0.15_195)] text-white text-lg px-8 py-6"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/verify">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Verify Certificate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 md:space-x-12 opacity-60">
            <div className="text-sm font-semibold text-gray-500">TRUSTED BY</div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="flex items-center space-x-8">
              <div className="text-lg font-bold text-gray-600">Universities</div>
              <div className="text-lg font-bold text-gray-600">Students</div>
              <div className="text-lg font-bold text-gray-600">Employers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 section-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-4">STUDENTS & GRADUATES</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Improve your career chances, verify your academic records!
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Access your verified academic credentials, making Akowe the one true platform for verified and
                verifiable academic records across Sub-Saharan Africa.
              </p>
              <Link href="/register/student">
                <Button className="bg-[oklch(0.55_0.15_195)] hover:bg-[oklch(0.5_0.15_195)] text-white px-8 py-3">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <img src="/students-with-certificates-illustration.jpg" alt="Students with certificates" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">List Your Academic Records</h3>
                <p className="text-gray-600">
                  Showcase your academic credentials. List your first degree, Masters degree etc.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">We Verify Authenticity of your Records</h3>
                <p className="text-gray-600">
                  We work with the Registrars to authenticate your records, thereby validating your records.
                </p>
                <Link href="/verify" className="inline-block mt-4">
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent">
                    Get Started →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Increase your Career Chances</h3>
                <p className="text-gray-600">
                  Employers can use Akowe to verify the authenticity of your credentials thereby increasing your career
                  chances.
                </p>
                <Link href="/register/student" className="inline-block mt-4">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                    Get Started →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[oklch(0.55_0.15_195)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-teal-100 mb-4">EDUCATORS</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Issue Digital Certificates in Bulk</h2>
              <p className="text-lg text-teal-50 mb-8">
                We created a Certificate Issuance Engine that helps simplify the issuance of certificates for Educators.
                In a simple step, you can issue 1000 certificates in less than 30 minutes.
              </p>
              <Link href="/register/university">
                <Button className="bg-white text-[oklch(0.55_0.15_195)] hover:bg-gray-100 px-8 py-3">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <img src="/educators-issuing-certificates-illustration.jpg" alt="Educators issuing certificates" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 section-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Upload your Certificate Design.</h2>
              <p className="text-lg text-purple-100 mb-8">
                Upload your certificate design during onboarding. We use this design to create your certificates. You
                can also use our blank certificate template.
              </p>
              <Link href="/register/university">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">Get Started →</Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <img src="/certificate-design-upload-illustration.jpg" alt="Certificate design upload" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="h-8 w-8 text-[oklch(0.55_0.15_195)]" />
                <span className="text-2xl font-bold">SkillPass</span>
              </div>
              <p className="text-gray-400 mb-6">Blockchain-powered certificate verification for the digital age.</p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-3 text-gray-400">
                <Link href="/how-it-works" className="block hover:text-white transition-colors">
                  How it Works
                </Link>
                <Link href="/pricing" className="block hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/security" className="block hover:text-white transition-colors">
                  Security
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-3 text-gray-400">
                <Link href="/docs" className="block hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link href="/api" className="block hover:text-white transition-colors">
                  API Reference
                </Link>
                <Link href="/support" className="block hover:text-white transition-colors">
                  Support
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-3 text-gray-400">
                <Link href="/about" className="block hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="block hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/privacy" className="block hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 SkillPass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
