import { Link } from "react-router-dom";
import { FileText, Phone, Mail, MapPin, Instagram, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground/10">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">آلفاچاپ</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              سامانه هوشمند چاپ مدارک و جزوات با قیمت‌گذاری شفاف و ارسال سریع به سراسر ایران
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">دسترسی سریع</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/order" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                ثبت سفارش
              </Link>
              <Link to="/pricing" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                تعرفه‌ها
              </Link>
              <Link to="/faq" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                سوالات متداول
              </Link>
              <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                درباره ما
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">تماس با ما</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                <span dir="ltr">۰۹۱۲-۱۲۳-۴۵۶۷</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                <span>info@alphachap.ir</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>تهران، خیابان انقلاب</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">شبکه‌های اجتماعی</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-primary-foreground/50">
              پشتیبانی از طریق تلگرام و اینستاگرام
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50">
            © ۱۴۰۳ آلفاچاپ - تمامی حقوق محفوظ است
          </p>
        </div>
      </div>
    </footer>
  );
};
