// pages/api/generate-pdf.js
import puppeteer from "puppeteer";

export default async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await puppeteer.executablePath(),
      headless: true, // Run in headless mode
    });

    const page = await browser.newPage();

    // Your HTML content goes here (replace this with your HTML template)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>PDF Generation</title>
        </head>
        <body>
          <h1>Hello, PDF!</h1>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    // Set response headers to indicate PDF content
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=generated-pdf.pdf"
    );
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
};
