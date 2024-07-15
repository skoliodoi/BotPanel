import { useEffect, useState } from "react";
import { useLanguageData } from "../contexts/LanguageContext";

function Loader({ loaderText }) {
  const [displayLoader, setDisplayLoader] = useState(loaderText);
  const { t } = useLanguageData();
  useEffect(() => {
    setDisplayLoader(t(loaderText));
  }, [t, loaderText]);
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-sky-100">
      <img src="/images/pb_logo.png" alt="" />
      <div className="loader"></div>
      <span className="text-xl font-bold text-primebot-blue">
        {displayLoader}
      </span>
    </div>
  );
}

/* HTML: <div class="loader"></div> */

export default Loader;
