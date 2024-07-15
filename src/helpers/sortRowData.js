import { DateTime } from "luxon";

function formatTime(dateAndTime, checkingDetails = false) {
  const utcDateTime = DateTime.fromISO(dateAndTime, { zone: "utc" });
  const cetDateTime = utcDateTime.setZone("Europe/Warsaw");
  const formattedTime = checkingDetails
    ? cetDateTime.toFormat("HH:mm:ss")
    : cetDateTime.toFormat("yyyy-LL-dd HH:mm:ss");
  // return cetDateTime.toFormat("yyyy-LL-dd HH:mm:ss");
  // return DateTime.fromISO(dateAndTime).toFormat("yyyy-LL-dd HH:mm:ss");
  return formattedTime;
}

function calculateTimeDiff(startDate, endDate) {
  const diff = DateTime.fromISO(endDate).diff(DateTime.fromISO(startDate), [
    "minutes",
    "seconds",
  ]);
  const formattedDiff = diff.toFormat("mm:ss");
  return formattedDiff;
}

const returnObj = (el) => {
  const lastStatus = el.statusy
    ? el.statusy[el.statusy.length - 1]
    : "Brak statusów";

  let zapisWithTimings;
  if (el.zapis && el.zapis.length > 0) {
    const conversationStart = DateTime.fromISO(el.zapis[0]?.ts);
    zapisWithTimings = el.zapis?.map((el) => {
      const sentenceDuration = DateTime.fromISO(el.ts)
        .diff(conversationStart, "seconds")
        .toObject();
      return { ...el, audioTs: Math.floor(sentenceDuration.seconds) };
    });
  }
  const formattedTimeDifference = el.end_time
    ? calculateTimeDiff(el.start_time, el.end_time)
    : calculateTimeDiff(el.start_time, el.start_time);
  return {
    ...el,
    start_time: formatTime(el.start_time),
    end_time: el.end_time ? formatTime(el.end_time) : formatTime(el.start_time),
    bot_hangup: el.bot_hangup ? "T" : "N",
    forwarded: el.forwarded ? "T" : "N",
    zapis: zapisWithTimings,
    lastStatus,
    timeDiff: formattedTimeDifference,
  };
};

function sortRowData(data) {
  const rowData = data?.map((el) => {
    return returnObj(el);
  });

  return rowData;
}

export { sortRowData, formatTime };
