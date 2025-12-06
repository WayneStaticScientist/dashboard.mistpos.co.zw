import { SubscriptionType } from "@/types/company-t";

export class MistDateUtils {
  static fromSubscription(type: SubscriptionType | null | undefined): {
    daysLeft: number;
    label: string;
    ignore: boolean;
  } {
    if (type == null || !type.validUntil)
      return {
        daysLeft: 0,
        label: "",
        ignore: true,
      };
    const validUntil = new Date(type.validUntil!);
    const nowDate = new Date();
    const daysLefts =
      (validUntil.getTime() - nowDate.getTime()) / (1000 * 3600 * 24);
    return {
      ignore: false,
      daysLeft: daysLefts,
      label: `${daysLefts.toFixed(0)} Days`,
    };
  }
  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  static formatFullDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
}
