type Section = {
  id: string;
  name: string;
  itemIds: string[];
  magicCopyKey: string;
  imageUrl: string;
};

type Item = {
  id: string;
  name: string;
  price: string;
  modGroupIds: string[];
  magicCopyKey: string;
  imageUrl: string;
};

type ModGroup = {
  id: string;
  name: string;
  modIds: string[];
  // a mod group is a collection of items that alter the root (eg pizza) item in some way
  // (extra sauce, no sauce, etc)
  // sometimes this must have either a minimum or maximum amount before the item can be added to the cart
  maxMods?: number;
  minMods?: number;
};

type Mod = {
  id: string;
  name: string;
  modGroupIds: string[];
  price: number;
};

type Discount = {
  id: string;
  name: string;
  // a discount can be either fixed or percentage
  // if fixed, the amount equaling total cents will be defined
  amount?: number;
  // if percentage, a float less than one denoting percentage amount
  rate?: number;
  couponCode?: string;
};

// Order types indicate how an order will be fulfilled. For example to go, drive-through etc.
// These types can be mapped internally to Bite order types so that
// they appear correctly on the POS
type OrderType = {
  id: string;
  name: string;
};

interface TestPosApiResponse {
  sections: Section[];
  items: Item[];
  modGroups: ModGroup[];
  mods: Mod[];
  discounts: Discount[];
  orderTypes: OrderType[];
}

export type { TestPosApiResponse };
