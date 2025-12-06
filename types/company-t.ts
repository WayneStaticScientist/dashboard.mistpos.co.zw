import type { TExchangeRates } from "./exhange-rates-t";
export interface Paynow {
  registered: boolean;
  integrationId: string;
  integrationKey: string;
}
export type SubscriptionType = {
  type: string;
  validUntil: string | null;
  onlineNotified: boolean;
  offlineNotified: boolean;
  hasExhaustedCredits: boolean;
};
export interface TCompany {
  _id: any;
  owner: string;
  name: string;
  email: string;
  paynow?: Paynow;
  verified?: boolean;
  hadTrialMode: boolean;
  exchangeRates?: TExchangeRates;
  subscriptionType?: SubscriptionType;
}
