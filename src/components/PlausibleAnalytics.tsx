import Script from "next/script";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function PlausibleAnalytics() {
  if (!domain) {
    return null;
  }

  const scriptSrc = `https://plausible.io/js/script.js`;

  return (
    <Script
      src={scriptSrc}
      data-domain={domain}
      strategy="lazyOnload"
      defer
    />
  );
}
