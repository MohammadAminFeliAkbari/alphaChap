import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useSendOTP } from "@/hooks/useAuth";

interface SignupFormProps {
    onToggleMode: () => void;
    onSendOtp: () => void,
    onFormDataChange: React.Dispatch<React.SetStateAction<{
        name: string;
        phone_number: string;
        email: string;
        password: string;
    }>>
    changeText: () => void
    formData: {
        name: string;
        phone_number: string;
        email: string;
        password: string;
    }
}

// اعتبارسنجی مشابه با LoginForm
const validationSchema = Yup.object({
    // name: Yup.string()
    //     .required("نام و نام خانوادگی الزامی است")
    //     .min(3, "نام باید حداقل ۳ کاراکتر باشد"),
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
    // email: Yup.string()
    //     .email("ایمیل معتبر نیست")
    //     .optional(),
    password: Yup.string()
        .required("رمز عبور الزامی است")
        .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)/,
            "رمز عبور باید شامل حداقل یک حرف و یک عدد باشد"
        )
});

const SignupForm = ({ onToggleMode, onSendOtp, onFormDataChange, changeText, formData }: SignupFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, error, isPending } = useSendOTP()
    const [showErrorAfterClick, setShowErrorAfterClick] = useState(false)

    useEffect(() => {
        changeText()
    }, [])


    const formik = useFormik({
        initialValues: {
            phone_number: formData?.phone_number,
            password: formData?.password
        },
        validationSchema,
        onSubmit: (values) => {
            mutate({ phone_number: values.phone_number, password: values.password }, {
                onSuccess: () => {
                    onFormDataChange({
                        password: values.password,
                        phone_number: values.phone_number,
                        name: '',
                        email: ''
                    });
                    onSendOtp();
                }
            })
        },
        validateOnChange: true,
        validateOnBlur: true
    });

    // تابع مشابه برای نمایش قالب شماره تلفن
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
        formik.setFieldValue('phone_number', formatted);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    نام و نام خانوادگی
                </label>
                <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="نام کامل"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`pr-10 text-right ${formik.touched.name && formik.errors.name ? 'border-red-500 focus:ring-red-200' : ''}`}
                    />
                </div>
                {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>{formik.errors.name}</span>
                    </div>
                )}
                {formik.touched.name && !formik.errors.name && formik.values.name.length > 0 && (
                    <div className="text-green-600 text-xs mt-1">✓ نام معتبر</div>
                )}
            </div> */}

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
                        value={formik.values.phone_number}
                        onChange={handlePhoneChange}
                        onBlur={formik.handleBlur}
                        className={`pr-10 text-right ${formik.touched.phone_number && formik.errors.phone_number && showErrorAfterClick ? 'border-red-500 focus:ring-red-200' : ''}`}
                        dir="ltr"
                    />
                </div>
                {formik.touched.phone_number && formik.errors.phone_number && showErrorAfterClick && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>{formik.errors.phone_number}</span>
                    </div>
                )}
            </div>

            {/* <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    ایمیل (اختیاری)
                </label>
                <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`pr-10 text-right ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
                        dir="ltr"
                    />
                </div>
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>{formik.errors.email}</span>
                    </div>
                )}
                {formik.touched.email && !formik.errors.email && formik.values.email.length > 0 && (
                    <div className="text-green-600 text-xs mt-1">✓ ایمیل معتبر</div>
                )}
            </div> */}

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                    رمز عبور
                </label>
                <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="رمز عبور (حداقل ۸ کاراکتر با حروف و اعداد)"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`pr-10 pl-10 text-right ${formik.touched.password && formik.errors.password && showErrorAfterClick ? 'border-red-500 focus:ring-red-200' : ''}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Eye className="w-5 h-5 text-muted-foreground" />
                        )}
                    </button>
                </div>
                {formik.touched.password && formik.errors.password && showErrorAfterClick && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        <span>{formik.errors.password}</span>
                    </div>
                )}
            </div>

            <Button
                type="submit"
                variant="accent"
                className="w-full gap-2"
                size="lg"
                onClick={() => { setShowErrorAfterClick(true) }}
                disabled={isPending}
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                        در حال بررسی...
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
                    قبلاً ثبت‌نام کرده‌اید؟
                    <button
                        type="button"
                        onClick={onToggleMode}
                        className="text-accent font-medium mr-2 hover:underline"
                    >
                        وارد شوید
                    </button>
                </p>
            </div>
        </form>
    );
};

export default SignupForm;