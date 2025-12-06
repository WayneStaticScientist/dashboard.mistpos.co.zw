import { Button } from "@heroui/react";
import { MdCheck } from "react-icons/md";

// --- Interface for the SubscriptionCard Component Props ---
interface SubscriptionCardProps {
  title: string;
  price: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  description?: string;
  features: string[];
  buttonText: string;
  isFeatured?: boolean;
  accentColor?: string;
  onPress?: () => void;
}

// --- SubscriptionCard Component ---
export const SubscriptionCard = ({
  title,
  price,
  description,
  features,
  isLoading,
  buttonText,
  isDisabled,
  isFeatured = false,
  accentColor = "blue", // Default color
  onPress,
}: SubscriptionCardProps) => {
  // Define classes for button/accent based on the accentColor prop
  const buttonClass = `bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white`;
  const featuredBorderClass = isFeatured
    ? `border-green-500 border-1 `
    : "border-1 border-[#e6e6e620]";

  return (
    <div
      className={`relative flex flex-col p-6 mx-auto w-full max-w-sm text-center bg-background rounded-xl shadow-2xl ${featuredBorderClass} transition-all duration-300 transform hover:scale-[1.02]`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div
          className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-green-500 uppercase rounded-bl-lg rounded-tr-xl bg-${accentColor}-600`}
        >
          Current Plan
        </div>
      )}

      {/* Header and Price */}
      <h3 className="mb-4 text-2xl font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mb-8 text-sm text-gray-200">{description}</p>
      )}
      <div className="flex justify-center items-baseline my-8">
        <span className="text-5xl font-extrabold text-foreground">{price}</span>
        <span className="ml-2 text-xl font-medium text-gray-500"></span>
      </div>

      {/* Features List */}
      <ul role="list" className="flex-1 mb-8 space-y-4 text-left">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
            <MdCheck
              className={`shrink-0 w-5 h-5 mr-3 text-${accentColor}-600`}
              aria-hidden="true"
            />
            <span className="text-base font-medium text-gray-200">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {!isFeatured && (
        <Button
          color="secondary"
          onPress={onPress}
          disabled={isDisabled}
          isLoading={isLoading}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};
