const TAX_RATE = 0.1;
export const taxIn = (price: number) => {
  return Math.floor(price * (1 + TAX_RATE));
};

export const formatPrice = (price: number) => {
  return price.toLocaleString("ja-JP");
};
