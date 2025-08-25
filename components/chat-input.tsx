"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, Wand2, PaperclipIcon, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  isDarkMode: boolean;
}

export function ChatInput({
  onSendMessage,
  isLoading = false,
  isDarkMode,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Voice Input Functionality
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        // Convert audio to text using Web Speech API
        if (
          "webkitSpeechRecognition" in window ||
          "SpeechRecognition" in window
        ) {
          const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;
          const recognition = new SpeechRecognition();

          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputValue((prev) => prev + transcript);
            setIsListening(false);
          };

          recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
          };

          recognition.start();
          setIsListening(true);
        } else {
          // Fallback: just add a placeholder text
          setInputValue(
            (prev) => prev + "[Voice input not supported in this browser]"
          );
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check permissions.");
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  };

  // File Upload Functionality
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Add file info to input
      const fileInfo = `[File: ${file.name} (${(
        file.size /
        1024 /
        1024
      ).toFixed(2)} MB)]`;
      setInputValue((prev) => prev + (prev ? "\n" : "") + fileInfo);

      // Here you would typically upload the file to your server
      // For now, we'll just add the file info to the message
      console.log("File selected:", file);
    }

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={cn(
        "border-t p-4 flex-shrink-0",
        isDarkMode ? "border-gray-800 bg-black" : "border-gray-200 bg-white"
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={cn(
            "rounded-2xl transition-all duration-200 overflow-hidden",
            isDarkMode
              ? "bg-gray-900/40 ring-1 ring-gray-700"
              : "bg-white/70 ring-1 ring-gray-300"
          )}
        >
          <div className="p-3">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={cn(
                "min-h-[40px] max-h-[120px] resize-none border-0 p-0 font-gray-300 placeholder:text-gray-300 text-base transition-all duration-200 focus-visible:ring-0 shadow-none",
                isDarkMode
                  ? "bg-transparent text-white placeholder-gray-400"
                  : "bg-transparent text-black placeholder-gray-500"
              )}
            />
          </div>
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-200"
            )}
          >
            <div className="flex items-center gap-2 p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFileUpload}
                className={cn(
                  "h-9 w-9 p-0 transition-all duration-200 rounded-xl",
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                )}
              >
                <PaperclipIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 w-9 p-0 transition-all duration-200 rounded-xl",
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                )}
              >
                <Wand2 className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMicClick}
                className={cn(
                  "h-9 w-9 p-0 transition-all duration-200 rounded-xl",
                  isDarkMode
                    ? isRecording || isListening
                      ? "text-red-400 hover:text-red-300 hover:bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                    : isRecording || isListening
                    ? "text-red-600 hover:text-red-500 hover:bg-gray-200"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                )}
              >
                {isRecording || isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={cn(
                  "px-4 py-2 transition-all duration-200 rounded-xl flex items-center gap-2",
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                )}
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="*/*"
      />
    </div>
  );
}
