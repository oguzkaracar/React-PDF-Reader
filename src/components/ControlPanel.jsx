import PDFPrinter from './PDFPrinter';

const ControlPanel = (props) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  // variables - states
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
  const lastPageClass = isLastPage ? 'disabled' : 'clickable';

  // pagination methods
  const goToFirstPage = () => !isFirstPage && setPageNumber(1)
  const goToPreviousPage = () => !isFirstPage && setPageNumber((prev)=> prev - 1)
  const goToNextPage = () => !isLastPage && setPageNumber((prev)=> prev + 1)
  const goToLastPage = () => !isLastPage && setPageNumber(numPages)

  // page change method
  const onPageChange = (e) =>{
    const {value} = e?.target;
    setPageNumber(Number(value));
  } 
  
  // zoom related variables - methods
  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;
  const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
  const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';
  const zoomOut = () => !isMinZoom && setScale(scale - 0.1)
  const zoomIn = () =>!isMaxZoom && setScale(scale + 0.1);
  

  return (
    <div className="control-panel m-3 p-3 d-flex align-items-baseline justify-content-between">
    {/* Pagination Elements */}
      <div className="d-flex justify-content-between align-items-baseline">
        <i className={`fas fa-fast-backward mx-3 ${firstPageClass}`} onClick={goToFirstPage}/>
        <i className={`fas fa-backward mx-3 ${firstPageClass}`} onClick={goToPreviousPage}/>
        <span>
          Page{' '}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            className="p-0 pl-1 mx-2"
            value={pageNumber}
            onChange={onPageChange}
            disabled={isLastPage}
          />{' '}
          of {numPages}
        </span>
        <i
          className={`fas fa-forward mx-3 ${lastPageClass}`}
          onClick={goToNextPage}
        />
        <i
          className={`fas fa-fast-forward mx-3 ${lastPageClass}`}
          onClick={goToLastPage}
        />
      </div>

      {/* Zoom Elements */}
      <div className="d-flex justify-content-between align-items-baseline">
        <i
          className={`fas fa-search-minus mx-3 ${zoomOutClass}`}
          onClick={zoomOut}
        />
        <span>{(scale * 100).toFixed()}%</span>
        <i
          className={`fas fa-search-plus mx-3 ${zoomInClass}`}
          onClick={zoomIn}
        />
      </div>

      {/* Download - Print */}
      <div className="mx-3">
      {/* href="/assets/docs/file2.pdf" */}
        <a href={file} download title="download">
          <i className="fas fa-file-download clickable" />
        </a>
      </div>
      <div className="mx-3">
        <PDFPrinter file={file} />
      </div>
    </div>
  );
};

export default ControlPanel;
