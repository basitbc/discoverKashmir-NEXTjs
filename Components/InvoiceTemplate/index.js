// pages/api/generate-pdf.js
import pdf from "html-pdf";
import fs from "fs";

export default (req, res) => {
  try {
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

    const options = { format: "Letter" };

    pdf.create(htmlContent, options).toStream((err, stream) => {
      if (err) {
        console.error("Error generating PDF:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=generated-pdf.pdf"
        );
        stream.pipe(res);
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
};
