import { useState, useRef, useEffect } from "react";

const useSizeElement = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  console.log(elementRef)

  useEffect(() => {
    if (elementRef.current) {
      setWidth(elementRef.current.clientWidth);
    }
  }, [elementRef]);

  return { width, elementRef };
};

export default useSizeElement;
