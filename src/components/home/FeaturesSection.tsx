import { Calculator, Truck, FileCheck, Clock, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "قیمت لحظه‌ای",
    description: "بدون نیاز به چت یا تماس، قیمت دقیق سفارش خود را همین الان ببینید",
  },
  {
    icon: FileCheck,
    title: "بدون خطا",
    description: "سیستم خودکار از بروز خطای انسانی جلوگیری می‌کند",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    description: "ارسال به سراسر ایران با پست پیشتاز و تیپاکس",
  },
  {
    icon: Clock,
    title: "پیگیری آنلاین",
    description: "وضعیت سفارش خود را در هر لحظه مشاهده کنید",
  },
  {
    icon: CreditCard,
    title: "پرداخت امن",
    description: "پرداخت آنلاین امن از طریق درگاه بانکی معتبر",
  },
  {
    icon: Headphones,
    title: "پشتیبانی",
    description: "تیم پشتیبانی ما همیشه در دسترس شماست",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            چرا آلفاچاپ؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            سامانه‌ای که برای سادگی و شفافیت طراحی شده است
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
