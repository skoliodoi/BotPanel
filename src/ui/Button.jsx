function Button({ children, type, onClick }) {
  let backgroundColor = "";
  switch (type) {
    default:
      backgroundColor = "bg-sky-900";
  }

  return (
    <button
      className={`${backgroundColor} transition-all duration-300 rounded-lg border px-4 py-2 text-white hover:border-sky-900 hover:bg-white hover:font-bold hover:text-sky-900`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
