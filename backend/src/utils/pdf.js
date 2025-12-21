import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateTicketPdf = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const ticketDir = path.join(__dirname, "../tickets");
      if (!fs.existsSync(ticketDir)) {
        fs.mkdirSync(ticketDir, { recursive: true });
      }

      const safePnr = data.pnr.replace(/\s+/g, "_");
      const filePath = path.join(ticketDir, `${safePnr}.pdf`);

      const doc = new PDFDocument({ size: "A4", margin: 40 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      /* ================= HEADER ================= */
      doc
        .rect(0, 0, doc.page.width, 90)
        .fill("#0f172a");

      doc
        .fillColor("#ffffff")
        .fontSize(26)
        .text("✈ XTechon Airlines", 40, 30, { align: "left" });

      doc
        .fontSize(14)
        .text("E-Ticket / Boarding Pass", 40, 60);

      /* ================= MAIN CARD ================= */
      const cardTop = 120;

      doc
        .roundedRect(30, cardTop, doc.page.width - 60, 380, 16)
        .fill("#f8fafc");

      doc.fillColor("#000000");

      /* ================= ROUTE ================= */
      doc
        .fontSize(22)
        .text(data.route.toUpperCase(), 50, cardTop + 30);

      doc
        .fontSize(12)
        .fillColor("#475569")
        .text("Non-Stop Flight", 50, cardTop + 60);

      /* ================= DIVIDER ================= */
      doc
        .strokeColor("#cbd5e1")
        .lineWidth(1)
        .moveTo(50, cardTop + 90)
        .lineTo(doc.page.width - 50, cardTop + 90)
        .stroke();

      /* ================= LEFT DETAILS ================= */
      const leftX = 50;
      let y = cardTop + 120;

      doc.fillColor("#020617").fontSize(12);

      doc.text("Passenger", leftX, y);
      doc.fontSize(14).text(data.passengerName, leftX, y + 16);

      y += 50;
      doc.fontSize(12).text("Airline", leftX, y);
      doc.fontSize(14).text(data.airline, leftX, y + 16);

      y += 50;
      doc.fontSize(12).text("Flight ID", leftX, y);
      doc.fontSize(14).text(data.flightId, leftX, y + 16);

      y += 50;
      doc.fontSize(12).text("Booking Date", leftX, y);
      doc.fontSize(14).text(data.date, leftX, y + 16);

      /* ================= RIGHT DETAILS ================= */
      const rightX = doc.page.width - 260;
      y = cardTop + 120;

      doc.fontSize(12).text("PNR", rightX, y);
      doc
        .fontSize(18)
        .fillColor("#0f172a")
        .text(safePnr, rightX, y + 18);

      y += 60;
      doc.fillColor("#020617").fontSize(12).text("Amount Paid", rightX, y);
      doc
        .fontSize(18)
        .fillColor("#16a34a")
        .text(`₹ ${data.price}`, rightX, y + 18);

      /* ================= BARCODE STYLE ================= */
      doc
        .strokeColor("#000")
        .lineWidth(2)
        .moveTo(50, cardTop + 330)
        .lineTo(doc.page.width - 50, cardTop + 330)
        .dash(5, { space: 3 })
        .stroke()
        .undash();

      /* ================= FOOTER ================= */
      doc
        .fillColor("#64748b")
        .fontSize(10)
        .text(
          "This is a system generated ticket. Please carry a valid photo ID during travel.",
          40,
          doc.page.height - 80,
          { align: "center" }
        );

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};
