import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, Clock, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "پیام ارسال شد",
      description: "به زودی با شما تماس خواهیم گرفت",
    });

    setFormData({ name: "", phone: "", subject: "", message: "" });
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 lg:py-20">
        {/* Header */}
        <div className="container text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            تماس با ما
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            سوال یا پیشنهادی دارید؟ خوشحال می‌شویم از شما بشنویم
          </p>
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">تلفن تماس</h3>
                    <p className="text-muted-foreground" dir="ltr">۰۹۱۲-۱۲۳-۴۵۶۷</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      شنبه تا پنج‌شنبه - ۹ صبح تا ۶ عصر
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">ایمیل</h3>
                    <p className="text-muted-foreground">info@alphachap.ir</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      پاسخ‌گویی در کمتر از ۲۴ ساعت
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">آدرس</h3>
                    <p className="text-muted-foreground">تهران، خیابان انقلاب</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      مراجعه حضوری با هماهنگی قبلی
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Send className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">تلگرام</h3>
                    <p className="text-muted-foreground">@AlphaChapBot</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      پشتیبانی و ارسال فایل
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 lg:p-8 rounded-2xl">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  ارسال پیام
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">نام و نام خانوادگی</label>
                      <Input
                        placeholder="نام شما"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-right"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">شماره تماس</label>
                      <Input
                        type="tel"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="text-right"
                        dir="ltr"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">موضوع</label>
                    <Input
                      placeholder="موضوع پیام"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="text-right"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">پیام</label>
                    <Textarea
                      placeholder="متن پیام خود را بنویسید..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="text-right min-h-[150px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    className="w-full gap-2"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "در حال ارسال..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        ارسال پیام
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
