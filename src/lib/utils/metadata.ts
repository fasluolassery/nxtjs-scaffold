import type { Metadata } from "next";
import { env } from "@/env";

interface ConstructMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description = "Production-Ready Next.js App Router Scaffold",
  image = "/og-image.png",
  noIndex = false,
}: ConstructMetadataParams = {}): Metadata {
  const fullTitle = title ? `${title} | ${env.NEXT_PUBLIC_APP_NAME}` : env.NEXT_PUBLIC_APP_NAME;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: env.NEXT_PUBLIC_APP_URL,
      siteName: env.NEXT_PUBLIC_APP_NAME,
      images: [
        {
          url: image.startsWith("http") ? image : `${env.NEXT_PUBLIC_APP_URL}${image}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${env.NEXT_PUBLIC_APP_URL}${image}`],
    },
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
