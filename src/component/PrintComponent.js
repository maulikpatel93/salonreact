import React, { useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";

export default function PrintComponent() {
  let componentRef = useRef();
  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint trigger={() => <button>Print this out!</button>} content={() => componentRef.current} />

        {/* component to be printed */}
        <div className="d-none">
          <ComponentToPrint ref={componentRef} />
        </div>
      </div>
    </>
  );
}

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const isPrint = useSelector((state) => state.report.isPrint);
  return (
    <div ref={ref}>
      <div>{isPrint && document.write(isPrint)}</div>
    </div>
  );
});
