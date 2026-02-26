import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, ArrowLeft, Shield, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "شفافیت",
    description: "قیمت‌گذاری شفاف بدون هیچ هزینه پنهانی",
  },
  {
    icon: Zap,
    title: "سرعت",
    description: "چاپ و ارسال سریع در کمترین زمان ممکن",
  },
  {
    icon: Heart,
    title: "کیفیت",
    description: "تضمین کیفیت چاپ با بهترین تجهیزات",
  },
];

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground py-20 lg:py-28">
          <div className="container text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              درباره آلفاچاپ
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              ما یک تیم از متخصصان چاپ هستیم که با هدف ساده‌سازی فرآیند چاپ مدارک،
              آلفاچاپ را راه‌اندازی کردیم.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  <Target className="w-4 h-4" />
                  مأموریت ما
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  حذف دردسر چاپ مدارک
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  دیگر نیازی نیست برای فهمیدن قیمت چاپ، چت کنید یا تماس بگیرید.
                  دیگر نیازی نیست نگران کیفیت یا زمان تحویل باشید.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  آلفاچاپ یک سیستم خودکار است که همه چیز را شفاف می‌کند:
                  قیمت لحظه‌ای، وضعیت سفارش در هر لحظه، و کیفیت تضمین شده.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-2xl text-center">
                  <p className="text-4xl font-bold text-accent mb-2">+۵۰۰۰</p>
                  <p className="text-muted-foreground">سفارش موفق</p>
                </div>
                <div className="glass-card p-6 rounded-2xl text-center">
                  <p className="text-4xl font-bold text-accent mb-2">۳۱</p>
                  <p className="text-muted-foreground">استان</p>
                </div>
                <div className="glass-card p-6 rounded-2xl text-center">
                  <p className="text-4xl font-bold text-accent mb-2">۹۸٪</p>
                  <p className="text-muted-foreground">رضایت</p>
                </div>
                <div className="glass-card p-6 rounded-2xl text-center">
                  <p className="text-4xl font-bold text-accent mb-2">۲۴h</p>
                  <p className="text-muted-foreground">چاپ و ارسال</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                ارزش‌های ما
              </h2>
              <p className="text-lg text-muted-foreground">
                اصولی که همیشه به آنها پایبند هستیم
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="glass-card p-8 rounded-2xl text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              آماده تجربه چاپ متفاوت هستید؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              همین الان اولین سفارش خود را ثبت کنید و تفاوت را ببینید
            </p>
            <Link to="/order">
              <Button variant="accent" size="lg" className="gap-2">
                شروع کنید
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
