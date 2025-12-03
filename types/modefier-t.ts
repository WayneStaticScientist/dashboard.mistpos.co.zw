export interface ModifiersOptions {
  key: string;
  value: number;
}
export interface TModifier {
  _id: string;
  name: string;
  company: string;
  list: ModifiersOptions[];
}
