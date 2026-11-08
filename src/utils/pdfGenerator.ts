import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { CERT_ASSETS } from '../data/certAssets';
import { CERTIFICATE_08_DATA, CertificateData } from '../data/campaignData';

export function buildFullVerificationUrl(cert: CertificateData): string {
  const rawBase = (cert.verificationBaseUrl || '').trim();
  const base =
    rawBase ||
    (typeof window !== 'undefined' && window.location.origin
      ? `${window.location.origin}/`
      : 'https://extensao-saude-influenza.vercel.app/');

  const cleanBase = base.replace(/\/+$/, '');
  return `${cleanBase}/?codigo=${encodeURIComponent(cert.code.trim())}#validador`;
}

export function formatDisplayBaseUrl(cert: CertificateData): string {
  const rawBase = (cert.verificationBaseUrl || '').trim();
  const base =
    rawBase ||
    (typeof window !== 'undefined' && window.location.origin
      ? `${window.location.origin}/`
      : 'https://extensao-saude-influenza.vercel.app/');
  return `${base.replace(/\/+$/, '')}/`;
}

export async function generateQrCodeDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 480,
    color: {
      dark: '#0A1D56',
      light: '#FFFFFF',
    },
  });
}

/**
 * Generates the official 2-page A4 Landscape Vector PDF for Certificate Nº 08,
 * with 100% editable vector typography and clickable touch links (URI annotations)
 * on the QR Code, Manual Verification Box, and Footer lines across both pages.
 */
export async function generateCertificate08Pdf(
  cert: CertificateData = CERTIFICATE_08_DATA
): Promise<void> {
  const displayBaseUrl = formatDisplayBaseUrl(cert);
  const fullVerifyUrl = buildFullVerificationUrl(cert);
  const qrDataUrl = await generateQrCodeDataUrl(fullVerifyUrl);

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // =========================================================================
  // PAGE 1 — FRENTE DO CERTIFICADO (A4 Landscape: 297mm x 210mm)
  // =========================================================================

  // 1. Cream Academic Background (#FFFDF9)
  doc.setFillColor(255, 253, 250);
  doc.rect(0, 0, 297, 210, 'F');

  // 2. Triple Institutional Frame (Outer Green, Middle Gold, Inner Navy)
  doc.setDrawColor(6, 78, 59); // #064E3B
  doc.setLineWidth(0.8);
  doc.rect(5, 5, 287, 200, 'S');

  doc.setDrawColor(217, 119, 6); // #D97706
  doc.setLineWidth(0.35);
  doc.rect(6.8, 6.8, 283.4, 196.4, 'S');

  doc.setDrawColor(10, 29, 86); // #0A1D56
  doc.setLineWidth(0.5);
  doc.rect(8.2, 8.2, 280.6, 193.6, 'S');

  // 3. Top Header — Left Institution (Editora Mente e Saúde)
  doc.addImage(CERT_ASSETS.logoEms, 'PNG', 14, 12, 20, 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text(cert.issuer1.name, 37, 18);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`CNPJ: ${cert.issuer1.cnpj}`, 37, 22.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(13, 148, 136);
  doc.text(cert.issuer1.department, 37, 26.5);

  // 4. Top Header — Center Program Title & Registry
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA',
    148.5,
    17,
    { align: 'center' }
  );
  doc.text('E EDUCAÇÃO EM SAÚDE', 148.5, 21.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `Certificado Nº ${cert.certNumber} · Livro de Extensão nº ${cert.bookNumber} · Cód. ${cert.code}`,
    148.5,
    26.2,
    { align: 'center' }
  );

  // 5. Top Header — Right Institution (Centro Profissionalizante Maria Dalva de Araújo)
  doc.addImage(CERT_ASSETS.logoCpmda, 'PNG', 263, 12, 20, 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 29, 86);
  doc.text('CENTRO PROFISSIONALIZANTE', 259.5, 17.5, { align: 'right' });
  doc.text('MARIA DALVA DE ARAÚJO', 259.5, 21.8, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`CNPJ: ${cert.issuer2.cnpj}`, 259.5, 26.2, { align: 'right' });

  // Header Divider Line
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.line(14, 35, 283, 35);

  // 6. Main Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(6, 78, 59);
  doc.text('CERTIFICADO DE ATIVIDADE DE EXTENSÃO', 148.5, 47, {
    align: 'center',
  });

  // Gold Underline below Main Title
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);
  doc.line(95, 50, 202, 50);

  // 7. Introductory Institutional Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `A ${cert.issuer1.name} (CNPJ: ${cert.issuer1.cnpj}), em parceria institucional com o ${cert.issuer2.name} (CNPJ:`,
    148.5,
    58.5,
    { align: 'center' }
  );
  doc.text(
    `${cert.issuer2.cnpj}), certifica para os devidos fins de comprovação curricular e acadêmica que`,
    148.5,
    62.8,
    { align: 'center' }
  );

  // 8. Recipient Highlight Box
  doc.setFillColor(237, 252, 245); // Soft emerald tint (#EDFCF5)
  doc.setDrawColor(217, 119, 6); // Gold border
  doc.setLineWidth(0.3);
  doc.rect(24, 67, 249, 21, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(10, 29, 86);
  doc.text(cert.holderName, 148.5, 77, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `${cert.holderRole}  |  CPF: ${cert.holderCpf}  |  ${cert.holderInstitution}`,
    148.5,
    84.2,
    { align: 'center' }
  );

  // 9. Body Paragraphs (Page 1 - Dynamically wrapped from editable state)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.8);
  doc.setTextColor(15, 23, 42);

  const p1Wrapped: string[] = doc.splitTextToSize(cert.frontBodyParagraph1, 248);
  let curY = 95.8;
  p1Wrapped.slice(0, 4).forEach((line) => {
    doc.text(line, 24.5, curY);
    curY += 4.3;
  });

  curY += 2.6;
  const p2Wrapped: string[] = doc.splitTextToSize(cert.frontBodyParagraph2, 248);
  p2Wrapped.slice(0, 4).forEach((line) => {
    doc.text(line, 24.5, curY);
    curY += 4.3;
  });

  // 10. Location and Issue Date
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(cert.issueLocationAndDate, 148.5, 136.5, { align: 'center' });

  // 11. Bottom Left Signature — Bárbara Lima dos Santos
  doc.addImage(CERT_ASSETS.sigBarbara, 'PNG', 22, 149, 64, 18);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(15, 168.5, 93, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(6, 78, 59);
  doc.text(cert.issuer1.signerName, 54, 173, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text(cert.issuer1.signerRole, 54, 176.8, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Editora Mente e Saúde (CNPJ: ${cert.issuer1.cnpj})`,
    54,
    180.5,
    { align: 'center' }
  );

  // 12. Official Gold Seal (Selo Oficial Fé Pública) — Also touchable link
  doc.setFillColor(255, 242, 199); // #FFF2C7
  doc.setDrawColor(217, 119, 6); // #D97706
  doc.setLineWidth(0.6);
  doc.circle(109, 165, 11.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 53, 15);
  doc.text('SELO OFICIAL', 109, 161.2, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(8);
  doc.text('FÉ PÚBLICA', 109, 165.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.4);
  doc.text(cert.code, 109, 169.5, { align: 'center' });
  doc.link(97.5, 153.5, 23, 23, { url: fullVerifyUrl });

  // 13. QR Code Box & Manual Authentication Box (Touchable / Clickable in PDF)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(123.5, 151.5, 25, 25, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 124.5, 152.5, 23, 23);
  // Clickable hotspot over entire QR Code
  doc.link(123.5, 151.5, 25, 25, { url: fullVerifyUrl });

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(150.5, 151.5, 51, 25, 'FD');
  // Clickable hotspot over Manual Authentication Box
  doc.link(150.5, 151.5, 51, 25, { url: fullVerifyUrl });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(6, 78, 59);
  doc.text('AUTENTICAÇÃO PÚBLICA MANUAL', 152.5, 155.5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(15, 23, 42);
  doc.text(`Cód.: ${cert.code}`, 152.5, 159.8);

  doc.setTextColor(146, 64, 14);
  doc.text(`Chave: ${cert.controlKey}`, 152.5, 163.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(10, 29, 86);
  doc.text('Endereço p/ Verificação Online (Toque p/ abrir):', 152.5, 167.8);

  doc.setFont('courier', 'bold');
  doc.setFontSize(4.6);
  doc.setTextColor(10, 29, 86);
  doc.text(displayBaseUrl, 152.5, 171.5);
  doc.text(`?codigo=${cert.code}#validador`, 152.5, 174.5);

  // 14. Bottom Right Signature — James Araújo de Santana
  doc.addImage(CERT_ASSETS.sigJames, 'PNG', 210, 149, 64, 18);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(204, 168.5, 282, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(10, 29, 86);
  doc.text(cert.issuer2.signerName, 243, 173, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text(cert.issuer2.signerRole, 243, 176.8, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `Centro Profissionalizante Maria Dalva de Araújo (CNPJ: ${cert.issuer2.cnpj})`,
    243,
    180.5,
    { align: 'center' }
  );

  // 15. Bottom Verification Line — Touchable / Clickable Link Hotspot across the entire footer line!
  doc.setFont('courier', 'bold');
  doc.setFontSize(6.1);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Verifique via QR Code ou acesse ${displayBaseUrl} informando o Código ${cert.code} ou Chave ${cert.controlKey}`,
    148.5,
    191.5,
    { align: 'center' }
  );
  // Subtle underline indicating clickable link in footer
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.15);
  doc.line(35, 192.3, 262, 192.3);
  // Full-width clickable link hotspot on Page 1 footer
  doc.link(25, 188, 247, 6, { url: fullVerifyUrl });

  // =========================================================================
  // PAGE 2 — VERSO: MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO
  // =========================================================================
  doc.addPage('a4', 'landscape');

  // 1. Cream Academic Background
  doc.setFillColor(255, 253, 250);
  doc.rect(0, 0, 297, 210, 'F');

  // 2. Triple Institutional Frame
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.8);
  doc.rect(5, 5, 287, 200, 'S');

  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.35);
  doc.rect(6.8, 6.8, 283.4, 196.4, 'S');

  doc.setDrawColor(10, 29, 86);
  doc.setLineWidth(0.5);
  doc.rect(8.2, 8.2, 280.6, 193.6, 'S');

  // 3. Page 2 Header with Both Logos
  doc.addImage(CERT_ASSETS.logoEms, 'PNG', 14, 12, 13, 13);
  doc.addImage(CERT_ASSETS.logoCpmda, 'PNG', 29, 12, 13, 13);

  doc.setFont('times', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO',
    46,
    17.5
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Verso Oficial do Certificado Nº ${cert.certNumber} · Fé Pública Interinstitucional e Validação Curricular`,
    46,
    22.5
  );

  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.5);
  doc.line(14, 28, 283, 28);

  // 4. Section 1 (Left Box) & Section 2 (Right Box)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(14, 31, 155, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA', 18, 36.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(15, 23, 42);
  doc.text(`Titular Certificado: ${cert.holderName}`, 18, 42.2);
  doc.text(`CPF Registrado: ${cert.holderCpf}`, 18, 47.4);
  doc.text(`Qualificação Profissional: ${cert.holderRole}`, 18, 52.6);
  doc.text(`Instituição de Origem: ${cert.holderInstitution}`, 18, 57.8);

  // Box 2: Enquadramento Curricular
  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(10, 29, 86);
  doc.setLineWidth(0.25);
  doc.rect(173, 31, 110, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(10, 29, 86);
  doc.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 177, 36.2);

  doc.setTextColor(15, 23, 42);
  doc.text(cert.curriculumFramingLine1, 177, 42.5);
  doc.text(cert.curriculumFramingLine2, 177, 46.5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Período: ${cert.period} | Total: ${cert.totalHoursNumeric}`,
    177,
    58
  );

  // 5. Section 3 — Matriz de Atividades Práticas e Metodologia Extensionista (10 HORAS)
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(14, 65, 269, 7.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (${cert.totalHoursNumeric.toUpperCase()})`,
    18,
    70.2
  );

  let rowY = 72.5;
  const rowH = 14;
  cert.axes.forEach((axis) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(204, 214, 224);
    doc.setLineWidth(0.25);
    doc.rect(14, rowY, 269, rowH, 'FD');

    // Vertical column dividers
    doc.setDrawColor(227, 232, 240);
    doc.line(93, rowY, 93, rowY + rowH);
    doc.line(258, rowY, 258, rowY + rowH);

    // Axis Title & Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    doc.setTextColor(10, 29, 86);
    doc.text(axis.titleLine1, 17, rowY + 4.5);
    doc.text(axis.titleLine2, 17, rowY + 7.7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.6);
    doc.setTextColor(71, 85, 105);
    doc.text(axis.subtitle, 17, rowY + 11.8);

    // Axis Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(15, 23, 42);
    doc.text(axis.descriptionLine1, 96, rowY + 5.2);
    doc.text(axis.descriptionLine2, 96, rowY + 9.2);

    // Axis Hours
    doc.setFont('courier', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(6, 78, 59);
    doc.text(axis.hours, 263.5, rowY + 8.2);

    rowY += rowH;
  });

  // 6. Section 4 — Registro Oficial de Fé Pública, Endereço Web e Chaves (Touchable / Clickable)
  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.35);
  doc.rect(14, 131.5, 269, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(146, 64, 14);
  doc.text(
    '4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE',
    18,
    136.8
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Certificado registrado sob o nº ${cert.certNumber} no Livro de Extensão nº ${cert.bookNumber}, Folha ${cert.pageNumber}, expedido pela ${cert.issuer1.name} (CNPJ: ${cert.issuer1.cnpj}) e ${cert.issuer2.name}`,
    18,
    142
  );
  doc.text(`(CNPJ: ${cert.issuer2.cnpj}).`, 18, 145.3);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `CÓDIGO DE AUTENTICIDADE: ${cert.code}   |   CHAVE DE CONTROLE / DÍGITO: ${cert.controlKey}`,
    18,
    150.2
  );

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.9);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `ENDEREÇO PARA VERIFICAÇÃO MANUAL (TOQUE P/ ABRIR): ${fullVerifyUrl}`,
    18,
    155
  );
  // Subtle underline on the manual verification URL line
  doc.setDrawColor(10, 29, 86);
  doc.setLineWidth(0.15);
  doc.line(18, 155.8, 245, 155.8);
  // Clickable link hotspot over the URL row in Section 4
  doc.link(16, 151.5, 235, 5.5, { url: fullVerifyUrl });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.9);
  doc.setTextColor(15, 23, 42);
  doc.text(`HASH SHA-256: ${cert.sha256}`, 18, 159.8);

  // Page 2 QR Code inside Section 4 (Touchable / Clickable)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(253.5, 134, 26, 26, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 254.5, 135, 24, 24);
  doc.link(253.5, 134, 26, 26, { url: fullVerifyUrl });

  // 7. Page 2 Bottom Signatures & Center Footer
  doc.addImage(CERT_ASSETS.sigBarbara, 'PNG', 26, 164, 54, 15);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(18, 180, 92, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text(cert.issuer1.signerName, 55, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text(
    `Editora Mente e Saúde (CNPJ: ${cert.issuer1.cnpj})`,
    55,
    188,
    { align: 'center' }
  );

  // Center Footer (Touchable / Clickable Link Hotspot)
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(cert.issueLocationAndDate, 148.5, 179.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional',
    148.5,
    184.2,
    { align: 'center' }
  );

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Registro: ${cert.code} · Chave: ${cert.controlKey} · Verificar Online`,
    148.5,
    188,
    { align: 'center' }
  );
  doc.link(92, 182, 113, 8, { url: fullVerifyUrl });

  // Right Signature
  doc.addImage(CERT_ASSETS.sigJames, 'PNG', 215, 164, 54, 15);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(204, 180, 279, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(10, 29, 86);
  doc.text(cert.issuer2.signerName, 241.5, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text(
    `Centro Maria Dalva de Araújo (CNPJ: ${cert.issuer2.cnpj})`,
    241.5,
    188,
    { align: 'center' }
  );

  const safeName = cert.holderName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '');

  doc.save(
    `Certificado_Extensao_${cert.certNumber}_${cert.code}_${safeName}.pdf`
  );
}
