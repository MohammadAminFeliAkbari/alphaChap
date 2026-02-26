import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "@/config/api";
import { useAuth } from "@/hooks/useAuthStore";

// =====================================================
// Axios Instance با پشتیبانی JWT
// =====================================================

export const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    // timeout: 30000,
});

// // Request Interceptor - اضافه کردن توکن به هدر
// Request Interceptor - اضافه کردن توکن به هدر
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        try {
            const { tokens } = useAuth.getState();

            // بررسی وجود توکن قبل از استفاده
            if (tokens?.accessToken && config.headers) {
                config.headers.Authorization = `Bearer ${tokens.accessToken}`;
            }

            return config;
        } catch (error) {
            console.error("Error in request interceptor:", error);
            return config;
        }
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor - مدیریت Refresh Token
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const { tokens, setTokens } = useAuth.getState();

        // اگر خطای 401 باشد و قبلاً retry نشده باشد
        if (error.response?.status === 401 && !originalRequest._retry && tokens?.refreshToken) {
            originalRequest._retry = true;

            try {
                // درخواست توکن جدید
                const response = await axios.post(
                    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
                    { "refresh": tokens.refreshToken }
                );

                const { access: newAccessToken, refresh: newRefreshToken } = response.data;

                // ذخیره توکن‌های جدید
                setTokens({
                    "accessToken": newAccessToken,
                    "refreshToken": newRefreshToken
                });

                // تکرار درخواست اصلی با توکن جدید
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return api(originalRequest);
            } catch (refreshError) {
                // اگر refresh هم fail شد، logout کن
                const { logout } = useAuth.getState();
                logout();
                window.location.href = "/auth";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
