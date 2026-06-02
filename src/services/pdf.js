import jsPDF from 'jspdf';

export function generateOrderPDF(order, user) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Colores
  const primaryColor = [139, 111, 71]; // #8b6f47
  const darkColor = [55, 84, 51];      // #375433
  const lightGray = [240, 240, 240];

  // Encabezado
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('TUNKI', 15, 20);
  doc.setFontSize(10);
  doc.text('Café Premium', 15, 28);

  // Título
  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.text('COMPROBANTE DE COMPRA', 15, 50);

  // Línea separadora
  doc.setDrawColor(...primaryColor);
  doc.line(15, 55, 195, 55);

  // Datos de la orden
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('Número de Orden:', 15, 65);
  doc.setFont(undefined, 'normal');
  doc.text(order.id, 80, 65);

  doc.setFont(undefined, 'bold');
  doc.text('Fecha:', 15, 72);
  doc.setFont(undefined, 'normal');
  doc.text(new Date(order.createdAt).toLocaleDateString('es-ES'), 80, 72);

  doc.setFont(undefined, 'bold');
  doc.text('Estado:', 15, 79);
  doc.setFont(undefined, 'normal');
  doc.text(order.status.toUpperCase(), 80, 79);

  // Datos del cliente
  doc.setFillColor(...lightGray);
  doc.rect(15, 88, 180, 25, 'F');
  
  doc.setFont(undefined, 'bold');
  doc.setFontSize(10);
  doc.text('DATOS DEL CLIENTE', 20, 95);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  doc.text(`Email: ${user.email}`, 20, 102);
  doc.text(`Usuario: ${user.username || user.email.split('@')[0]}`, 20, 108);

  // Tabla de productos
  let yPosition = 125;
  
  doc.setFont(undefined, 'bold');
  doc.setFontSize(10);
  doc.setFillColor(...primaryColor);
  doc.setTextColor(255, 255, 255);
  doc.rect(15, yPosition - 5, 180, 7, 'F');
  doc.text('PRODUCTOS', 20, yPosition);
  doc.text('CANTIDAD', 120, yPosition);
  doc.text('PRECIO', 160, yPosition);

  yPosition += 10;
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);

  order.items.forEach((item) => {
    doc.text(item.name || 'Café en Grano Tunki', 20, yPosition);
    doc.text(item.quantity.toString(), 125, yPosition);
    doc.text(`S/ ${item.price?.toFixed(2) || '34.50'}`, 165, yPosition);
    yPosition += 7;
  });

  // Línea separadora
  doc.setDrawColor(...primaryColor);
  doc.line(15, yPosition, 195, yPosition);

  yPosition += 8;

  // Totales
  doc.setFont(undefined, 'bold');
  doc.setFontSize(10);
  
  const subtotal = order.items.reduce((acc, item) => acc + (item.price || 34.50) * item.quantity, 0);
  const shipping = order.deliveryType === 'agency' ? 8 : 0;
  
  doc.text('Subtotal:', 140, yPosition);
  doc.text(`S/ ${subtotal.toFixed(2)}`, 165, yPosition);
  
  yPosition += 7;
  doc.text('Envío:', 140, yPosition);
  doc.text(`S/ ${shipping.toFixed(2)}`, 165, yPosition);
  
  yPosition += 7;
  doc.setFillColor(...lightGray);
  doc.rect(140, yPosition - 3, 55, 7, 'F');
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL:', 140, yPosition + 2);
  doc.text(`S/ ${order.total.toFixed(2)}`, 165, yPosition + 2);

  // Datos de entrega
  yPosition += 18;
  doc.setFont(undefined, 'bold');
  doc.setFontSize(10);
  doc.text('TIPO DE ENTREGA', 15, yPosition);
  
  yPosition += 7;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  const deliveryText = order.deliveryType === 'pickup' 
    ? 'Recojo en tienda - Av. Los Cafetales 123, Puno'
    : `Agencia: ${order.agency === 'shalom' ? 'Shalom' : 'Olva'}`;
  doc.text(deliveryText, 15, yPosition);

  // Pie de página
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Gracias por tu compra. Conserva este comprobante.', 105, 280, { align: 'center' });
  doc.text('Para consultas: info@tunki.com | +51 987 654 321', 105, 285, { align: 'center' });

  return doc;
}

export function downloadOrderPDF(order, user) {
  const doc = generateOrderPDF(order, user);
  doc.save(`tunki-orden-${order.id}.pdf`);
}
