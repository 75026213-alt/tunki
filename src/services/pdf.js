import jsPDF from "jspdf";
import logoImage from "../assets/icono-logo.png";

let cachedLogoDataUrl = null;

async function getLogoDataUrl() {
  if (cachedLogoDataUrl) {
    return cachedLogoDataUrl;
  }

  const response = await fetch(logoImage);
  const blob = await response.blob();

  cachedLogoDataUrl = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  return cachedLogoDataUrl;
}

async function addBrandHeader(doc, title, subtitle, fillColor) {
  const logoDataUrl = await getLogoDataUrl();

  doc.setFillColor(...fillColor);
  doc.rect(0, 0, 210, 42, "F");
  doc.addImage(logoDataUrl, "PNG", 14, 8, 23, 23);

  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold");
  doc.setFontSize(22);
  doc.text(title, 43, 19);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(subtitle, 43, 27);
}

function addFooter(doc) {
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Tunki Coffee | hola@tunkicafe.pe | WhatsApp +51 963 436 873",
    105,
    285,
    { align: "center" }
  );
}

export async function generateOrderPDF(order, user) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const primaryColor = [139, 111, 71];
  const darkColor = [55, 84, 51];
  const lightGray = [240, 240, 240];
  const cream = [247, 241, 231];

  await addBrandHeader(
    doc,
    "Tunki Coffee",
    "Comprobante de compra y seguimiento",
    primaryColor
  );

  doc.setTextColor(...darkColor);
  doc.setFont(undefined, "bold");
  doc.setFontSize(16);
  doc.text("COMPROBANTE DE COMPRA", 15, 54);
  doc.setDrawColor(...primaryColor);
  doc.line(15, 59, 195, 59);

  doc.setFontSize(10);
  doc.text("Número de orden:", 15, 70);
  doc.text("Fecha:", 15, 78);
  doc.text("Estado:", 15, 86);
  doc.setFont(undefined, "normal");
  doc.text(order.id, 72, 70);
  doc.text(new Date(order.createdAt).toLocaleDateString("es-ES"), 72, 78);
  doc.text(String(order.status || "completada").toUpperCase(), 72, 86);

  doc.setFont(undefined, "bold");
  doc.text("Método de pago:", 118, 70);
  doc.text("Puntos Tunki:", 118, 78);
  doc.setFont(undefined, "normal");
  doc.text(order.paymentMethod === "card" ? "Tarjeta" : "Yape / Plin", 164, 70);
  doc.text(`+${order.pointsEarned || 0} pts`, 164, 78);

  doc.setFillColor(...lightGray);
  doc.roundedRect(15, 98, 180, 30, 3, 3, "F");
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, "bold");
  doc.setFontSize(10);
  doc.text("DATOS DEL CLIENTE", 20, 106);
  doc.setFont(undefined, "normal");
  doc.setFontSize(9);
  doc.text(`Usuario: ${user.username || user.email.split("@")[0]}`, 20, 114);
  doc.text(`Email: ${user.email}`, 20, 121);
  if (order.deliveryDetails?.contactPhone) {
    doc.text(`WhatsApp: ${order.deliveryDetails.contactPhone}`, 112, 121);
  }

  let yPosition = 145;
  doc.setFont(undefined, "bold");
  doc.setFontSize(10);
  doc.setFillColor(...primaryColor);
  doc.setTextColor(255, 255, 255);
  doc.rect(15, yPosition - 5, 180, 8, "F");
  doc.text("PRODUCTOS", 20, yPosition);
  doc.text("CANT.", 120, yPosition);
  doc.text("PRECIO", 160, yPosition);

  yPosition += 11;
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, "normal");
  doc.setFontSize(9);

  order.items.forEach((item) => {
    doc.text(item.name || "Café Tunki", 20, yPosition);
    doc.text(String(item.quantity), 124, yPosition);
    doc.text(`S/ ${(item.price || 0).toFixed(2)}`, 160, yPosition);

    if (item.type || item.weight) {
      yPosition += 5;
      doc.setTextColor(100, 100, 100);
      doc.text(`${item.type || "Café"} ${item.weight ? `- ${item.weight}` : ""}`, 20, yPosition);
      doc.setTextColor(...darkColor);
    }

    yPosition += 8;
  });

  doc.setDrawColor(...primaryColor);
  doc.line(15, yPosition, 195, yPosition);
  yPosition += 8;

  const subtotal = order.items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );
  const shipping = 8;

  doc.setFont(undefined, "bold");
  doc.text("Subtotal:", 140, yPosition);
  doc.text(`S/ ${subtotal.toFixed(2)}`, 165, yPosition);
  yPosition += 7;
  doc.text("Envío:", 140, yPosition);
  doc.text(`S/ ${shipping.toFixed(2)}`, 165, yPosition);
  yPosition += 7;
  doc.setFillColor(...lightGray);
  doc.rect(140, yPosition - 4, 55, 8, "F");
  doc.text("TOTAL:", 140, yPosition + 2);
  doc.text(`S/ ${order.total.toFixed(2)}`, 165, yPosition + 2);

  yPosition += 18;
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, "bold");
  doc.text("ENTREGA", 15, yPosition);
  yPosition += 7;
  doc.setFont(undefined, "normal");
  const deliveryText = `Agencia ${order.agency === "shalom" ? "Shalom" : "Olva"}`;
  doc.text(deliveryText, 15, yPosition);

  if (order.deliveryDetails?.agencyLocation) {
    yPosition += 7;
    doc.text(`Agencia seleccionada: ${order.deliveryDetails.agencyLocation}`, 15, yPosition);
  }

  if (order.deliveryDetails?.city) {
    yPosition += 7;
    doc.text(`Ciudad: ${order.deliveryDetails.city}, ${order.deliveryDetails.region || ""}`, 15, yPosition);
  }

  yPosition += 14;
  doc.setFillColor(...cream);
  doc.roundedRect(15, yPosition - 5, 180, 32, 3, 3, "F");
  doc.setFont(undefined, "bold");
  doc.setFontSize(10);
  doc.text("SEGUIMIENTO POR WHATSAPP", 22, yPosition + 3);
  doc.setFont(undefined, "normal");
  doc.setFontSize(8.8);
  doc.text(
    "Nos pondremos en contacto por WhatsApp para confirmar tu pedido y enviarte el código de recojo o las indicaciones de entrega.",
    22,
    yPosition + 12,
    { maxWidth: 166 }
  );

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Gracias por tu compra. Conserva este comprobante hasta recibir tu pedido.",
    105,
    280,
    { align: "center" }
  );
  addFooter(doc);

  return doc;
}

export async function downloadOrderPDF(order, user) {
  const doc = await generateOrderPDF(order, user);
  doc.save(`tunki-orden-${order.id}.pdf`);
}

export async function generateRewardPDF(redemption, user) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const primaryColor = [55, 84, 51];
  const accentColor = [139, 111, 71];
  const lightColor = [247, 241, 231];

  await addBrandHeader(
    doc,
    "Tunki Coffee",
    "Cupón de premio exclusivo",
    primaryColor
  );

  doc.setTextColor(...primaryColor);
  doc.setFont(undefined, "bold");
  doc.setFontSize(18);
  doc.text("PREMIO CANJEADO", 15, 62);
  doc.setDrawColor(...accentColor);
  doc.line(15, 68, 195, 68);

  doc.setFillColor(...lightColor);
  doc.roundedRect(15, 82, 180, 76, 4, 4, "F");
  doc.setFontSize(12);
  doc.text("Premio:", 25, 100);
  doc.setFont(undefined, "normal");
  doc.text(redemption.rewardTitle, 62, 100);

  doc.setFont(undefined, "bold");
  doc.text("Código:", 25, 114);
  doc.setFontSize(18);
  doc.text(redemption.code, 62, 115);

  doc.setFontSize(11);
  doc.text("Puntos usados:", 25, 132);
  doc.setFont(undefined, "normal");
  doc.text(`${redemption.pointsUsed} pts`, 62, 132);

  doc.setFont(undefined, "bold");
  doc.text("Fecha:", 25, 145);
  doc.setFont(undefined, "normal");
  doc.text(new Date(redemption.createdAt).toLocaleDateString("es-ES"), 62, 145);

  doc.setFont(undefined, "bold");
  doc.text("Estado:", 118, 145);
  doc.setFont(undefined, "normal");
  doc.text("Pendiente de coordinación", 143, 145);

  doc.setTextColor(...primaryColor);
  doc.setFont(undefined, "bold");
  doc.setFontSize(11);
  doc.text("DATOS DEL CLIENTE", 15, 178);
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(`Usuario: ${user.username || user.email.split("@")[0]}`, 15, 188);
  doc.text(`Email: ${user.email}`, 15, 196);

  doc.setFillColor(...primaryColor);
  doc.roundedRect(15, 215, 180, 36, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold");
  doc.setFontSize(11);
  doc.text("Cómo usarlo", 25, 228);
  doc.setFont(undefined, "normal");
  doc.setFontSize(9);
  doc.text(
    "Presenta este cupón y tu código al equipo Tunki para coordinar el canje.",
    25,
    238,
    { maxWidth: 160 }
  );
  doc.text(
    "También puedes enviarlo por WhatsApp para reservar fecha, stock o punto de recojo.",
    25,
    244,
    { maxWidth: 160 }
  );

  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text(
    "Válido para el usuario indicado. Sujeto a verificación de disponibilidad.",
    105,
    280,
    { align: "center" }
  );
  addFooter(doc);

  return doc;
}

export async function downloadRewardPDF(redemption, user) {
  const doc = await generateRewardPDF(redemption, user);
  doc.save(`tunki-premio-${redemption.code}.pdf`);
}
