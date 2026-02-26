import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "چگونه می‌توانم سفارش دهم؟",
    answer:
      "برای ثبت سفارش کافیست از منوی بالا روی 'ثبت سفارش' کلیک کنید، تنظیمات چاپ را انتخاب کنید، فایل خود را ارسال کنید و پرداخت را انجام دهید. کل فرآیند کمتر از ۵ دقیقه طول می‌کشد.",
  },
  {
    question: "چه فرمت‌هایی پشتیبانی می‌شوند؟",
    answer:
      "فقط فرمت PDF پشتیبانی می‌شود. لطفاً قبل از ارسال، فایل خود را به PDF تبدیل کنید. این کار باعث حفظ کیفیت و قالب‌بندی فایل شما می‌شود.",
  },
  {
    question: "زمان چاپ و ارسال چقدر است؟",
    answer:
      "سفارشات معمولی در کمتر از ۲۴ ساعت چاپ می‌شوند. زمان ارسال بستگی به شهر شما دارد - تهران ۱-۲ روز، سایر شهرها ۲-۵ روز کاری.",
  },
  {
    question: "آیا امکان ارسال فایل از تلگرام وجود دارد؟",
    answer:
      "بله! شما می‌توانید فایل PDF خود را از طریق ربات تلگرام ما ارسال کنید. کافیست در مرحله ثبت سفارش، گزینه 'ارسال از تلگرام' را انتخاب کنید.",
  },
  {
    question: "هزینه ارسال چقدر است؟",
    answer:
      "برای سفارشات بالای ۲۰۰,۰۰۰ تومان، ارسال کاملاً رایگان است. برای سفارشات زیر این مبلغ، هزینه ارسال بر اساس شهر مقصد محاسبه می‌شود.",
  },
  {
    question: "آیا امکان لغو سفارش وجود دارد؟",
    answer:
      "بله، تا قبل از شروع چاپ می‌توانید سفارش خود را لغو کنید و مبلغ به حساب شما برگردانده می‌شود. پس از شروع چاپ، امکان لغو وجود ندارد.",
  },
  {
    question: "تفاوت چاپ رنگی کلاس A، B و C چیست؟",
    answer:
      "کلاس A با بالاترین کیفیت و دقت رنگ چاپ می‌شود. کلاس B کیفیت خوبی دارد و مناسب اسناد معمولی است. کلاس C اقتصادی‌ترین گزینه است و برای پیش‌نویس‌ها مناسب است.",
  },
  {
    question: "آیا تخفیف گروهی دارید؟",
    answer:
      "بله! برای سفارشات حجم بالا (بیش از ۵۰۰ صفحه) تخفیف ویژه ارائه می‌دهیم. همچنین کد تخفیف‌های فصلی نیز داریم که در شبکه‌های اجتماعی اعلام می‌شود.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Layout>
      <div className="min-h-screen py-12 lg:py-20">
        {/* Header */}
        <div className="container text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            سوالات متداول
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            پاسخ سوالات رایج درباره خدمات آلفاچاپ
          </p>
        </div>

        {/* FAQ Items */}
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-foreground">{item.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground mb-2">
              سوال دیگری دارید؟
            </h2>
            <p className="text-muted-foreground mb-4">
              تیم پشتیبانی ما آماده پاسخگویی به شماست
            </p>
            <a
              href="/contact"
              className="text-accent font-medium hover:underline"
            >
              تماس با ما ←
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
