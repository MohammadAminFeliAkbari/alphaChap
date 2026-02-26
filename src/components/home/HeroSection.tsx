import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, Clock, Shield, ArrowLeft } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Printer className="w-4 h-4" />
              سامانه هوشمند چاپ آنلاین
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              چاپ مدارک و جزوات
              <br />
              <span className="text-accent">بدون چت، با قیمت شفاف</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              آلفاچاپ یک سامانه خودکار برای چاپ مدارک شماست.
              قیمت لحظه‌ای ببینید، فایل ارسال کنید و سفارشتان را پیگیری کنید.
              بدون نیاز به چت و پرسش قیمت.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/order">
                <Button variant="hero" className="gap-2">
                  ثبت سفارش
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="hero-outline">
                  مشاهده تعرفه‌ها
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">۲۴</p>
                  <p className="text-sm text-muted-foreground">ساعته ارسال</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">۱۰۰٪</p>
                  <p className="text-sm text-muted-foreground">تضمین کیفیت</p>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative lg:block animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Main Card */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">پیش‌نمایش قیمت</span><Link to="/order">
                      <Button variant="default" className="gap-2">
                        ثبت اولین سفارش
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm">چاپ سیاه و سفید</span>
                      <span className="text-sm font-bold text-accent">۵۰۰ تومان</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm">چاپ رنگی</span>
                      <span className="text-sm font-bold text-accent">۳,۰۰۰ تومان</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm">صحافی فنری</span>
                      <span className="text-sm font-bold text-accent">۱۵,۰۰۰ تومان</span>
                    </div>
                  </div>

                  {/* <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">جمع کل (۱۰۰ صفحه)</span>
                      <span className="text-xl font-bold text-accent">۶۵,۰۰۰ تومان</span>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Floating Elements */}
              {/* <div className="absolute -top-4 -left-4 glass-card p-3 rounded-xl animate-pulse-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-status-shipped/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-status-shipped" />
                  </div>
                  <span className="text-xs font-medium">ارسال شد</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
