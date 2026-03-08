import { sendEmail } from "@/services/Mail.service";
import { NextRequest, NextResponse } from "next/server";

const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    "base64"
);

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ email_id: string }> }
) {
    const { email_id } = await context.params;

    const userAgent = request.headers.get("user-agent") || "";
    const secFetchDest = request.headers.get("sec-fetch-dest") || "";
    const secFetchMode = request.headers.get("sec-fetch-mode") || "";

    const isBot =
        userAgent.includes("GoogleImageProxy") ||
        userAgent.includes("Outlook") ||
        userAgent.includes("Thunderbird") ||
        userAgent.includes("curl");

    const looksHuman =
        userAgent.includes("Mozilla") &&
        secFetchDest === "image" &&
        secFetchMode === "no-cors";

    if (!isBot && looksHuman) {
        await sleep(8000);
        await sendEmail(
            "mosman257@gmail.com",
            `Your email ${email_id} opened`
        );
    }
    return new NextResponse(pixel, {
        headers: {
            "Content-Type": "image/png",
            "Content-Length": pixel.length.toString(),
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        },
    });
}