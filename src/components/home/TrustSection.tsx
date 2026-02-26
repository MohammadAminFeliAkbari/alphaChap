import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";

const guarantees = [
  "تضمین کیفیت چاپ",
  "بازگشت وجه در صورت نارضایتی",
  "پشتیبانی ۷ روز هفته",
  "ارسال رایگان سفارش‌های بالای ۲۰۰ هزار تومان",
];

export const TrustSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              اعتماد هزاران مشتری
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              آلفاچاپ با هدف ایجاد یک سیستم چاپ بدون خطا و با قیمت شفاف ایجاد شده است. 
              ما به کیفیت و رضایت شما متعهدیم.
            </p>

            <ul className="space-y-3">
              {guarantees.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/order">
              <Button 
                variant="accent" 
                size="lg"
                className="gap-2 mt-4"
              >
                همین الان سفارش دهید
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-primary-foreground/10 text-center">
              <p className="text-4xl font-bold text-accent mb-2">+۵۰۰۰</p>
              <p className="text-primary-foreground/70">سفارش موفق</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary-foreground/10 text-center">
              <p className="text-4xl font-bold text-accent mb-2">۹۸٪</p>
              <p className="text-primary-foreground/70">رضایت مشتری</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary-foreground/10 text-center">
              <p className="text-4xl font-bold text-accent mb-2">۳۱</p>
              <p className="text-primary-foreground/70">استان تحت پوشش</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary-foreground/10 text-center">
              <p className="text-4xl font-bold text-accent mb-2">۲۴h</p>
              <p className="text-primary-foreground/70">زمان پردازش</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
