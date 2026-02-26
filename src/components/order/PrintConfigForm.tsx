import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, FileText } from "lucide-react";
import type { PrintConfig } from "@/hooks/useCart";

const printTypes = [
  { id: "bw", label: "سیاه و سفید", price: "۵۰۰ تومان/صفحه" },
  { id: "color", label: "رنگی", price: "۳,۰۰۰ تومان/صفحه" },
  { id: "colorB", label: "رنگی کلاس B", price: "۲,۰۰۰ تومان/صفحه" },
  { id: "colorC", label: "رنگی کلاس C", price: "۱,۵۰۰ تومان/صفحه" },
];

const paperTypes = [
  { id: "a4", label: "A4", multiplier: "×۱" },
  { id: "a5", label: "A5", multiplier: "×۰.۶" },
  { id: "a3", label: "A3", multiplier: "×۲" },
];

const sidedOptions = [
  { id: "single", label: "یک رو" },
  { id: "double", label: "دو رو (۱۰٪ تخفیف)" },
];

const bindingTypes = [
  { id: "none", label: "بدون صحافی", price: "رایگان" },
  { id: "spiral", label: "فنری", price: "۱۵,۰۰۰ تومان" },
  { id: "staple", label: "منگنه", price: "۲,۰۰۰ تومان" },
  { id: "tape", label: "چسب گرم", price: "۸,۰۰۰ تومان" },
];

interface PrintConfigFormProps {
  config: PrintConfig;
  setConfig: (config: PrintConfig) => void;
  pageCount: number;
  setPageCount: (count: number) => void;
  onNext: () => void;
}

export const PrintConfigForm = ({
  config,
  setConfig,
  pageCount,
  setPageCount,
  onNext,
}: PrintConfigFormProps) => {
  return (
    <div className="glass-card p-6 rounded-2xl animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Printer className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">تنظیمات چاپ</h2>
          <p className="text-sm text-muted-foreground">نوع چاپ و کاغذ را انتخاب کنید</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Print Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium">نوع چاپ</label>
          <div className="grid grid-cols-2 gap-3">
            {printTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setConfig({ ...config, printType: type.id as PrintConfig["printType"] })}
                className={`p-4 rounded-xl border text-right transition-all ${
                  config.printType === type.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <div className="font-medium">{type.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{type.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Paper Size */}
        <div className="space-y-3">
          <label className="text-sm font-medium">اندازه کاغذ</label>
          <div className="flex gap-3">
            {paperTypes.map((paper) => (
              <button
                key={paper.id}
                onClick={() => setConfig({ ...config, paperType: paper.id as PrintConfig["paperType"] })}
                className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                  config.paperType === paper.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <div className="font-medium">{paper.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{paper.multiplier}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sided */}
        <div className="space-y-3">
          <label className="text-sm font-medium">نوع چاپ</label>
          <div className="flex gap-3">
            {sidedOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setConfig({ ...config, sided: option.id as PrintConfig["sided"] })}
                className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                  config.sided === option.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <div className="font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Binding */}
        <div className="space-y-3">
          <label className="text-sm font-medium">صحافی</label>
          <div className="grid grid-cols-2 gap-3">
            {bindingTypes.map((binding) => (
              <button
                key={binding.id}
                onClick={() => setConfig({ ...config, binding: binding.id as PrintConfig["binding"] })}
                className={`p-4 rounded-xl border text-right transition-all ${
                  config.binding === binding.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <div className="font-medium">{binding.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{binding.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Page Count */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">تعداد صفحات</label>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-bold text-accent">{pageCount} صفحه</span>
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="500"
            value={pageCount}
            onChange={(e) => setPageCount(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>۱</span>
            <span>۵۰۰</span>
          </div>
        </div>

        {/* Copies */}
        <div className="space-y-3">
          <label className="text-sm font-medium">تعداد نسخه</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setConfig({ ...config, copies: Math.max(1, config.copies - 1) })}
              className="w-12 h-12 rounded-xl border border-border bg-card hover:bg-secondary flex items-center justify-center text-xl font-bold"
            >
              −
            </button>
            <span className="w-16 text-center text-xl font-bold">{config.copies}</span>
            <button
              onClick={() => setConfig({ ...config, copies: config.copies + 1 })}
              className="w-12 h-12 rounded-xl border border-border bg-card hover:bg-secondary flex items-center justify-center text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* <div className="mt-8">
        <Button onClick={onNext} className="w-full gap-2" size="lg">
          مرحله بعد
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div> */}
    </div>
  );
};
