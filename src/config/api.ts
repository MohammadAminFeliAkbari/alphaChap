// =====================================================
// آلفاچاپ - API Configuration
// =====================================================
// تنظیم آدرس API در اینجا انجام شود

export const API_CONFIG = {
    // آدرس پایه API را اینجا وارد کنید
    BASE_URL: "http://127.0.0.1:8000/api/v1", // <-- این را تغییر دهید

    // مسیرهای API
    ENDPOINTS: {
        // احراز هویت
        AUTH: {
            LOGIN: "/auth/login/",
            REGISTER: "/auth/register/",
            REFRESH: "/auth/refresh/",
            LOGOUT: "/auth/logout/",
            SEND_OTP: "/auth/signup/send-otp/",
            VERIFY_OTP: "/auth/signup/verify-otp/",
            FORGOT_PASSWORD_SEND_OTP: "/auth/forget-password/send-otp", 
            FORGOT_PASSWORD_VERIFY_OTP: "/auth/forget-password/verify-otp",
            RESET_PASSWORD: "/auth/reset-password/",
        },

        // کاربران
        USERS: {
            PROFILE: "/account/me/",
            UPDATE_PROFILE: "/users/profile",
            ADDRESSES: "/users/addresses",
            ADD_ADDRESS: "/users/addresses",
            UPDATE_ADDRESS: (id: string) => `/users/addresses/${id}`,
            DELETE_ADDRESS: (id: string) => `/users/addresses/${id}`,
        },

        // سفارشات
        ORDERS: {
            LIST: "/orders",
            CREATE: "/orders",
            DETAIL: (id: string) => `/orders/${id}`,
            CANCEL: (id: string) => `/orders/${id}/cancel`,
            CALCULATE_PRICE: "/orders/calculate-price",
        },

        // تراکنش‌ها
        TRANSACTIONS: {
            LIST: "/transactions",
            DETAIL: (id: string) => `/transactions/${id}`,
        },

        // پرداخت
        PAYMENT: {
            CREATE: "/payment/create",
            VERIFY: "/payment/verify",
            APPLY_DISCOUNT: "/payment/apply-discount",
        },

        // خدمات چاپ
        SERVICES: {
            LIST: "/services",
            TARIFFS: "/services/tariffs",
            OPTIONS: "/services/options",
        },

        // آپلود فایل
        UPLOAD: {
            FILE: "/upload/file",
            TELEGRAM_INFO: "/upload/telegram-info",
        },

        // صفحات استاتیک
        PAGES: {
            ABOUT: "/pages/about",
            CONTACT: "/pages/contact",
            FAQ: "/pages/faq",
        },

        // ادمین
        ADMIN: {
            DASHBOARD: "/admin/dashboard",
            USERS: "/admin/users",
            USER_DETAIL: (id: string) => `/admin/users/${id}`,
            ORDERS: "/admin/orders",
            ORDER_DETAIL: (id: string) => `/admin/orders/${id}`,
            UPDATE_ORDER_STATUS: (id: string) => `/admin/orders/${id}/status`,
            TARIFFS: "/admin/tariffs",
            UPDATE_TARIFF: (id: string) => `/admin/tariffs/${id}`,
            TRANSACTIONS: "/admin/transactions",
            EXPORT_TRANSACTIONS: "/admin/transactions/export",
            SETTINGS: "/admin/settings",
            DAILY_LIMIT: "/admin/settings/daily-limit",
            PAGES: "/admin/pages",
        },
    },
} as const;

export type ApiEndpoints = typeof API_CONFIG.ENDPOINTS;
