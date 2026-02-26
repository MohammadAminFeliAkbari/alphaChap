import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  Clock,
  Package,
  Printer,
  CheckCircle,
  Copy,
  Download,
  ChevronLeft,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAddress, type Address } from "@/hooks/useAddress";
import { AddressCard } from "@/components/address/AddressCard";
import { AddressFormModal } from "@/components/address/AddressFormModal";
import { useLogout } from "@/hooks/useAuth";

// Mock data for demonstration
const mockOrders = [
  {
    id: "ALP-1234",
    fileName: "جزوه فیزیک - فصل ۳",
    status: "shipped",
    date: "۱۴۰۳/۰۹/۱۵",
    price: 65000,
    trackingCode: "1234567890",
  },
  {
    id: "ALP-1233",
    fileName: "پایان‌نامه ارشد",
    status: "printed",
    date: "۱۴۰۳/۰۹/۱۴",
    price: 245000,
    trackingCode: null,
  },
  {
    id: "ALP-1232",
    fileName: "مقاله علمی",
    status: "printing",
    date: "۱۴۰۳/۰۹/۱۳",
    price: 35000,
    trackingCode: null,
  },
  {
    id: "ALP-1231",
    fileName: "جزوه ریاضی",
    status: "registered",
    date: "۱۴۰۳/۰۹/۱۲",
    price: 48000,
    trackingCode: null,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "transactions" | "addresses">("orders");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { toast } = useToast();
  const { addresses, addAddress, updateAddress, removeAddress } = useAddress();
  const { mutate: logout, isPending } = useLogout()
  const formatPrice = (price: number) => new Intl.NumberFormat("fa-IR").format(price);

  console.log(formatPrice(100000));

  const copyTrackingCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "کپی شد",
      description: "کد پیگیری کپی شد",
    });
  };

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; class: string; icon: React.ElementType }> = {
      registered: { label: "ثبت شده", class: "status-registered", icon: Clock },
      printing: { label: "در حال چاپ", class: "status-printing", icon: Printer },
      printed: { label: "چاپ شده", class: "status-printed", icon: CheckCircle },
      shipped: { label: "ارسال شده", class: "status-shipped", icon: Package },
    };
    return statusMap[status] || statusMap.registered;
  };

  const handleAddAddress = (address: Omit<Address, "id">) => {
    if (editingAddress) {
      updateAddress(editingAddress.id, address);
    } else {
      addAddress(address);
    }
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    removeAddress(id);
    toast({
      title: "آدرس حذف شد",
      description: "آدرس با موفقیت حذف شد",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-8 lg:py-12">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex justify-between p-2 gap-2">
              <div>
                <h1 className="text-3xl font-bold text-foreground">پنل کاربری</h1>
                <p className="text-muted-foreground">مدیریت سفارشات و پیگیری</p>
              </div>
              <Button variant="destructive" disabled={isPending} size="sm" onClick={() => logout()}>
                خروج
              </Button>
            </div>
            <Link to="/order">
              <Button variant="accent" className="gap-2">
                <Plus className="w-5 h-5" />
                سفارش جدید
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockOrders.length}</p>
                  <p className="text-sm text-muted-foreground">کل سفارشات</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-status-printing/20 flex items-center justify-center">
                  <Printer className="w-5 h-5 text-status-printing" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockOrders.filter((o) => o.status === "printing").length}
                  </p>
                  <p className="text-sm text-muted-foreground">در حال چاپ</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-status-shipped/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-status-shipped" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockOrders.filter((o) => o.status === "shipped").length}
                  </p>
                  <p className="text-sm text-muted-foreground">ارسال شده</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{addresses.length}</p>
                  <p className="text-sm text-muted-foreground">آدرس ذخیره شده</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "orders"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
            >
              سفارشات من
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "addresses"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
            >
              آدرس‌های من
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "transactions"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
            >
              تراکنش‌ها
            </button>
          </div>

          {/* Orders List */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {mockOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={order.id} className="glass-card p-4 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-medium">{order.fileName}</h3>
                            <span className={`status-badge ${statusInfo.class}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusInfo.label}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            شماره سفارش: {order.id} • {order.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-left">
                          <p className="font-bold text-accent">
                            {formatPrice(order.price)} تومان
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {order.trackingCode && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyTrackingCode(order.trackingCode!)}
                              className="gap-1"
                            >
                              <Copy className="w-4 h-4" />
                              کد پیگیری
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="w-4 h-4" />
                            فاکتور
                          </Button>
                          <Button variant="ghost" size="icon">
                            <ChevronLeft className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        {["registered", "printing", "printed", "shipped"].map((step, index) => {
                          const isCompleted =
                            ["registered", "printing", "printed", "shipped"].indexOf(order.status) >=
                            index;
                          return (
                            <div key={step} className="flex items-center gap-2 flex-1">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isCompleted
                                  ? "bg-status-shipped text-white"
                                  : "bg-secondary text-muted-foreground"
                                  }`}
                              >
                                {index + 1}
                              </div>
                              {index < 3 && (
                                <div
                                  className={`flex-1 h-0.5 ${isCompleted ? "bg-status-shipped" : "bg-border"
                                    }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>ثبت شده</span>
                        <span>در حال چاپ</span>
                        <span>چاپ شده</span>
                        <span>ارسال شده</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {addresses.length > 0
                    ? `${addresses.length} آدرس ذخیره شده`
                    : "هنوز آدرسی ثبت نکرده‌اید"}
                </p>
                <Button
                  variant="accent"
                  onClick={() => {
                    setEditingAddress(null);
                    setIsAddressModalOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="w-5 h-5" />
                  افزودن آدرس جدید
                </Button>
              </div>

              {addresses.length === 0 ? (
                <div className="glass-card p-12 rounded-xl text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    هنوز آدرسی ثبت نکرده‌اید
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    برای تحویل سریع‌تر سفارشات، آدرس خود را ذخیره کنید
                  </p>
                  <Button
                    variant="accent"
                    onClick={() => setIsAddressModalOpen(true)}
                    className="gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    افزودن اولین آدرس
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      onEdit={() => handleEditAddress(address)}
                      onDelete={() => handleDeleteAddress(address.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Transactions */}
          {activeTab === "transactions" && (
            <div className="glass-card p-6 rounded-xl">
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">تاریخچه تراکنش‌ها</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddressFormModal
        open={isAddressModalOpen}
        onOpenChange={(open) => {
          setIsAddressModalOpen(open);
          if (!open) setEditingAddress(null);
        }}
        onSubmit={handleAddAddress}
        editAddress={editingAddress}
      />
    </Layout>
  );
};

export default Dashboard;
