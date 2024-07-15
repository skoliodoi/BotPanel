function Error({errorText}) {
  return (
    <div
      className="flex h-dvh flex-col items-center justify-center gap-6"
      style={{ backgroundColor: "#E8DFCB" }}
    >
      <img
        src="/images/questionmark.png"
        className="h-auto w-1/6"
        alt="Question Mark sign"
      />
      <span className="text-2xl text-wrap w-1/3">{errorText}</span>
    </div>
  );
}

export default Error;
