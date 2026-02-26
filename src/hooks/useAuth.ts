import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { API_CONFIG } from "@/config/api";
import { useAuth, User } from "@/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Axios, AxiosError } from "axios";

// // =====================================================
// // آلفاچاپ - Auth Hooks با TanStack Query
// // =====================================================

interface LoginRequest {
    phone_number: string;
    password: string;
}


interface RegisterRequest {
    phone_number: string;
    password: string;
    // firstName?: string;
    // lastName?: string;
}

interface SendOTP {
    phone_number: string;
    otp: string
}

interface OtpRequest {
    phone: string;
}

interface VerifyOtpRequest {
    phone_number: string;
    otp: string;
}

interface ResetPasswordRequest {
    phone: string;
    code: string;
    newPassword: string;
}


interface AuthResponse {
    refresh: string;
    access: string;
    user: User;
}

interface ForgetPasswordVerifyOTP {
    phone_number: string,
    otp: string,
    new_password: string
}

// // ورود
export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: LoginRequest) => {
            const response = await api.post<AuthResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN,
                data, {
                headers: {
                    Authorization: ''
                }
            }
            )
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data);

            login(data.user, { refreshToken: data.refresh, accessToken: data.access })
            toast.success("خوش آمدید!");
            navigate("/");
        },
        onError: (error: any) => {
            const status = error.response.status;
            console.log(error);

            if (status == 400)
                error.response.data.detail.forEach(element => {
                    toast.error(element)
                });
            else if (status == 401)
                toast.error("هیچ اکانت فعالی برای اطلاعات داده شده یافت نشد")

            else
                toast.error(error.response?.data?.message || "خطا در ورود");
        },
    });
};

export const useSendOTP = () => {
    const { login } = useAuth()

    return useMutation({
        mutationFn: async (data: RegisterRequest) => {
            const response = await api.post(
                API_CONFIG.ENDPOINTS.AUTH.SEND_OTP,
                data, {
                headers: {
                    Authorization: ''
                }
            }
            )
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data.detail);
        },
        onError: (error: any) => {
            const status = error.response.status;
            console.log(error);

            if (status === 400)
                if (error.response.data.phone_number)
                    toast.error(error.response.data.phone_number)
                else if (error.response.data[0])
                    toast.error(error.response.data[0])
                else
                    console.log('error');

            else
                toast.error('خطا دراتصال به سرور')
        },
    });
};

export const useLogout = () => {
    const { logout, tokens } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async () => {
            const response = await api.post(
                API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
                { refresh: tokens.refreshToken }
            );
            return response.data;
        },
        onSuccess: (data) => {
            logout()
            toast.success(data.detail)
            navigate('/')
        },
        onError: (error) => {
            toast.error('خطای دراتصال به پایگاه داده')
        }

    })
}

// // ثبت نام
export const useRegisterOTP = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    return useMutation({
        mutationFn: async (data: SendOTP) => {
            const response = await api.post(
                API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP,
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            login(data.user, { refreshToken: data.refresh, accessToken: data.access })
            toast.success("ثبت نام با موفقیت انجام شد.");
            navigate('/')
        },
        onError: (error: any) => {
            const status = error.response.status;

            if (status === 400)
                toast.error(error.response.data.non_field_errors)
            else
                toast.error(error.response?.data?.message || "خطا در ثبت نام");
        },
    });
};

export const useUser = () => {
    const navigate = useNavigate()
    const { login, isAuthenticated, logout } = useAuth()

    return useQuery({
        queryKey: ['user', 'profile'],
        queryFn: async () => {
            try {
                const response = await api.get(
                    API_CONFIG.ENDPOINTS.USERS.PROFILE
                );
                return response.data;
            } catch (error) {
                if (error.response?.status === 401) {
                    logout();
                    navigate('/auth');
                }
                throw error;
            }
        },
        enabled: isAuthenticated,
        retry: (failureCount, error) => {
            // فقط روی خطاهای غیر 401 رتری کنید
            return error.response?.status !== 401 && failureCount < 2;
        },
        staleTime: 10 * 60 * 1000, // 10 دقیقه
    });
};

export const useForgetPasswordSendOTP = () => {
    return useMutation({
        mutationFn: async (data: { phone_number: string }) => {
            const response = await api.post(
                API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD_SEND_OTP,
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success(data.detail)
        },
        onError: (error: any) => {
            const status = error.response.status
            console.log(error);

            if (status === 400)
                if (error.response.data.phone_number)
                    toast.error(error.response.data.phone_number)
                else if (error.response.data[0])
                    toast.error(error.response.data[0])
                else
                    console.log('error');

            else
                toast.error('خطا دراتصال به سرور')
        }
    })
}


export const useVerifyOtpAndChangePassword = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (data: ForgetPasswordVerifyOTP) => {
            const response = await api.post(
                API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD_VERIFY_OTP,
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data);
            login(data.user, { refreshToken: data.refresh, accessToken: data.access })
            navigate('/')
            toast.success('خوش امدید!')
        },
        onError: (error: any) => {
            console.log(error);
            const status = error.response.status

            if (status === 400)
                toast.error(error.response.data.non_field_errors)
        }
    })
}
// // ارسال کد OTP
// export const useSendOtp = () => {
//     return useMutation({
//         mutationFn: async (data: OtpRequest) => {
//             const response = await api.post(
//                 API_CONFIG.ENDPOINTS.AUTH.SEND_OTP,
//                 data
//             );
//             return response.data;
//         },
//         onSuccess: () => {
//             toast.success("کد تأیید ارسال شد");
//         },
//         onError: (error: any) => {
//             toast.error(error.response?.data?.message || "خطا در ارسال کد");
//         },
//     });
// };

// // تأیید کد OTP
// export const useVerifyOtp = () => {
//     const { setTokens, setUser } = useAuthStore();
//     const navigate = useNavigate();

//     return useMutation({
//         mutationFn: async (data: VerifyOtpRequest) => {
//             const response = await api.post<AuthResponse>(
//                 API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP,
//                 data
//             );
//             return response.data;
//         },
//         onSuccess: (data) => {
//             setTokens(data.accessToken, data.refreshToken);
//             if (data.user) setUser(data.user);
//             toast.success("حساب شما تأیید شد!");
//             navigate("/dashboard");
//         },
//         onError: (error: any) => {
//             toast.error(error.response?.data?.message || "کد وارد شده صحیح نیست");
//         },
//     });
// };

// // فراموشی رمز عبور
// export const useForgotPassword = () => {
//     return useMutation({
//         mutationFn: async (data: OtpRequest) => {
//             const response = await api.post(
//                 API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD,
//                 data
//             );
//             return response.data;
//         },
//         onSuccess: () => {
//             toast.success("کد بازیابی ارسال شد");
//         },
//         onError: (error: any) => {
//             toast.error(error.response?.data?.message || "خطا در ارسال کد");
//         },
//     });
// };

// // بازنشانی رمز عبور
// export const useResetPassword = () => {
//     const navigate = useNavigate();

//     return useMutation({
//         mutationFn: async (data: ResetPasswordRequest) => {
//             const response = await api.post(
//                 API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD,
//                 data
//             );
//             return response.data;
//         },
//         onSuccess: () => {
//             toast.success("رمز عبور با موفقیت تغییر کرد");
//             navigate("/auth?mode=login");
//         },
//         onError: (error: any) => {
//             toast.error(error.response?.data?.message || "خطا در تغییر رمز عبور");
//         },
//     });
// };

// // خروج
// export const useLogout = () => {
//     const { logout, refreshToken } = useAuthStore();
//     const navigate = useNavigate();

//     return useMutation({
//         mutationFn: async () => {
//             await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, { refreshToken });
//         },
//         onSettled: () => {
//             logout();
//             toast.success("با موفقیت خارج شدید");
//             navigate("/");
//         },
//     });
// };

// // دریافت پروفایل کاربر
// export const useProfile = () => {
//     const { isAuthenticated, setUser } = useAuthStore();

//     return useQuery({
//         queryKey: ["profile"],
//         queryFn: async () => {
//             const response = await api.get<User>(API_CONFIG.ENDPOINTS.USERS.PROFILE);
//             return response.data;
//         },
//         enabled: isAuthenticated,
//         onSuccess: (data: User) => {
//             setUser(data);
//         },
//     } as any);
// };

// // بروزرسانی پروفایل
// export const useUpdateProfile = () => {
//     const { setUser } = useAuthStore();

//     return useMutation({
//         mutationFn: async (data: Partial<User>) => {
//             const response = await api.put<User>(
//                 API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE,
//                 data
//             );
//             return response.data;
//         },
//         onSuccess: (data) => {
//             setUser(data);
//             toast.success("پروفایل بروزرسانی شد");
//         },
//         onError: (error: any) => {
//             toast.error(error.response?.data?.message || "خطا در بروزرسانی پروفایل");
//         },
//     });
// };
