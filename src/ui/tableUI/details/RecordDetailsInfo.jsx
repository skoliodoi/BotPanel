import { useEffect, useState } from "react";
import { useLanguageData } from "../../../contexts/LanguageContext";

function RecordDetailsInfo({ label, data }) {
  const { t } = useLanguageData();
  const [displayLabel, setDisplayLabel] = useState(label);
  useEffect(() => {
    setDisplayLabel(t(label));
  }, [t, label]);
  return (
    <div className="text-center">
      <span className="font-bold">{displayLabel}:</span>
      <p>{data}</p>
    </div>
  );
}

export default RecordDetailsInfo;
