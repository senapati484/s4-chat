"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";
import {
  RiPerplexityLine,
  RiGeminiLine,
  RiClaudeLine,
  RiGoogleFill,
  RiAppleFill,
} from "react-icons/ri";
import { AiOutlineOpenAI } from "react-icons/ai";
import { GiSpermWhale } from "react-icons/gi";

const chatbotConfig = {
  chatgpt: {
    name: "ChatGPT",
    icon: AiOutlineOpenAI,
  },
  gemini: {
    name: "Gemini",
    icon: RiGeminiLine,
  },
  grok: {
    name: "Grok",
    icon: Zap,
  },
  claude: {
    name: "Claude",
    icon: RiClaudeLine,
  },
  deepSeek: {
    name: "DeepSeek",
    icon: GiSpermWhale,
  },
  perplexity: {
    name: "Perplexity",
    icon: RiPerplexityLine,
  },
};

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // Extract chatbot entries for reusability
  const chatbotEntries = Object.entries(chatbotConfig);

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    setIsLoading("google");
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setIsLoading(null);
    }
  };

  const handleAppleSignIn = async () => {
    if (!isLoaded) return;

    setIsLoading("apple");
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_apple",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error("Apple sign-in error:", error);
      setIsLoading(null);
    }
  };

  return (
    // <div className="min-h-screen bg-black flex items-center justify-center p-4">
    //   <div className="w-full max-w-md space-y-8">
    //     <div className="text-center space-y-4">
    //       <div className="flex items-center justify-center gap-3 mb-4">
    //         <Sparkles className="h-8 w-8 text-gray-400" />
    //         <Zap className="h-8 w-8 text-gray-400" />
    //         <Brain className="h-8 w-8 text-gray-400" />
    //         <Gem className="h-8 w-8 text-gray-400" />
    //       </div>
    //       <h1 className="text-4xl font-bold tracking-tight text-white">
    //         S4 Chat
    //       </h1>
    //       <p className="text-lg text-gray-400 max-w-sm mx-auto">
    //         Experience the power of multiple AI models in one unified interface
    //       </p>
    //     </div>

    //     <Card className="border-gray-800 bg-gray-900 shadow-xl">
    //       <CardHeader className="space-y-2 text-center pb-6">
    //         <CardTitle className="text-2xl font-semibold text-white">
    //           Welcome to S4 Chat
    //         </CardTitle>
    //         <CardDescription className="text-base text-gray-400">
    //           Sign in to access ChatGPT, Grok, Claude, and Gemini simultaneously
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent className="space-y-4">
    //         <Button
    //           onClick={handleGoogleSignIn}
    //           disabled={isLoading !== null}
    //           className="w-full h-14 bg-white hover:bg-gray-200 text-black font-medium text-base shadow-sm"
    //         >
    //           {isLoading === "google" ? (
    //             <div className="flex items-center gap-3">
    //               <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
    //               Signing in with Google...
    //             </div>
    //           ) : (
    //             <div className="flex items-center gap-3">
    //               <svg className="w-6 h-6" viewBox="0 0 24 24">
    //                 <path
    //                   fill="currentColor"
    //                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    //                 />
    //                 <path
    //                   fill="currentColor"
    //                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    //                 />
    //                 <path
    //                   fill="currentColor"
    //                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    //                 />
    //                 <path
    //                   fill="currentColor"
    //                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    //                 />
    //               </svg>
    //               Continue with Google
    //             </div>
    //           )}
    //         </Button>

    //         <div className="relative">
    //           <div className="absolute inset-0 flex items-center">
    //             <span className="w-full border-t border-gray-700" />
    //           </div>
    //           <div className="relative flex justify-center text-xs uppercase">
    //             <span className="bg-gray-900 px-2 text-gray-400">Or</span>
    //           </div>
    //         </div>

    //         <Button
    //           onClick={handleAppleSignIn}
    //           disabled={isLoading !== null}
    //           variant="outline"
    //           className="w-full h-14 border-2 border-gray-700 hover:bg-gray-800 text-white font-medium text-base"
    //         >
    //           {isLoading === "apple" ? (
    //             <div className="flex items-center gap-3">
    //               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    //               Signing in with Apple...
    //             </div>
    //           ) : (
    //             <div className="flex items-center gap-3">
    //               <svg
    //                 className="w-6 h-6"
    //                 viewBox="0 0 24 24"
    //                 fill="currentColor"
    //               >
    //                 <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    //               </svg>
    //               Continue with Apple
    //             </div>
    //           )}
    //         </Button>
    //       </CardContent>
    //     </Card>

    //     <div className="text-center space-y-2">
    //       <p className="text-sm text-gray-400">
    //         By signing in, you agree to our{" "}
    //         <a href="#" className="text-gray-300 hover:underline">
    //           terms of service
    //         </a>{" "}
    //         and{" "}
    //         <a href="#" className="text-gray-300 hover:underline">
    //           privacy policy
    //         </a>
    //         .
    //       </p>
    //       <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
    //         <span className="flex items-center gap-1">
    //           <Sparkles className="h-3 w-3 text-gray-400" />
    //           ChatGPT
    //         </span>
    //         <span className="flex items-center gap-1">
    //           <Zap className="h-3 w-3 text-gray-400" />
    //           Grok
    //         </span>
    //         <span className="flex items-center gap-1">
    //           <Brain className="h-3 w-3 text-gray-400" />
    //           Claude
    //         </span>
    //         <span className="flex items-center gap-1">
    //           <Gem className="h-3 w-3 text-gray-400" />
    //           Gemini
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Top header with chatbot icons */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            {chatbotEntries.map(([key, { icon: Icon }]) => (
              <Icon key={key} className="h-8 w-8 text-gray-400" />
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            S4 Chat
          </h1>
          <p className="text-lg text-gray-400 max-w-sm mx-auto">
            Experience the power of multiple AI models in one unified interface
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-gray-800 bg-gray-900 shadow-xl">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-white">
              Welcome to S4 Chat
            </CardTitle>
            <CardDescription className="text-base text-gray-400">
              Sign in to access ChatGPT, Grok, Claude, and Gemini simultaneously
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Google Login */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading !== null}
              className="w-full h-14 bg-white hover:bg-gray-200 text-black font-medium text-base shadow-sm"
            >
              {isLoading === "google" ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in with Google...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Google SVG */}
                  <RiGoogleFill />
                  Continue with Google
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or</span>
              </div>
            </div>

            {/* Apple Login */}
            <Button
              onClick={handleAppleSignIn}
              disabled={isLoading !== null}
              className="w-full h-14 bg-white hover:bg-gray-200 text-black font-medium text-base shadow-sm"
            >
              {isLoading === "apple" ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in with Apple...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Google SVG */}
                  <RiAppleFill />
                  Continue with Apple
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">
            By signing in, you agree to our{" "}
            <a href="#" className="text-gray-300 hover:underline">
              terms of service
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-300 hover:underline">
              privacy policy
            </a>
            .
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            {chatbotEntries.map(([key, { name, icon: Icon }]) => (
              <span key={key} className="flex items-center gap-1">
                <Icon className="h-3 w-3 text-gray-400" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
