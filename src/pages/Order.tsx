import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PrintConfigForm } from "@/components/order/PrintConfigForm";
import { FileSubmission } from "@/components/order/FileSubmission";
import { OrderSummary } from "@/components/order/OrderSummary";
import { useCart, calculatePrice, type PrintConfig, type CartItem } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const Order = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<PrintConfig>({
    printType: "bw",
    paperType: "a4",
    sided: "double",
    binding: "none",
    copies: 1,
  });
  const [pageCount, setPageCount] = useState(50);
  const [fileName, setFileName] = useState("");
  const [submissionMethod, setSubmissionMethod] = useState<"telegram" | "upload">("telegram");

  const { addItem } = useCart();
  const { toast } = useToast();

  const price = calculatePrice(config, pageCount);

  const handleAddToCart = () => {
    if (!fileName) {
      toast({
        title: "خطا",
        description: "لطفاً نام فایل را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    const item: CartItem = {
      id: Date.now().toString(),
      fileName,
      pageCount,
      config,
      price,
      submissionMethod,
    };

    addItem(item);
    toast({
      title: "اضافه شد",
      description: "فایل به سبد خرید اضافه شد",
    });

    // Reset form
    setFileName("");
    setPageCount(50);
    setStep(1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-8 lg:py-12">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              ثبت سفارش جدید
            </h1>
            <p className="text-muted-foreground">
              تنظیمات چاپ را انتخاب کنید و فایل خود را ارسال کنید
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                    }`}
                >
                  {s}
                </div>
                <span
                  className={`hidden sm:block text-sm ${step >= s ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                  {s === 1 ? "تنظیمات" : "تأیید"}
                </span>
                {s < 2 && (
                  <div className="w-12 h-0.5 bg-border hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="flex flex-col gap-2">
                  <PrintConfigForm
                    config={config}
                    setConfig={setConfig}
                    pageCount={pageCount}
                    setPageCount={setPageCount}
                    onNext={() => setStep(2)}
                  />
                  <FileSubmission
                    fileName={fileName}
                    setFileName={setFileName}
                    submissionMethod={submissionMethod}
                    setSubmissionMethod={setSubmissionMethod}
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                  />
                </div>
              )}
              {step === 3 && (
                <OrderSummary
                  config={config}
                  pageCount={pageCount}
                  fileName={fileName}
                  price={price}
                  onBack={() => setStep(2)}
                  onAddToCart={handleAddToCart}
                />
              )}
            </div>

            {/* Live Price Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass-card p-6 rounded-2xl">
                <h3 className="font-semibold text-lg mb-4">قیمت لحظه‌ای</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">نوع چاپ</span>
                    <span>
                      {config.printType === "bw" && "سیاه و سفید"}
                      {config.printType === "color" && "رنگی"}
                      {config.printType === "colorB" && "رنگی کلاس B"}
                      {config.printType === "colorC" && "رنگی کلاس C"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">اندازه کاغذ</span>
                    <span>{config.paperType.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">نوع چاپ</span>
                    <span>{config.sided === "double" ? "دو رو" : "یک رو"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">صحافی</span>
                    <span>
                      {config.binding === "none" && "بدون صحافی"}
                      {config.binding === "spiral" && "فنری"}
                      {config.binding === "staple" && "منگنه"}
                      {config.binding === "tape" && "چسب گرم"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">تعداد صفحات</span>
                    <span>{pageCount} صفحه</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">تعداد نسخه</span>
                    <span>{config.copies} نسخه</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">جمع کل</span>
                    <span className="text-2xl font-bold text-accent">
                      {new Intl.NumberFormat("fa-IR").format(price)} تومان
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
