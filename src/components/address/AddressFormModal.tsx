import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, User, Phone, Home, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Address } from "@/hooks/useAddress";

interface AddressFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (address: Omit<Address, "id">) => void;
  editAddress?: Address | null;
}

const initialFormData = {
  label: "",
  recipientName: "",
  phone: "",
  province: "",
  city: "",
  fullAddress: "",
  postalCode: "",
};

export const AddressFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  editAddress,
}: AddressFormModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editAddress) {
      setFormData({
        label: editAddress.label,
        recipientName: editAddress.recipientName,
        phone: editAddress.phone,
        province: editAddress.province,
        city: editAddress.city,
        fullAddress: editAddress.fullAddress,
        postalCode: editAddress.postalCode,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editAddress, open]);

  const validatePostalCode = (code: string) => {
    return /^\d{10}$/.test(code);
  };

  const validatePhone = (phone: string) => {
    return /^09\d{9}$/.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      toast({
        title: "خطا",
        description: "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود",
        variant: "destructive",
      });
      return;
    }

    if (!validatePostalCode(formData.postalCode)) {
      toast({
        title: "خطا",
        description: "کد پستی باید ۱۰ رقم باشد",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
    onOpenChange(false);
    toast({
      title: editAddress ? "آدرس ویرایش شد" : "آدرس اضافه شد",
      description: editAddress
        ? "آدرس با موفقیت ویرایش شد"
        : "آدرس جدید با موفقیت ذخیره شد",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            {editAddress ? "ویرایش آدرس" : "افزودن آدرس جدید"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Label */}
          <div className="space-y-2">
            <label className="text-sm font-medium">عنوان آدرس</label>
            <div className="relative">
              <Home className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="مثال: خانه، محل کار"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="pr-10 text-right"
                required
              />
            </div>
          </div>

          {/* Recipient Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              نام و نام خانوادگی تحویل گیرنده
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="نام کامل گیرنده"
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                className="pr-10 text-right"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium">شماره موبایل</label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="pr-10 text-right"
                dir="ltr"
                maxLength={11}
                required
              />
            </div>
          </div>

          {/* Province & City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">استان</label>
              <Input
                placeholder="استان"
                value={formData.province}
                onChange={(e) =>
                  setFormData({ ...formData, province: e.target.value })
                }
                className="text-right"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">شهر</label>
              <Input
                placeholder="شهر"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="text-right"
                required
              />
            </div>
          </div>

          {/* Full Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium">نشانی کامل پستی</label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
              <textarea
                placeholder="خیابان، کوچه، پلاک، واحد..."
                value={formData.fullAddress}
                onChange={(e) =>
                  setFormData({ ...formData, fullAddress: e.target.value })
                }
                className="w-full min-h-[80px] pr-10 p-3 rounded-lg border border-input bg-background text-right text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">کد پستی (۱۰ رقم)</label>
            <div className="relative">
              <FileText className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="۱۲۳۴۵۶۷۸۹۰"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    postalCode: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="pr-10 text-right"
                dir="ltr"
                maxLength={10}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              انصراف
            </Button>
            <Button type="submit" variant="accent" className="flex-1">
              {editAddress ? "ذخیره تغییرات" : "افزودن آدرس"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
