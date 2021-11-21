import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// local imports
import ControlPanel from './ControlPanel';
import Loader from './Loader';

// pdfgs worker - config.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <div className="d-flex justify-content-center">
      <Loader isLoading={isLoading} />

      <section id="pdf-section">
        <ControlPanel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          file="/assets/docs/file2.pdf"
        />
        <Document
          file="/assets/docs/file2.pdf"
          // file="http://www.orimi.com/pdf-test.pdf"
          noData="PDF Oluşturulamadı."
          loading="PDF Oluşturuluyor..."
          onLoadSuccess={onDocumentLoadSuccess}
          // renderMode="svg"
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </section>
    </div>
  );
};

export default PDFReader;
