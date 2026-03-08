import { sendEmail } from "@/services/Mail.service";
import { NextRequest, NextResponse } from "next/server";

const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    "base64"
);

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ email_id: string }> }
) {
    const { email_id } = await context.params;

    const userAgent = request.headers.get("user-agent") || "";

    if (!userAgent.includes("GoogleImageProxy")) {
        await sendEmail(
            "mosman257@gmail.com",
            `Your email ${email_id} opened`
        );
    }

    return new NextResponse(pixel, {
        headers: {
            "Content-Type": "image/png",
            "Content-Length": pixel.length.toString(),
            "Cache-Control": "no-store",
        },
    });
}