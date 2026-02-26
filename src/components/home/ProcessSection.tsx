import { Upload, Settings, CreditCard, Package } from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "تنظیم چاپ",
    description: "نوع چاپ، کاغذ، صحافی و تعداد را مشخص کنید",
    number: "۱",
  },
  {
    icon: Upload,
    title: "ارسال فایل",
    description: "فایل PDF خود را آپلود کنید یا از تلگرام ارسال کنید",
    number: "۲",
  },
  {
    icon: CreditCard,
    title: "پرداخت",
    description: "قیمت نهایی را ببینید و پرداخت کنید",
    number: "۳",
  },
  {
    icon: Package,
    title: "دریافت",
    description: "سفارش شما چاپ و ارسال می‌شود",
    number: "۴",
  },
];

export const ProcessSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            مراحل ثبت سفارش
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            در کمتر از ۵ دقیقه سفارش خود را ثبت کنید
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Number Badge */}
                  <div className="z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg absolute right-3 top-3">
                    <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                  </div>
                  
                  {/* Icon Card */}
                  <div className="w-full p-6 rounded-2xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
