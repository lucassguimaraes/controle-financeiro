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
      window.html2canvas(input, { scale: 2, useCORS: true }).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;
        
        if (height <= pdfHeight) {
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        } else {
            // Handle content larger than one page if necessary (simplified here)
            console.warn("Conteúdo excede o tamanho de uma página A4. Considerar dividir ou escalar.")
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight * (canvasHeight/canvasWidth * (pdfWidth/pdfHeight)) ); //簡易的縮放以符合頁面
        }
        pdf.save(`controle-financeiro-${month.toLowerCase()}-${year}.pdf`);
      });
    } else {
      alert('Erro ao gerar PDF. Bibliotecas não carregadas ou elemento não encontrado.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors print:hidden"
    >
      Salvar em PDF (A4)
    </button>
  );
};

export default PdfExportButton;
