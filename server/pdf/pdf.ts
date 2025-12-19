import type {FastifyRequest} from "fastify";
import puppeteer from "puppeteer";

async function htmlToPdf(html: string): Promise<Uint8Array> {
    const browser = await puppeteer.launch({
        args: ["--disable-gpu", "--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-sandbox", "--incognito"],
        headless: true,
    });

    const context = await browser.createBrowserContext();

    const page = await context.newPage();

    await page.setJavaScriptEnabled(false);

    await page.setContent(html, {waitUntil: "networkidle0"});

    const pdf = await page.pdf({
        preferCSSPageSize: true,
        printBackground: true,
    });

    await page.close();

    await context.close();

    await browser.close();

    return pdf;
}

export async function getPdf(request: FastifyRequest<{Body?: string}>): Promise<Uint8Array> {
    const {body} = request;

    const rawHtml = body ?? "";

    const html = decodeURIComponent(rawHtml);

    return htmlToPdf(html);
}
