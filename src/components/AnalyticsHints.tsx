const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function AnalyticsHints() {
  if (!plausibleDomain) {
    return null;
  }

  return (
    <>
      <link rel="preconnect" href="https://plausible.io" />
      <link rel="dns-prefetch" href="https://plausible.io" />
    </>
  );
}
