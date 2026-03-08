import { sendEmail } from "@/services/Mail.service";
import { NextRequest, NextResponse } from "next/server";

const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    "base64"
);

type Params = {
    params: {
        email_id: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    const { email_id } = params;
    await sendEmail(
        "mosman257@gmail.com",
        `Your email ${email_id} opened`
    );
    return new NextResponse(pixel, {
        headers: {
            "Content-Type": "image/png",
            "Content-Length": pixel.length.toString(),
            "Cache-Control": "no-store",
        },
    });
}