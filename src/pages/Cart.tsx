import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useAddress, type Address } from "@/hooks/useAddress";
import { ShoppingCart, Trash2, Plus, Tag, CreditCard, FileText, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddressSelector } from "@/components/address/AddressSelector";

const Cart = () => {
  const { items, removeItem, getTotalPrice } = useCart();
  const { selectedAddressId, getSelectedAddress } = useAddress();
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const formatPrice = (price: number) => new Intl.NumberFormat("fa-IR").format(price);

  const subtotal = getTotalPrice();
  const total = subtotal - discount;

  const selectedAddress = getSelectedAddress();
  const canProceedToPayment = items.length > 0 && selectedAddressId !== null;

  const handleApplyDiscount = () => {
    if (discountCode === "ALPHA10") {
      setDiscount(subtotal * 0.1);
      toast({
        title: "کد تخفیف اعمال شد",
        description: "۱۰٪ تخفیف به سفارش شما اضافه شد",
      });
    } else {
      toast({
        title: "کد نامعتبر",
        description: "کد تخفیف وارد شده معتبر نیست",
        variant: "destructive",
      });
    }
  };

  const handlePayment = () => {
    if (!canProceedToPayment) {
      toast({
        title: "خطا",
        description: "لطفاً یک آدرس تحویل انتخاب کنید",
        variant: "destructive",
      });
      return;
    }
    // Navigate to payment or show success
    toast({
      title: "در حال انتقال به درگاه پرداخت",
      description: "لطفاً صبر کنید...",
    });
  };

  const getPrintTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      bw: "سیاه و سفید",
      color: "رنگی",
      colorB: "رنگی کلاس B",
      colorC: "رنگی کلاس C",
    };
    return labels[type] || type;
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">سبد خرید خالی است</h1>
          <p className="text-muted-foreground mb-6">هنوز فایلی به سبد خرید اضافه نکرده‌اید</p>
          <Link to="/order">
            <Button variant="accent" className="gap-2">
              <Plus className="w-5 h-5" />
              ثبت سفارش جدید
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-8 lg:py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">سبد خرید</h1>
            <span className="text-muted-foreground">{items.length} فایل</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items List & Address */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  فایل‌های سفارش
                </h2>
                {items.map((item) => (
                  <div key={item.id} className="glass-card p-4 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-foreground truncate">
                              {item.fileName}
                            </h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              {getPrintTypeLabel(item.config.printType)} • {item.pageCount} صفحه • {item.config.copies} نسخه
                            </div>
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-accent">
                              {formatPrice(item.price)} تومان
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Link to="/order">
                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="w-5 h-5" />
                    افزودن فایل دیگر
                  </Button>
                </Link>
              </div>

              {/* Address Selection */}
              <AddressSelector className="pt-6 border-t border-border" />
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass-card p-6 rounded-2xl space-y-6">
                <h3 className="font-semibold text-lg">خلاصه سفارش</h3>

                {/* Selected Address Summary */}
                {selectedAddress && (
                  <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-center gap-2 text-sm text-accent mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">آدرس تحویل</span>
                    </div>
                    <p className="text-sm text-foreground">
                      {selectedAddress.province}، {selectedAddress.city}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {selectedAddress.fullAddress}
                    </p>
                  </div>
                )}

                {/* Discount Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">کد تخفیف</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="کد تخفیف را وارد کنید"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="text-right"
                    />
                    <Button variant="secondary" onClick={handleApplyDiscount}>
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">جمع فایل‌ها</span>
                    <span>{formatPrice(subtotal)} تومان</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-status-shipped">
                      <span>تخفیف</span>
                      <span>−{formatPrice(discount)} تومان</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">هزینه ارسال</span>
                    <span className="text-status-shipped">رایگان</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">مبلغ قابل پرداخت</span>
                    <span className="text-2xl font-bold text-accent">
                      {formatPrice(total)} تومان
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  variant="accent"
                  className="w-full gap-2"
                  size="lg"
                  disabled={!canProceedToPayment}
                  onClick={handlePayment}
                >
                  <CreditCard className="w-5 h-5" />
                  پرداخت و ثبت نهایی
                </Button>

                {!selectedAddressId && (
                  <p className="text-xs text-center text-destructive">
                    برای ادامه، یک آدرس تحویل انتخاب کنید
                  </p>
                )}

                <p className="text-xs text-center text-muted-foreground">
                  با کلیک روی دکمه پرداخت، شما شرایط و قوانین را می‌پذیرید
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
