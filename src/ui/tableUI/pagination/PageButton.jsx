function PageButton({ children, onClick, selected, disabled }) {
  const selectedClass = selected ? "bg-sky-900 text-white" : "";
  return (
    <button
      disabled={disabled}
      className={`${selectedClass} min-w-10 rounded-md border border-sky-900 p-2 font-bold text-sky-900  hover:bg-sky-900 hover:text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PageButton;
