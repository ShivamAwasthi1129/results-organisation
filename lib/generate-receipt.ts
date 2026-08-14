import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

export interface ReceiptData {
  receiptNo: string;
  donationDate: string;
  donationTime?: string;
  donorName: string;
  donorAddress?: string;
  donorEmail: string;
  amount: string;
  campaign: string;
  campaignId?: string;
  contributionType: string;
  paymentMethod: string;
  transactionId: string;
  donorLocation?: string;
}

export async function generateReceiptPDF(data: ReceiptData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers: Buffer[] = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });

      const logoPath = path.join(process.cwd(), 'public', 'images', 'r3sults-logo-dark.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 45, { width: 160 });
      }

      // Header right side
      doc.font('Helvetica-Bold').fontSize(16).text('Charitable Contribution Receipt', 200, 50, { align: 'right' });
      doc.font('Helvetica').fontSize(10);
      
      doc.text('Receipt No.:', 350, 75, { width: 80, align: 'right' });
      doc.font('Helvetica-Bold').text(data.receiptNo, 440, 75);
      
      doc.font('Helvetica').text('Donation Date:', 350, 90, { width: 80, align: 'right' });
      const fullDateStr = data.donationTime ? `${data.donationDate} at ${data.donationTime}` : data.donationDate;
      doc.font('Helvetica-Bold').text(fullDateStr, 440, 90);
      
      doc.font('Helvetica').text('Receipt Date:', 350, 105, { width: 80, align: 'right' });
      doc.font('Helvetica-Bold').text(data.donationDate, 440, 105);

      // Red line
      doc.moveTo(50, 140).lineTo(545, 140).lineWidth(2).strokeColor('#c00000').stroke();

      // Donor Information Section
      doc.font('Helvetica-Bold').fontSize(12).fillColor('#c00000').text('DONOR INFORMATION', 50, 160);
      doc.fillColor('black');
      
      doc.font('Helvetica').fontSize(10).text('Donor:', 50, 185);
      doc.font('Helvetica-Bold').text(data.donorName, 150, 185);
      
      if (data.donorAddress) {
        doc.font('Helvetica').text('Address:', 50, 205);
        doc.font('Helvetica').text(data.donorAddress, 150, 205);
      }
      
      const emailY = data.donorAddress ? 225 : 205;
      doc.font('Helvetica').text('Email:', 50, emailY);
      doc.font('Helvetica').text(data.donorEmail, 150, emailY);

      if (data.donorLocation) {
        const locY = emailY + 20;
        doc.font('Helvetica').text('Location:', 50, locY);
        doc.font('Helvetica').text(data.donorLocation, 150, locY);
      }

      // Contribution Details Section
      let detailsY = data.donorAddress ? 260 : 240;
      if (data.donorLocation) {
        detailsY += 20;
      }
      doc.font('Helvetica-Bold').fontSize(12).fillColor('#c00000').text('CONTRIBUTION DETAILS', 50, detailsY);
      
      // Amount / Campaign Box
      const boxY = detailsY + 20;
      doc.rect(50, boxY, 495, 60).fillColor('#f8f9fa').fill();
      
      doc.fillColor('#888888').font('Helvetica').fontSize(9).text('DONATION AMOUNT', 65, boxY + 15);
      doc.fillColor('#888888').font('Helvetica').text('CAMPAIGN', 65, boxY + 15, { align: 'right', width: 465 });
      
      doc.fillColor('#c00000').font('Helvetica-Bold').fontSize(18).text(`$${data.amount} USD`, 65, boxY + 35);
      const campaignText = data.campaignId ? `${data.campaign} (${data.campaignId})` : data.campaign;
      doc.fillColor('black').font('Helvetica-Bold').fontSize(12).text(campaignText, 65, boxY + 40, { align: 'right', width: 465 });

      // Contribution Meta
      const metaY = boxY + 80;
      doc.font('Helvetica').fontSize(10).fillColor('#666666').text('Contribution Type:', 50, metaY);
      doc.fillColor('black').text(data.contributionType, 180, metaY);
      
      doc.fillColor('#666666').text('Payment Method:', 50, metaY + 20);
      doc.fillColor('black').text(data.paymentMethod, 180, metaY + 20);
      
      doc.fillColor('#666666').text('Transaction ID:', 50, metaY + 40);
      doc.fillColor('black').text(data.transactionId, 180, metaY + 40);

      // Tax Acknowledgment Section
      const taxY = metaY + 80;
      doc.font('Helvetica-Bold').fontSize(12).fillColor('#c00000').text('TAX ACKNOWLEDGMENT', 50, taxY);
      
      doc.fillColor('black').font('Helvetica').fontSize(10).text(`Thank you for your generous contribution of `, 50, taxY + 20, { continued: true })
         .font('Helvetica-Bold').text(`$${data.amount}`, { continued: true })
         .font('Helvetica').text(` to R3SULTS Foundation Inc. R3SULTS Foundation Inc. acknowledges receipt of your charitable contribution on `, { continued: true })
         .font('Helvetica-Bold').text(`${data.donationDate}. No goods or services were provided in exchange for this contribution. `, { continued: true })
         .font('Helvetica').text(`Please retain this receipt with your tax records. The deductibility of charitable contributions depends on the donor's individual tax circumstances and applicable law.`, { width: 495, align: 'justify', lineGap: 3 });

      // Your Impact Section
      const impactY = taxY + 110;
      doc.font('Helvetica-Bold').fontSize(12).fillColor('#c00000').text('YOUR IMPACT', 50, impactY);
      doc.fillColor('black').font('Helvetica').fontSize(10).text(`Your contribution supports R3SULTS Foundation Inc.'s humanitarian and disaster-relief efforts and helps provide assistance to communities affected by disasters and emergencies.`, 50, impactY + 20, { width: 495, lineGap: 3 });
      
      doc.font('Helvetica-Oblique').fillColor('#c00000').fontSize(11).text(`Thank you for helping communities when they need it most.`, 50, impactY + 60);

      // Footer
      const footerY = 720;
      doc.rect(0, footerY, 595, 122).fillColor('#333333').fill();
      
      doc.fillColor('white').font('Helvetica-Bold').fontSize(10).text('R3SULTS Foundation Inc.', 50, footerY + 20);
      doc.font('Helvetica').fontSize(9).fillColor('#cccccc').text('A U.S. nonprofit organization   |   EIN: XX-XXXXXXX', 50, footerY + 35);
      doc.text('Website: R3SULTS.org   |   Email: donations@r3sults.org', 50, footerY + 50);
      
      doc.fillColor('white').font('Helvetica-Bold').fontSize(9).text(`Receipt No.: ${data.receiptNo}`, 50, footerY + 20, { align: 'right', width: 495 });
      
      doc.moveTo(50, footerY + 70).lineTo(545, footerY + 70).lineWidth(0.5).strokeColor('#666666').stroke();
      
      doc.fillColor('#999999').font('Helvetica-Oblique').fontSize(8).text(`This receipt is provided as acknowledgment of the contribution described above. Please consult your tax adviser regarding the deductibility of your contribution.`, 50, footerY + 85, { width: 495, align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
