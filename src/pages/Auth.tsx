import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuthStore";
import OtpVerification from "./Auth/OtpVerification";
import LoginForm from "./Auth/LoginFrom";
import SignupForm from "./Auth/SignUp";
import ForgetPassword from "./Auth/ForgetPassword";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup" | 'forget'>("login");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [textInTopHeader, setTextHeader] = useState<'ورود به حساب کاربری' | 'ثبت نام در آلفاچاپ' | 'تأیید شماره و تغییر رمز'>('ورود به حساب کاربری')

  // Redirect if already authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated, navigate]);

  // const handleBackToForm = () => {
  //   setStep("form");
  // };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">

            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">{textInTopHeader}</h3>
            </div>
          </div>

          {/* Main Content */}
          <div className="glass-card p-6 rounded-2xl">
            {step === "otp" ? (
              <OtpVerification
                formData={formData}
                onToggleMode={() => {
                  setMode('signup');
                  setStep('form')
                }}
              />
            ) : mode === "login" ? (
              <LoginForm
                onFormDataChange={setFormData}
                onToggleMode={setMode}
                changeText={() => setTextHeader('ورود به حساب کاربری')}
              />
            ) : mode === 'signup' ? (
              <SignupForm
                onFormDataChange={setFormData}
                onToggleMode={() => setMode("login")}
                onSendOtp={() => setStep("otp")}
                formData={formData}
                changeText={() => { setTextHeader('ثبت نام در آلفاچاپ') }}
              />
            ) : (
              <ForgetPassword
                onBack={() => setMode('signup')}
                formData={formData}
                changeText={() => { setTextHeader('تأیید شماره و تغییر رمز') }} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;