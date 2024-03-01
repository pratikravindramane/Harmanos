import React from "react";
function Footer() {
  return (
    <>
      <footer className="py-4 footer">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 ">
              <p className="text-center mb-0 text-white">
                &copy;{new Date().getFullYear()} powered by Pratik Mane{" "}
              </p>
            </div>
            {/* <div className="col-6">pollo</div> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
