import React from 'react';

// These are globals from CDN script tags in index.html
declare const html2canvas: any; 
declare const jsPDF: any;

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
      return;
    }

    // Temporarily add print-specific styles for better PDF layout
    document.body.classList.add('print-styles-active');
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .print\\:hidden { display: none !important; }
        .print\\:text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
        .print\\:text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
        .print\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
        .print\\:text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
        .print\\:text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
        .print\\:p-0 { padding: 0 !important; }
        .print\\:p-1 { padding: 0.25rem !important; }
        .print\\:p-2 { padding: 0.5rem !important; }
        .print\\:m-0 { margin: 0 !important; }
        .print\\:mb-1 { margin-bottom: 0.25rem !important; }
        .print\\:mb-2 { margin-bottom: 0.5rem !important; }
        .print\\:mb-4 { margin-bottom: 1rem !important; }
        .print\\:shadow-none { box-shadow: none !important; }
        .print\\:border-none { border: none !important; }
        .print\\:border-b { border-bottom-width: 1px !important; border-color: #e5e7eb !important; }
        .print\\:bg-transparent { background-color: transparent !important; }
        .print\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .print\\:w-16 { width: 4rem !important; }
        .print\\:text-green-700 { color: #047857 !important; }
        .print\\:text-red-700 { color: #b91c1c !important; }
        svg, svg * { /* Ensure SVG colors are printed */
          fill: currentColor !important; /* Or specific colors if needed */
          stroke: currentColor !important; /* Or specific colors if needed */
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
        onclone: (clonedDoc: Document) => { // Added Document type here
            // Attempt to ensure SVGs are fully rendered, especially external ones or complex ones
            Array.from(clonedDoc.querySelectorAll('svg')).forEach(svg => {
                // You might need more specific handling if SVGs don't render correctly
                // For example, inline styles or re-triggering some rendering logic if possible
            });
        }
      });

      const imgData = canvas.toDataURL('image/png');
      // @ts-ignore
      const pdf = new jsPDF.jsPDF({ // Correct instantiation if using jspdf.umd.min.js global
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

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

      const xOffset = margin + (effectivePdfWidth - finalImgWidth) / 2; // Center within margins
      const yOffset = margin + (effectivePdfHeight - finalImgHeight) / 2; // Center within margins

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