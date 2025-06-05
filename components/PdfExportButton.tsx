import React from 'react';
import jsPDF from 'jspdf'; // <--- IMPORTANTE: importação default
import html2canvas from 'html2canvas'; // <--- IMPORTANTE: importação default

// REMOVA as linhas abaixo se ainda estiverem lá:
// declare const html2canvas: any;
// declare const jsPDF: any;

interface PdfExportButtonProps {
  targetId: string;
  month: string;
  year: number;
}

const PdfExportButton: React.FC<PdfExportButtonProps> = ({ targetId, month, year }) => {
  const exportToPdf = async () => {
    const elementToPrint = document.getElementById(targetId);
    if (!elementToPrint) {
      console.error('Element to print not found!');
      alert("Elemento para impressão não encontrado. Verifique o console.");
      return;
    }

    // ... (estilos de impressão e lógica onclone permanecem os mesmos) ...
    document.body.classList.add('print-styles-active');
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .print\\:hidden { display: none !important; }
        /* ... outros estilos de impressão ... */
        svg, svg * {
          fill: currentColor !important;
          stroke: currentColor !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `;
    document.head.appendChild(printStyles);

    try {
      const canvas = await html2canvas(elementToPrint, {
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc: Document) => {
            Array.from(clonedDoc.querySelectorAll('svg')).forEach(_svg => {
                // Tentativa de garantir que SVGs tenham dimensões explícitas se necessário
                // ou outras manipulações no documento clonado.
            });
        }
      });

      const imgData = canvas.toDataURL('image/png');
      
      // AQUI ESTÁ A CORREÇÃO CRÍTICA:
      const pdf = new jsPDF({ // <--- Use jsPDF diretamente, não jsPDF.jsPDF
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // ... (lógica de addImage e save permanece a mesma) ...
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const effectivePdfWidth = pdfWidth - 2 * margin;
      const effectivePdfHeight = pdfHeight - 2 * margin;
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;
      const ratio = Math.min(effectivePdfWidth / imgWidth, effectivePdfHeight / imgHeight);
      const finalImgWidth = imgWidth * ratio;
      const finalImgHeight = imgHeight * ratio;
      const xOffset = margin + (effectivePdfWidth - finalImgWidth) / 2;
      const yOffset = margin + (effectivePdfHeight - finalImgHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalImgWidth, finalImgHeight);
      pdf.save(`controle-financeiro-${month.toLowerCase()}-${year}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF. Tente novamente.");
    } finally {
       document.body.classList.remove('print-styles-active');
       if (printStyles.parentNode) {
        printStyles.parentNode.removeChild(printStyles);
       }
    }
  };

  return (
    <button
      onClick={exportToPdf}
      className="bg-secondary text-white px-6 py-3 rounded-md hover:bg-emerald-600 transition-colors font-semibold shadow-lg print:hidden"
    >
      Salvar em PDF (A4)
    </button>
  );
};

export default PdfExportButton;