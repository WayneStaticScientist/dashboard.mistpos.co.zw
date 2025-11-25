import type { TExchangeRates } from "./exhange-rates-t";
export interface Paynow {
  registered: boolean;
  integrationId: string;
  integrationKey: string;
}
export type SubscriptionType = {
  type: string;
  validUntil: Date | null;
  onlineNotified: boolean;
  offlineNotified: boolean;
  hasExhaustedCredits: boolean;
};
export interface TCompany {
  owner: string;
  name: string;
  email: string;
  paynow: Paynow;
  hadTrialMode: boolean;
  exchangeRates: TExchangeRates;
  subscriptionType: SubscriptionType;
}
