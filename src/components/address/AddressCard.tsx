import { Button } from "@/components/ui/button";
import { MapPin, User, Phone, Edit, Trash2, Check } from "lucide-react";
import type { Address } from "@/hooks/useAddress";

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  selectable?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const AddressCard = ({
  address,
  isSelected = false,
  selectable = false,
  onSelect,
  onEdit,
  onDelete,
}: AddressCardProps) => {
  return (
    <div
      onClick={selectable ? onSelect : undefined}
      className={`glass-card p-4 rounded-xl transition-all ${
        selectable ? "cursor-pointer hover:border-accent/50" : ""
      } ${
        isSelected
          ? "border-2 border-accent bg-accent/5"
          : "border border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Header with label and selection indicator */}
          <div className="flex items-center gap-2 mb-3">
            {selectable && (
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "border-accent bg-accent"
                    : "border-muted-foreground"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-accent-foreground" />}
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span className="font-semibold text-foreground">{address.label}</span>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 shrink-0" />
              <span>{address.recipientName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 shrink-0" />
              <span dir="ltr">{address.phone}</span>
            </div>
          </div>

          {/* Address Details */}
          <div className="mt-3 p-3 rounded-lg bg-secondary/50">
            <p className="text-sm text-foreground leading-relaxed">
              {address.province}، {address.city}، {address.fullAddress}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              کد پستی: <span dir="ltr">{address.postalCode}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        {(onEdit || onDelete) && (
          <div className="flex flex-col gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="h-8 w-8"
              >
                <Edit className="w-4 h-4 text-muted-foreground" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
