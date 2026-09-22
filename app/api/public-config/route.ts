import { NextResponse } from "next/server";
import {
  getRecaptchaSiteKey,
  isContactFormConfigured,
} from "@/lib/public-config";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      recaptchaSiteKey: getRecaptchaSiteKey(),
      contactFormEnabled: isContactFormConfigured(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
