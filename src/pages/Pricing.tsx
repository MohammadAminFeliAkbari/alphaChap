'use client'

import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { useMemo, useState } from "react";

// فرمت کردن قیمت به تومان
const formatPrice = (price: number) => new Intl.NumberFormat("fa-IR").format(price);

// دیتای تعرفه‌ها
export const pricingMatrix = {
  sizes: ["A4", "A5", "A3"],
  printTypes: ["سیاه و سفید", "رنگی", "رنگی کلاس B", "رنگی کلاس C"],

  data: {
    "سیاه و سفید": {
      A4: [
        { min: 1, max: 499, single: 500, double: 450 },
        { min: 500, max: null, single: 450, double: 400 },
      ],
      A5: [
        { min: 1, max: null, single: 300, double: 270 },
      ],
      A3: [
        { min: 1, max: null, single: 1000, double: 900 },
      ],
    },

    "رنگی": {
      A4: [{ min: 1, max: null, single: 3000, double: 2700 }],
      A5: [{ min: 1, max: null, single: 1800, double: 1620 }],
      A3: [{ min: 1, max: null, single: 6000, double: 5400 }],
    },

    "رنگی کلاس B": {
      A4: [{ min: 1, max: null, single: 2000, double: 1800 }],
      A5: [{ min: 1, max: null, single: 1200, double: 1080 }],
    },

    "رنگی کلاس C": {
      A4: [{ min: 1, max: null, single: 1500, double: 1350 }],
      A5: [{ min: 1, max: null, single: 900, double: 810 }],
    },
  },
};

const Pricing = () => {
  const [size, setSize] = useState("A4");
  const [printType, setPrintType] = useState("سیاه و سفید");

  // فیلتر کردن داده‌ها بر اساس انتخاب‌ها
  const rows = useMemo(() => {
    return pricingMatrix.data?.[printType]?.[size] ?? [];
  }, [size, printType]);

  return (
    <Layout>
      <div className="min-h-screen py-12 lg:py-20">
        {/* Header */}
        <div className="container text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            تعرفه چاپ
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            قیمت‌های شفاف و بدون هزینه پنهان. همان قیمتی که می‌بینید، همان قیمتی که می‌پردازید.
          </p>
        </div>

        {/* Pricing Tables */}
        <div className="container">
          <div className="glass-card rounded-2xl overflow-hidden mb-12">

            {/* ===== Filters ===== */}
            <div className="p-4 border-b border-border space-y-4">

              {/* Print type */}
              <div className="flex flex-wrap gap-2">
                {pricingMatrix.printTypes.map(type => (
                  <Button
                    key={type}
                    onClick={() => setPrintType(type)}
                    className={`px-4 py-2 rounded-full border transition
                    ${printType === type ? "bg-accent text-accent-foreground" : "bg-background hover:bg-secondary text-gray-600"}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>

              {/* Size */}
              <div className="flex gap-2">
                {pricingMatrix.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-full border transition
                    ${size === s ? "bg-accent text-accent-foreground" : "bg-background hover:bg-secondary"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* ===== Table ===== */}
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead className="bg-secondary/40">
                  <tr>
                    <th className="p-4 border-b">تعداد برگ</th>
                    <th className="p-4 border-b">یک‌رو (تومان)</th>
                    <th className="p-4 border-b">دورو (تومان)</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-muted-foreground">
                        تعرفه‌ای برای این انتخاب وجود ندارد
                      </td>
                    </tr>
                  )}

                  {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-secondary/20 transition">
                      <td className="p-4 border-b">
                        {row.max ? `${row.min} - ${row.max}` : `${row.min} به بالا`}
                      </td>
                      <td className="p-4 border-b font-bold text-accent">
                        {formatPrice(row.single)}
                      </td>
                      <td className="p-4 border-b font-bold text-accent">
                        {formatPrice(row.double)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          {/* Features */}
          <div className="glass-card rounded-2xl p-6 mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              مزایای سفارش از آلفاچاپ
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "بدون هزینه پنهان",
                "ارسال رایگان بالای ۲۰۰ هزار تومان",
                "تخفیف سفارشات حجم بالا",
                "تضمین کیفیت چاپ",
                "ارسال سریع به سراسر ایران",
                "پشتیبانی ۷ روز هفته",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-status-shipped/10">
                  <Check className="w-5 h-5 text-status-shipped shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              آماده ثبت سفارش هستید؟
            </p>
            <Link to="/order">
              <Button variant="accent" size="lg" className="gap-2">
                شروع سفارش
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
