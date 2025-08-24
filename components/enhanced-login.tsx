"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ArrowRight, Shield, Zap } from "lucide-react"

interface EnhancedLoginProps {
  onLogin: (provider: "google" | "apple") => void
}

export function EnhancedLogin({ onLogin }: EnhancedLoginProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleLogin = async (provider: "google" | "apple") => {
    setIsLoading(provider)
    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onLogin(provider)
    setIsLoading(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                <span className="text-xs font-bold text-accent-foreground">4</span>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">S4 Chat</h1>
            <p className="text-lg text-muted-foreground">Multi-AI Assistant Platform</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-card">
            <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xs font-medium">4 AI Models</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card">
            <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xs font-medium">Secure</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-card">
            <ArrowRight className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xs font-medium">Real-time</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-border/50 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Choose your preferred sign-in method to access your AI assistants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleLogin("google")}
              disabled={isLoading !== null}
              variant="outline"
              className="w-full h-12 text-base font-medium relative overflow-hidden group"
            >
              {isLoading === "google" ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            <Button
              onClick={() => handleLogin("apple")}
              disabled={isLoading !== null}
              className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800 text-white relative overflow-hidden group"
            >
              {isLoading === "apple" ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Continue with Apple
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-6 space-y-2">
              <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Your data is secure and encrypted</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
