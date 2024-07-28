import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CountUp } from "countup.js";

export default function CountUpJS({ endValue }) {
  // Component logic...
  const countUpRef = useRef(null);

  useEffect(() => {
    const countUp = new CountUp(countUpRef.current, endValue);
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  }, [endValue]);

  return <span ref={countUpRef}></span>;
}

CountUp.propTypes = {
  endValue: PropTypes.number.isRequired,
};
