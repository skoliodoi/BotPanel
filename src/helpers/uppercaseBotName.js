function upperCaseBotName(name) {
  return name
    .split("_")
    .map((word) => `${word.charAt().toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

export { upperCaseBotName };
