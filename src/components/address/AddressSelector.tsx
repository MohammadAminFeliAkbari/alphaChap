import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import { useAddress, type Address } from "@/hooks/useAddress";
import { AddressCard } from "./AddressCard";
import { AddressFormModal } from "./AddressFormModal";

interface AddressSelectorProps {
  className?: string;
}

export const AddressSelector = ({ className }: AddressSelectorProps) => {
  const { addresses, selectedAddressId, selectAddress, addAddress } = useAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAddress = (address: Omit<Address, "id">) => {
    addAddress(address);
  };

  if (addresses.length === 0) {
    return (
      <div className={className}>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">آدرس تحویل</h3>
        </div>
        <div className="glass-card p-6 rounded-xl text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            هنوز آدرسی ثبت نکرده‌اید
          </p>
          <Button
            variant="accent"
            onClick={() => setIsModalOpen(true)}
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            افزودن آدرس جدید
          </Button>
        </div>
        <AddressFormModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSubmit={handleAddAddress}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">آدرس تحویل</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="gap-1"
        >
          <Plus className="w-4 h-4" />
          آدرس جدید
        </Button>
      </div>

      <div className="space-y-3">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selectable
            isSelected={selectedAddressId === address.id}
            onSelect={() => selectAddress(address.id)}
          />
        ))}
      </div>

      {!selectedAddressId && (
        <p className="text-sm text-destructive mt-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive" />
          لطفاً یک آدرس را انتخاب کنید
        </p>
      )}

      <AddressFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddAddress}
      />
    </div>
  );
};
