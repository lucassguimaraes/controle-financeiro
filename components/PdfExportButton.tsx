import React from 'react';

declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

interface PdfExportButtonProps {
  targetId: string;
  month: string;
  year: number;
}

const PdfExportButton: React.FC<PdfExportButtonProps> = ({ targetId, month, year }) => {
  const handleExport = () => {
    const input = document.getElementById(targetId);
    if (input && window.html2canvas && window.jspdf) {
      const { jsPDF } = window.jspdf;
      
      // html2canvas options
      const options = {
        scale: 2, // Maintain current scale for better quality
        useCORS: true,
        logging: false, // Disable logging for production, enable for debugging
        // Ensure canvas captures full height of the element, not just visible part
        height: input.scrollHeight,
        width: input.scrollWidth,
        windowHeight: input.scrollHeight,
        windowWidth: input.scrollWidth,
      };

      window.html2canvas(input, options).then((canvas: HTMLCanvasElement) => {
        const mainCanvasWidthPx = canvas.width;
        const mainCanvasHeightPx = canvas.height;

        const pdf = new jsPDF({
          orientation: 'p', // portrait
          unit: 'mm',
          format: 'a4'
        });

        const pdfPageWidthMM = pdf.internal.pageSize.getWidth();
        const pdfPageHeightMM = pdf.internal.pageSize.getHeight();

        // Calculate the height of a slice from the main canvas that, when scaled to pdfPageWidthMM,
        // would have a height of pdfPageHeightMM on the PDF.
        // This determines how much vertical content from the source canvas fits on one PDF page.
        const singlePageCanvasSliceHeightPx = Math.floor((pdfPageHeightMM / pdfPageWidthMM) * mainCanvasWidthPx);
        
        let numPages = Math.ceil(mainCanvasHeightPx / singlePageCanvasSliceHeightPx);
        if (numPages === 0 && mainCanvasHeightPx > 0) numPages = 1; // Ensure at least one page if there's content
        else if (mainCanvasHeightPx === 0) numPages = 0; // No pages for no content

        if (numPages === 0) {
            alert("Nada para exportar.");
            return;
        }

        let currentYoffsetPx = 0;

        for (let i = 0; i < numPages; i++) {
          if (i > 0) {
            pdf.addPage();
          }

          const sliceHeightPx = Math.min(singlePageCanvasSliceHeightPx, mainCanvasHeightPx - currentYoffsetPx);
          
          if (sliceHeightPx <= 0) continue;

          // Create a temporary canvas for the current page's slice
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = mainCanvasWidthPx;
          sliceCanvas.height = sliceHeightPx;
          const sliceCtx = sliceCanvas.getContext('2d');

          if (sliceCtx) {
            // Draw the appropriate slice from the main (large) canvas to the temporary slice canvas
            sliceCtx.drawImage(
              canvas,               // Source canvas
              0,                    // Source X
              currentYoffsetPx,     // Source Y (where to start slicing from the main canvas)
              mainCanvasWidthPx,    // Source Width
              sliceHeightPx,        // Source Height (height of the slice)
              0,                    // Destination X on sliceCanvas
              0,                    // Destination Y on sliceCanvas
              mainCanvasWidthPx,    // Destination Width on sliceCanvas
              sliceHeightPx         // Destination Height on sliceCanvas
            );

            const imgData = sliceCanvas.toDataURL('image/png', 1.0); // PNG quality

            // Add the image slice to the PDF page.
            // Set height to 0 to let jspdf calculate it based on width and aspect ratio.
            // The image will be scaled to fit pdfPageWidthMM.
            // Its height will be <= pdfPageHeightMM due to singlePageCanvasSliceHeightPx calculation.
            pdf.addImage(imgData, 'PNG', 0, 0, pdfPageWidthMM, 0, undefined, 'FAST');
          }
          currentYoffsetPx += sliceHeightPx;
        }
        pdf.save(`controle-financeiro-${month.toLowerCase()}-${year}.pdf`);
      }).catch((error: any) => {
          console.error("Erro durante a captura html2canvas:", error);
          alert('Erro ao gerar PDF: Falha na captura do conteúdo. Verifique o console para detalhes.');
      });
    } else {
      let errorMsg = 'Erro ao gerar PDF.';
      if (!input) errorMsg += ' Elemento alvo não encontrado.';
      if (!window.html2canvas) errorMsg += ' Biblioteca html2canvas não carregada.';
      if (!window.jspdf) errorMsg += ' Biblioteca jspdf não carregada.';
      alert(errorMsg);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors print:hidden"
      aria-label={`Salvar relatório de ${month} ${year} como PDF`}
    >
      Salvar em PDF (A4)
    </button>
  );
};

export default PdfExportButton;