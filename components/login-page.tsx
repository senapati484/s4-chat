"use client"

import { CleanLogin } from "@/components/clean-login"

interface LoginPageProps {
  onLogin: (provider: "google" | "apple") => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return <CleanLogin onLogin={onLogin} />
}
