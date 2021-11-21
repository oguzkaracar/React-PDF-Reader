const Loader = ({isLoading}) => {
  if(!isLoading) return null;
  
  return (
    <div id="loader" className="d-flex justify-content-center align-items-center flex-column">
      {/* <img src="https://react-pdf.org/images/logo.png" alt="loader" className="mb-5 App-logo" /> */}
      <p className="text-white font-weight-bold">Logo Eklenecek - Yükleniyor...</p>
    </div>
  )
}

export default Loader
