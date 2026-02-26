import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";

interface LoginFormProps {
  onToggleMode: React.Dispatch<React.SetStateAction<"login" | "signup" | "forget">>;
  onFormDataChange: React.Dispatch<React.SetStateAction<{
    name: string;
    phone_number: string;
    email: string;
    password: string;
  }>>
  changeText: () => void
}


const validationSchema = Yup.object({
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
  password: Yup.string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "رمز عبور باید شامل حداقل یک حرف و یک عدد باشد"
    )
});

const LoginForm = ({ onToggleMode, onFormDataChange, changeText }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const [showErrorAfterClick, setShowErrorAfterClick] = useState(false)

  useEffect(() => {
    changeText()
  }, [])


  const formik = useFormik({
    initialValues: {
      phone_number: "",
      password: ""
    },
    validationSchema,
    onSubmit: (values) => {
      // نرمال‌سازی شماره موبایل قبل از ارسال
      const normalizedPhone = values.phone_number.replace(/^(\+98|0)/, '0');
      login({
        phone_number: normalizedPhone,
        password: values.password
      });
    },
    validateOnChange: true,
    validateOnBlur: true
  });

  // تابع برای نمایش قالب شماره تلفن
  const formatPhoneNumber = (value: string) => {
    if (!value) return "";

    // حذف تمام غیر ارقام
    const numbers = value.replace(/\D/g, '');

    // اگر با ۹ شروع شده
    if (numbers.startsWith('9') && numbers.length <= 10) {
      return `0${numbers.slice(0, 10)}`;
    }

    // اگر با ۰۹ شروع شده
    if (numbers.startsWith('09') && numbers.length <= 11) {
      return numbers.slice(0, 11);
    }

    // اگر با +98 شروع شده
    if (numbers.startsWith('98') && numbers.length <= 12) {
      return `0${numbers.slice(2, 12)}`;
    }

    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    formik.setFieldValue('phone_number', formatted);
    onFormDataChange(pre => ({ ...pre, phone_number: formatted }))
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
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
        {formik.errors.phone_number && showErrorAfterClick && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <span>⚠️</span>
            <span>{formik.errors.phone_number}</span>
          </div>
        )}
      </div>

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

      {/* نمایش خطا از API */}
      {/* {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center flex items-center justify-center gap-2">
          <span>⚠️</span>
          <span>{error.message || "خطا در ورود"}</span>
        </div>
      )} */}

      <div className="text-left">
        <Button variant="link" type="button" className="h-auto p-0 text-sm text-accent" onClick={() => { onToggleMode('forget') }}>
          فراموشی رمز عبور؟
        </Button>
      </div>

      <Button
        type="submit"
        variant="accent"
        className="w-full gap-2"
        size="lg"
        onClick={() => setShowErrorAfterClick(true)}
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
            در حال ورود...
          </span>
        ) : (
          <>
            ورود
            <ArrowLeft className="w-5 h-5" />
          </>
        )}
      </Button>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          حساب کاربری ندارید؟
          <button
            type="button"
            onClick={() => { onToggleMode('signup') }}
            className="text-accent font-medium mr-2 hover:underline"
          >
            ثبت‌نام کنید
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;