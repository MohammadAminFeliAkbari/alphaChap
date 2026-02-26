import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { useRegisterOTP, useSendOTP } from "@/hooks/useAuth";

interface OtpVerificationProps {
    onToggleMode: () => void
    formData: {
        name: string;
        phone_number: string;
        email: string;
        password: string;
    }
}

const OtpVerification = ({ onToggleMode, formData }: OtpVerificationProps) => {
    const timer = 60
    const [otpCode, setOtpCode] = useState(["", "", "", ""]);
    const [resendTimer, setResendTimer] = useState(timer);
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { mutate: reSendOtp, isPending: isPendingSendOtp } = useSendOTP()
    const { mutate: verifyOTP, isPending } = useRegisterOTP();

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    useEffect(() => {
        otpInputRefs.current = otpInputRefs.current.slice(0, 4);
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        // فقط اعداد مجاز هستند
        if (value && !/^\d+$/.test(value)) return;

        const newOtpCode = [...otpCode];
        newOtpCode[index] = value.slice(0, 1); // فقط یک رقم
        setOtpCode(newOtpCode);

        // حرکت به فیلد بعدی اگر کاربر عدد وارد کرد
        if (value && index < 3) {
            otpInputRefs.current[index + 1]?.focus();
        }

        // اگر همه فیلدها پر شدند، فرم را submit کن
        if (newOtpCode.every(digit => digit !== "") && index === 3) {
            handleVerify();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // حذف با Backspace
        if (e.key === "Backspace" && !otpCode[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }

        // حرکت به فیلد قبلی با arrow left
        if (e.key === "ArrowLeft" && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }

        // حرکت به فیلد بعدی با arrow right
        if (e.key === "ArrowRight" && index < 3) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        // فقط اعداد را بگیر
        const numbers = pastedData.replace(/\D/g, "").slice(0, 4);

        if (numbers.length === 4) {
            const newOtpCode = numbers.split("");
            setOtpCode(newOtpCode);

            // فوکوس را به آخرین فیلد ببر
            otpInputRefs.current[3]?.focus();
        }
    };

    const handleResendOtp = () => {
        reSendOtp({ phone_number: formData.phone_number, password: formData.password }, {
            onSuccess: () => {
                setResendTimer(timer)
            }
        })
    };

    const handleVerify = () => {
        const otp = otpCode.join("");

        if (otp.length !== 4) {
            return;
        }

        verifyOTP(
            {
                phone_number: formData.phone_number,
                otp,
            },
            {
                onError: (error) => {
                    console.error("خطا در تأیید کد:", error);
                    setOtpCode(["", "", "", ""]);
                    otpInputRefs.current[0]?.focus();
                },
            }
        );
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">تأیید شماره موبایل</h3>
                <p className="text-sm text-muted-foreground">
                    کد ۴ رقمی ارسال شده به شماره{" "}
                    <span className="font-bold text-foreground">
                        {formData.phone_number}
                    </span>{" "}
                    را وارد کنید
                </p>
            </div>

            {/* OTP Input */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-center block">
                    کد تأیید ۴ رقمی
                </label>
                <div className="flex justify-center gap-3" dir="ltr">
                    {otpCode.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (otpInputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            onPaste={index === 0 ? handleOtpPaste : undefined}
                            className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-al border-input`}
                            disabled={isPending}
                        />
                    ))}
                </div>

                {/* نمایش خطا */}
                {/* {isError && (
                    <div className="text-red-500 text-xs text-center mt-2 flex items-center justify-center gap-1">
                        <span>⚠️</span>
                        <span>{error?.message || "کد تأیید نادرست است. لطفاً دوباره تلاش کنید"}</span>
                    </div>
                )} */}

                {/* تأیید موفق */}
                {/* {!isError && otpCode.every(digit => digit !== "") && otpCode.join("").length === 4 && (
                    <div className="text-green-600 text-xs text-center mt-2 flex items-center justify-center gap-1">
                        <span>✓</span>
                        <span>کد کامل وارد شد</span>
                    </div>
                )} */}
            </div>

            {/* Timer & Resend */}
            <div className="text-center">
                {resendTimer > 0 ? (
                    <p className="text-sm text-muted-foreground">
                        ارسال مجدد کد تا{" "}
                        <span className="font-bold text-accent">
                            {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, "0")}
                        </span>
                    </p>
                ) : (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResendOtp}
                        disabled={isPending}
                        className="gap-2 text-accent"
                    >
                        <RefreshCw className="w-4 h-4" />
                        ارسال مجدد کد
                    </Button>
                )}
            </div>

            {/* Verify Button */}
            <Button
                onClick={handleVerify}
                variant="accent"
                className="w-full gap-2"
                size="lg"
                disabled={isPending || otpCode.join("").length !== 4 || isPendingSendOtp}
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                        در حال تأیید...
                    </span>
                ) : (
                    <>
                        تأیید و ادامه
                        <ArrowLeft className="w-5 h-5" />
                    </>
                )}
            </Button>

            {/* Back Button */}
            <Button
                variant="ghost"
                className="w-full gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => onToggleMode()}
                disabled={isPending}
            >
                <ArrowRight className="w-5 h-5" />
                ویرایش شماره موبایل
            </Button>
        </div>
    );
};

export default OtpVerification;