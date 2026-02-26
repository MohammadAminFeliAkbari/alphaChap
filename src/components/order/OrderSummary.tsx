import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ShoppingCart, Plus } from "lucide-react";
import type { PrintConfig } from "@/hooks/useCart";

interface OrderSummaryProps {
  config: PrintConfig;
  pageCount: number;
  fileName: string;
  price: number;
  onBack: () => void;
  onAddToCart: () => void;
}

export const OrderSummary = ({
  config,
  pageCount,
  fileName,
  price,
  onBack,
  onAddToCart,
}: OrderSummaryProps) => {
  const formatPrice = (p: number) => new Intl.NumberFormat("fa-IR").format(p);

  const getPrintTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      bw: "سیاه و سفید",
      color: "رنگی",
      colorB: "رنگی کلاس B",
      colorC: "رنگی کلاس C",
    };
    return labels[type] || type;
  };

  const getBindingLabel = (binding: string) => {
    const labels: Record<string, string> = {
      none: "بدون صحافی",
      spiral: "فنری",
      staple: "منگنه",
      tape: "چسب گرم",
    };
    return labels[binding] || binding;
  };

  return (
    <div className="glass-card p-6 rounded-2xl animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-status-shipped/20 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-status-shipped" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">تأیید سفارش</h2>
          <p className="text-sm text-muted-foreground">جزئیات سفارش خود را بررسی کنید</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Order Details */}
        <div className="p-4 rounded-xl bg-secondary/50">
          <h3 className="font-medium mb-4">{fileName}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">نوع چاپ:</span>
              <span className="mr-2 font-medium">{getPrintTypeLabel(config.printType)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">اندازه:</span>
              <span className="mr-2 font-medium">{config.paperType.toUpperCase()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">چاپ:</span>
              <span className="mr-2 font-medium">{config.sided === "double" ? "دو رو" : "یک رو"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">صحافی:</span>
              <span className="mr-2 font-medium">{getBindingLabel(config.binding)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">تعداد صفحات:</span>
              <span className="mr-2 font-medium">{pageCount} صفحه</span>
            </div>
            <div>
              <span className="text-muted-foreground">تعداد نسخه:</span>
              <span className="mr-2 font-medium">{config.copies} نسخه</span>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
          <div className="flex justify-between items-center">
            <span className="font-medium">قیمت این فایل</span>
            <span className="text-2xl font-bold text-accent">
              {formatPrice(price)} تومان
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={onAddToCart} variant="accent" className="w-full gap-2" size="lg">
            <ShoppingCart className="w-5 h-5" />
            افزودن به سبد خرید
          </Button>
          
          <div className="flex gap-3">
            <Button onClick={onBack} variant="outline" className="gap-2">
              <ArrowRight className="w-5 h-5" />
              ویرایش
            </Button>
            <Button 
              onClick={() => {
                onAddToCart();
              }} 
              variant="secondary" 
              className="flex-1 gap-2"
            >
              <Plus className="w-5 h-5" />
              افزودن فایل دیگر
            </Button>
          </div>
        </div>

        <Link to="/cart">
          <Button variant="link" className="w-full text-accent">
            مشاهده سبد خرید و پرداخت ←
          </Button>
        </Link>
      </div>
    </div>
  );
};
