import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const printTypes = [
  { id: "bw", label: "سیاه و سفید", price: 500 },
  { id: "color", label: "رنگی", price: 3000 },
  { id: "colorB", label: "رنگی کلاس B", price: 2000 },
  { id: "colorC", label: "رنگی کلاس C", price: 1500 },
];

export const PricePreviewSection = () => {
  const [pageCount, setPageCount] = useState(100);
  const [selectedType, setSelectedType] = useState("bw");

  const selectedPrice = printTypes.find((t) => t.id === selectedType)?.price || 500;
  const totalPrice = selectedPrice * pageCount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              قیمت شفاف،
              <br />
              <span className="text-accent">بدون سورپرایز</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              در آلفاچاپ همه چیز شفاف است. قبل از ثبت سفارش، قیمت دقیق را می‌بینید.
              بدون هزینه پنهان، بدون تغییر قیمت.
            </p>
            <Link to="/pricing">
              <Button variant="outline" className="gap-2">
                مشاهده تعرفه کامل
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Calculator */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              محاسبه‌گر قیمت
            </h3>

            {/* Print Type Selection */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium text-foreground">نوع چاپ</label>
              <div className="grid grid-cols-2 gap-2">
                {printTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${selectedType === type.id
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-card hover:border-accent/50"
                      }`}
                  >
                    <div>{type.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatPrice(type.price)} تومان/صفحه
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Page Count */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">تعداد صفحات</label>
                <span className="text-sm font-bold text-accent">{formatPrice(pageCount)} صفحه</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>۱۰</span>
                <span>۵۰۰</span>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">قیمت تخمینی</span>
                <span className="text-2xl font-bold text-accent">
                  {formatPrice(totalPrice)} تومان
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * قیمت نهایی بر اساس تنظیمات دقیق محاسبه می‌شود
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
