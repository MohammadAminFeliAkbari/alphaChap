import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Phone, Eye, EyeOff, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { useForgetPasswordSendOTP, useVerifyOtpAndChangePassword } from "@/hooks/useAuth";

interface ForgotPasswordFormProps {
    onBack: () => void;
    formData: {
        name: string;
        phone_number: string;
        email: string;
        password: string;
    }
    changeText: () => void
}

const ForgotPasswordForm = ({ onBack, formData, changeText }: ForgotPasswordFormProps) => {
    const [step, setStep] = useState<"phone" | "verify">("phone");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpCode, setOtpCode] = useState(["", "", "", ""]);
    const [resendTimer, setResendTimer] = useState(60);
    const [phoneNumber, setPhoneNumber] = useState("");
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [showErrorAfterClick, setShowErrorAfterClick] = useState(false)

    const { mutate: sendOtp, isPending: isSendingOtp } = useForgetPasswordSendOTP();
    const { mutate: resetPassword, isPending: isResetting } = useVerifyOtpAndChangePassword();

    // تایمر برای ارسال مجدد OTP
    useEffect(() => {
        changeText()
        if (resendTimer > 0 && step === "verify") {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer, step]);

    // فرم اعتبارسنجی شماره تلفن
    const phoneForm = useFormik({
        initialValues: {
            phone_number: formData.phone_number,
        },
        validationSchema: Yup.object({
            phone_number: Yup.string()
                .required("شماره موبایل الزامی است")
                .test(
                    'iranian-phone',
                    'شماره موبایل معتبر نیست',
                    (value) => {
                        if (!value) return false;

                        const persianToEnglish = (str) => {
                            const map = {
                                '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
                                '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
                            };
                            return str.replace(/[۰-۹]/g, d => map[d]);
                        };

                        const normalized = persianToEnglish(value);
                        const cleanNumber = normalized.replace(/^(\+98|0)/, '');

                        return /^9\d{9}$/.test(cleanNumber);
                    }
                ),
        }),
        onSubmit: (values) => {
            const normalizedPhone = values.phone_number.replace(/^(\+98|0)/, '0');
            setPhoneNumber(normalizedPhone);
            sendOtp({ phone_number: normalizedPhone }, {
                onSuccess: () => {
                    setStep("verify");
                    setResendTimer(60);
                }
            });
        },
    });

    // فرم اعتبارسنجی رمز جدید
    const passwordForm = useFormik({
        initialValues: {
            new_password: "",
            confirm_password: "",
        },
        validationSchema: Yup.object({
            new_password: Yup.string()
                .required("رمز عبور جدید الزامی است")
                .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)/,
                    "رمز عبور باید شامل حداقل یک حرف و یک عدد باشد"
                ),
            confirm_password: Yup.string()
                .required("تکرار رمز عبور الزامی است")
                .oneOf([Yup.ref('new_password')], "رمز عبور و تکرار آن باید یکسان باشند")
        }),
        onSubmit: (values) => {
            const otp = otpCode.join("");
            if (otp.length !== 4) return;

            resetPassword({
                phone_number: phoneNumber,
                otp,
                new_password: values.new_password
            });
        },
    });

    // فرمت شماره تلفن
    const formatPhoneNumber = (value: string) => {
        if (!value) return "";
        const numbers = value.replace(/\D/g, '');

        if (numbers.startsWith('9') && numbers.length <= 10) {
            return `0${numbers.slice(0, 10)}`;
        }
        if (numbers.startsWith('09') && numbers.length <= 11) {
            return numbers.slice(0, 11);
        }
        if (numbers.startsWith('98') && numbers.length <= 12) {
            return `0${numbers.slice(2, 12)}`;
        }
        return value;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        phoneForm.setFieldValue('phone_number', formatted);
    };

    // مدیریت ورود OTP
    const handleOtpChange = (index: number, value: string) => {
        if (value && !/^\d+$/.test(value)) return;

        const newOtpCode = [...otpCode];
        newOtpCode[index] = value.slice(0, 1);
        setOtpCode(newOtpCode);

        if (value && index < 3) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otpCode[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowLeft" && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowRight" && index < 3) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        const numbers = pastedData.replace(/\D/g, "").slice(0, 4);

        if (numbers.length === 4) {
            const newOtpCode = numbers.split("");
            setOtpCode(newOtpCode);
            otpInputRefs.current[3]?.focus();
        }
    };

    const handleResendOtp = () => {
        sendOtp({ phone_number: phoneNumber }, {
            onSuccess: () => {
                setResendTimer(60);
            }
        });
    };

    const handleBackToPhone = () => {
        setStep("phone");
        setOtpCode(["", "", "", ""]);
        passwordForm.resetForm();
    };

    const handleVerifyAndChangePassword = () => {
        const otp = otpCode.join("");
        if (otp.length !== 4) return;

        passwordForm.handleSubmit();
    };

    const renderPhoneStep = () => (
        <form onSubmit={phoneForm.handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">بازیابی رمز عبور</h3>
                <p className="text-sm text-muted-foreground">
                    لطفاً شماره موبایل خود را وارد کنید
                </p>
            </div>

            <div className="space-y-2">
                <label htmlFor="phone_number" className="text-sm font-medium">
                    شماره موبایل
                </label>
                <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        value={phoneForm.values.phone_number}
                        onChange={handlePhoneChange}
                        onBlur={phoneForm.handleBlur}
                        className={`pr-10 text-right ${phoneForm.touched.phone_number && phoneForm.errors.phone_number && showErrorAfterClick ? 'border-red-500 focus:ring-red-200' : ''}`}
                        dir="ltr"
                        disabled={isSendingOtp}
                    />
                </div>
                {phoneForm.touched.phone_number && phoneForm.errors.phone_number && showErrorAfterClick && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>{phoneForm.errors.phone_number}</span>
                    </div>
                )}
            </div>

            <Button
                type="submit"
                variant="accent"
                className="w-full gap-2"
                size="lg"
                onClick={() => { setShowErrorAfterClick(true) }}
                disabled={isSendingOtp}
            >
                {isSendingOtp ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                        در حال ارسال کد...
                    </span>
                ) : (
                    <>
                        دریافت کد تأیید
                        <ArrowLeft className="w-5 h-5" />
                    </>
                )}
            </Button>

            <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                    حساب کاربری ندارید؟
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-accent font-medium mr-2 hover:underline"
                    >
                        ثبت‌نام کنید
                    </button>
                </p>
            </div>
        </form>
    );

    const renderVerifyStep = () => (
        <form onSubmit={passwordForm.handleSubmit} className="space-y-6">
            {/* بخش OTP */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-center block">
                    کد تأیید ۴ رقمی ارسال شده به شماره {formData.phone_number}
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
                            className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all border-input"
                            disabled={isResetting}
                        />
                    ))}
                </div>

                {/* تایمر ارسال مجدد */}
                <div className="text-center">
                    {resendTimer > 0 ? (
                        <p className="text-sm text-muted-foreground">
                            ارسال مجدد کد تا{" "}
                            <span className="font-bold text-accent">
                                {resendTimer}
                            </span>{" "}
                            ثانیه دیگر
                        </p>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleResendOtp}
                            className="gap-2 text-accent"
                            disabled={isResetting}
                        >
                            <RefreshCw className="w-4 h-4" />
                            ارسال مجدد کد
                        </Button>
                    )}
                </div>
            </div>

            {/* بخش رمز جدید */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="new_password" className="text-sm font-medium">
                        رمز عبور جدید
                    </label>
                    <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            id="new_password"
                            name="new_password"
                            type={showPassword ? "text" : "password"}
                            placeholder="رمز عبور جدید (حداقل ۸ کاراکتر)"
                            value={passwordForm.values.new_password}
                            onChange={passwordForm.handleChange}
                            onBlur={passwordForm.handleBlur}
                            className="pr-10"
                            disabled={isResetting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5 text-muted-foreground" />
                            ) : (
                                <Eye className="w-5 h-5 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                    {passwordForm.touched.new_password && passwordForm.errors.new_password && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <span>⚠️</span>
                            <span>{passwordForm.errors.new_password}</span>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirm_password" className="text-sm font-medium">
                        تکرار رمز عبور جدید
                    </label>
                    <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            id="confirm_password"
                            name="confirm_password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="تکرار رمز عبور جدید"
                            value={passwordForm.values.confirm_password}
                            onChange={passwordForm.handleChange}
                            onBlur={passwordForm.handleBlur}
                            className="pr-10"
                            disabled={isResetting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5 text-muted-foreground" />
                            ) : (
                                <Eye className="w-5 h-5 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                    {passwordForm.touched.confirm_password && passwordForm.errors.confirm_password && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <span>⚠️</span>
                            <span>{passwordForm.errors.confirm_password}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="space-y-2">
                <Button
                    onClick={handleVerifyAndChangePassword}
                    variant="accent"
                    className="w-full gap-2"
                    size="lg"
                    disabled={
                        isResetting ||
                        otpCode.join("").length !== 4 ||
                        !passwordForm.isValid ||
                        !passwordForm.dirty
                    }
                >
                    {isResetting ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                            در حال تغییر رمز عبور...
                        </span>
                    ) : (
                        <>
                            تغییر رمز عبور
                            <ArrowLeft className="w-5 h-5" />
                        </>
                    )}
                </Button>

                <Button
                    variant="ghost"
                    className="w-full gap-2 text-muted-foreground hover:text-foreground"
                    onClick={handleBackToPhone}
                    disabled={isResetting}
                >
                    <ArrowRight className="w-5 h-5" />
                    تغییر شماره موبایل
                </Button>
            </div>
        </form>
    );

    return (
        <>
            {step === "phone" && renderPhoneStep()}
            {step === "verify" && renderVerifyStep()}
        </>
    );
};

export default ForgotPasswordForm;