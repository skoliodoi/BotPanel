export default function calculateButtonNumbers(numberOfPages, selectedPage) {
  let initialNumber = selectedPage;
  const remainingPages = numberOfPages - selectedPage;
  let finalArr;
  if (numberOfPages > 9) {
    if (initialNumber <= 5) {
      const firstFive = [...Array(5)].map((_, i) => {
        const buttonValue = i + 1;
        return { name: buttonValue, val: buttonValue };
      });
      const nextNumber = { name: "...", val: initialNumber + 5 };
      finalArr = [
        ...firstFive,
        nextNumber,
        { name: numberOfPages, val: numberOfPages },
      ];
    } else {
      const threeButtons = [...Array(3)]
        .map((_, i) => {
          const buttonValue = initialNumber - i;
          return { name: buttonValue, val: buttonValue };
        })
        .reverse();
      const twoButtons = [...Array(2)].map((_, i) => {
        const buttonValue = i + 1 + initialNumber;
        return { name: buttonValue, val: buttonValue };
      });
      const prevButtonNumber = initialNumber - (initialNumber == 6 ? 4 : 5);
      const nextButtonNumber = initialNumber + 5;
      finalArr = [
        { name: 1, val: 1 },
        { name: "...", val: prevButtonNumber },
        ...threeButtons,
        ...twoButtons,
        { name: "...", val: nextButtonNumber },
        { name: numberOfPages, val: numberOfPages },
      ];
    }
    if (remainingPages <= 5) {
      const prevNumber = { name: "...", val: numberOfPages - 6 };
      const finalButtons = [...Array(5)]
        .map((_, i) => {
          const buttonValue = numberOfPages - i;
          return { name: buttonValue, val: buttonValue };
        })
        .reverse();
      finalArr = [{ name: 1, val: 1 }, prevNumber, ...finalButtons];
    }
    // const middleIndex = Math.floor(buttons.length / 2);
    // buttons.splice(middleIndex, 0, "...");
  } else {
    finalArr = [...Array(numberOfPages)].map((_, i) => {
      const buttonValue = i + 1;
      return { name: buttonValue, val: buttonValue };
    });
  }
  return finalArr;
}
