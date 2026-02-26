# ---- Stage 1: Build ----
# در این مرحله، پروژه React شما بیلد می‌شود
FROM node:20-alpine AS build

WORKDIR /app

# فقط package.json را کپی می‌کنیم تا از کش داکر استفاده بهینه شود
COPY package*.json ./
RUN npm install

# تمام سورس کد را کپی کرده و پروژه را بیلد می‌کنیم
COPY . .
RUN npm run build

# ---- Stage 2: Production ----
# در این مرحله، فقط خروجی بیلد را روی یک سرور Nginx قرار می‌دهیم
FROM nginx:1.27-alpine

# فایل‌های استاتیک بیلد شده را از مرحله قبل به پوشه پیش‌فرض Nginx کپی می‌کنیم
COPY --from=build /app/dist /usr/share/nginx/html

# VVVVVV این خط را از کامنت خارج کنید VVVVVV
# فایل کانفیگ سفارشی ما را برای پشتیبانی از React Router کپی می‌کند
COPY nginx.conf /etc/nginx/conf.d/default.conf

# پورت 80 که پورت پیش‌فرض Nginx است را باز می‌کنیم
EXPOSE 80

# سرور Nginx را اجرا می‌کنیم
CMD ["nginx", "-g", "daemon off;"]