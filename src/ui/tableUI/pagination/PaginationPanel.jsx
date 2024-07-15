import PageSizeSelector from "./PageSizeSelector";
import PaginationButtons from "./PaginationButtons";

function PaginationPanel() {
  return (
    <div className="flex justify-between p-2">
      <PaginationButtons />
      <PageSizeSelector />
    </div>
  );
}

export default PaginationPanel;
