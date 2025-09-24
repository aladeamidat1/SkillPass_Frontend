import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { GraduationCap, Building2, Briefcase, ArrowRight, Shield, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm text-primary font-medium">Secure Registration</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Join SkillPass</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Choose your role to get started with blockchain-powered certificate verification
          </p>
        </div>
      </section>

      {/* Registration Options */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students & Graduates */}
            <Card className="relative overflow-hidden border-2 hover:border-student/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-student/5 to-transparent" />
              <CardHeader className="relative pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-student/10 border border-student/20">
                    <GraduationCap className="h-8 w-8 text-student" />
                  </div>
                  <div className="text-xs font-medium text-student bg-student/10 px-2 py-1 rounded-full">STUDENTS</div>
                </div>
                <CardTitle className="text-2xl text-balance">I am a Student or Graduate</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <p className="text-muted-foreground">
                  Store and share your verified credentials securely. Build your digital skill passport.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-student mr-3 flex-shrink-0" />
                    <span>View all your certificates in one place</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-student mr-3 flex-shrink-0" />
                    <span>Generate secure verification links</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-student mr-3 flex-shrink-0" />
                    <span>Request verification of old credentials</span>
                  </div>
                </div>

                <Link href="/register/student" className="block">
                  <Button className="w-full bg-student hover:bg-student/90 text-student-foreground group-hover:scale-105 transition-transform">
                    Sign Up as Student
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Universities */}
            <Card className="relative overflow-hidden border-2 hover:border-university/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-university/5 to-transparent" />
              <CardHeader className="relative pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-university/10 border border-university/20">
                    <Building2 className="h-8 w-8 text-university" />
                  </div>
                  <div className="text-xs font-medium text-university bg-university/10 px-2 py-1 rounded-full">
                    EDUCATORS
                  </div>
                </div>
                <CardTitle className="text-2xl text-balance">I am a University or Institution</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <p className="text-muted-foreground">
                  Issue tamper-proof digital certificates and manage your institution's credential ecosystem.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-university mr-3 flex-shrink-0" />
                    <span>Mint certificates for graduates</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-university mr-3 flex-shrink-0" />
                    <span>Verify and mint historical credentials</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-university mr-3 flex-shrink-0" />
                    <span>Manage certificate lifecycle</span>
                  </div>
                </div>

                <Link href="/register/university" className="block">
                  <Button className="w-full bg-university hover:bg-university/90 text-university-foreground group-hover:scale-105 transition-transform">
                    Sign Up as Institution
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Employers */}
            <Card className="relative overflow-hidden border-2 hover:border-employer/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-employer/5 to-transparent" />
              <CardHeader className="relative pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-employer/10 border border-employer/20">
                    <Briefcase className="h-8 w-8 text-employer" />
                  </div>
                  <div className="text-xs font-medium text-employer bg-employer/10 px-2 py-1 rounded-full">
                    VERIFIERS
                  </div>
                </div>
                <CardTitle className="text-2xl text-balance">I am an Employer or Verifier</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <p className="text-muted-foreground">
                  Instantly verify candidate credentials with blockchain-powered authenticity checks.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-employer mr-3 flex-shrink-0" />
                    <span>Instant credential verification</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-employer mr-3 flex-shrink-0" />
                    <span>No technical expertise required</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-employer mr-3 flex-shrink-0" />
                    <span>Fraud detection built-in</span>
                  </div>
                </div>

                <Link href="/verify" className="block">
                  <Button className="w-full bg-employer hover:bg-employer/90 text-employer-foreground group-hover:scale-105 transition-transform">
                    Start Verifying
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-muted/20 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-8 text-balance">Trusted by leading institutions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="flex items-center justify-center">
              <div className="text-lg font-semibold">University A</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-lg font-semibold">Institute B</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-lg font-semibold">College C</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-lg font-semibold">Academy D</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Enterprise-Grade Security</span>
          </div>
          <p className="text-sm text-muted-foreground">
            All data is encrypted and stored securely. Your privacy and security are our top priorities.
          </p>
        </div>
      </section>
    </div>
  )
}
