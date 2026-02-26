import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Upload, Send, FileText, Info, CopySlash, Check, Copy } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface FileSubmissionProps {
  fileName: string;
  setFileName: (name: string) => void;
  submissionMethod: "telegram" | "upload";
  setSubmissionMethod: (method: "telegram" | "upload") => void;
  onBack: () => void;
  onNext: () => void;
}

const generateID = () => {
  return `PRINT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};


export const FileSubmission = ({
  fileName,
  setFileName,
  submissionMethod,
  setSubmissionMethod,
  onBack,
  onNext,
}: FileSubmissionProps) => {
  const [isCopy, setCopied] = useState(false)

  const fileID = generateID();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 rounded-2xl animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">ارسال فایل</h2>
          <p className="text-sm text-muted-foreground">روش ارسال فایل را انتخاب کنید</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* File Name */}
        <div className="space-y-3">
          <label className="text-sm font-medium">نام فایل</label>
          <Input
            placeholder="مثال: جزوه فیزیک - فصل ۳"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="text-right"
          />
          <p className="text-xs text-muted-foreground">
            این نام برای شناسایی فایل در سفارشات شما استفاده می‌شود
          </p>
        </div>

        {/* Submission Method */}
        <div className="space-y-3">
          <label className="text-sm font-medium">روش ارسال</label>
          <div className="space-y-3">
            {/* Telegram Option */}
            <button
              onClick={() => setSubmissionMethod("telegram")}
              className={`w-full p-4 rounded-xl border text-right transition-all ${submissionMethod === "telegram"
                ? "border-accent bg-accent/10"
                : "border-border bg-card hover:border-accent/50"
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${submissionMethod === "telegram" ? "bg-accent/20" : "bg-secondary"
                  }`}>
                  <Send className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="font-medium items-center gap-2">
                    ارسال از تلگرام یا ایتا
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                      پیشنهادی
                    </span>

                    <div className="flex flex-row items-center">
                      <button
                        className="p-1"
                        onClick={copyToClipboard}
                      >
                        {isCopy ? (
                          <>
                            <Check size={14} />
                            {/* <span className="text-sm">کپی شد!</span> */}
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            {/* <span className="text-sm">کپی</span> */}
                          </>
                        )}
                      </button>
                      <code className="font-mono font-semibold tracking-wide text-[px]">
                        {fileID}
                      </code>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">
                    فایل PDF خود خود همراه با آیدی بالا به ربات تلگرام یا ایتا ارسال کنید.
                  </p>
                </div>
              </div>
            </button>

            {/* Upload Option */}
            <button
              onClick={() => setSubmissionMethod("upload")}
              className={`w-full p-4 rounded-xl border text-right transition-all ${submissionMethod === "upload"
                ? "border-accent bg-accent/10"
                : "border-border bg-card hover:border-accent/50"
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${submissionMethod === "upload" ? "bg-accent/20" : "bg-secondary"
                  }`}>
                  <Upload className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">آپلود مستقیم</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    فایل PDF را مستقیماً در سایت آپلود کنید
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Instructions */}
        {
          submissionMethod === "telegram" && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-2">راهنمای ارسال:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>به ربات تلگرام آلفاچاپ مراجعه کنید</li>
                    <li>کد سفارش را از ربات دریافت کنید</li>
                    <li>فایل PDF خود را ارسال کنید</li>
                  </ol>
                  <Button variant="link" className="h-auto p-0 mt-2 text-accent">
                    @AlphaChapBot ←
                  </Button>
                </div>
              </div>
            </div>
          )
        }

        {
          submissionMethod === "upload" && (
            <div className="p-8 rounded-xl border-2 border-dashed border-border bg-secondary/30 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                فایل PDF خود را اینجا بکشید یا کلیک کنید
              </p>
              <p className="text-xs text-muted-foreground">
                حداکثر حجم فایل: ۵۰ مگابایت
              </p>
              <Button variant="secondary" className="mt-4">
                انتخاب فایل
              </Button>
            </div>
          )
        }
      </div >

      <div className="space-y-3 mt-4">
        <label className="text-sm font-medium">توضیحات اضافی</label>
        <Textarea
          placeholder="در اینجا هرگونه توضیح یا راهنمایی اضافی درباره فایل خود بنویسید."
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="text-right"
        />
        {/* <p className="text-xs text-muted-foreground">
          این نام برای شناسایی فایل در سفارشات شما استفاده می‌شود
        </p> */}
      </div>

      <div className="flex gap-3 mt-8">
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowRight className="w-5 h-5" />
          مرحله قبل
        </Button>
        <Button onClick={onNext} className="flex-1 gap-2" size="lg" disabled={!fileName}>
          مرحله بعد
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
    </div >
  );
};
