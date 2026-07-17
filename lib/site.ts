export const site = {
  name: "Viswas Sports",
  tagline: "Cricket Gear That Means Business",
  owner: "Abhishek Agarwal",
  phone: "+91 78957 51333",
  phoneDigits: "917895751333",
  email: "info@viswassports.com",
  address: "Viswas Sports, India",
  description:
    "Viswas Sports is your trusted destination for premium cricket equipment — batting gloves, helmets, and cricket balls sourced for club, academy, and match play.",
};

export function waLink(message?: string) {
  const base = `https://wa.me/${site.phoneDigits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function productWaLink(productName: string) {
  return waLink(
    `Hi Viswas Sports, I'm interested in "${productName}". Could you share more details and pricing?`
  );
}

export function telLink() {
  return `tel:${site.phoneDigits}`;
}
