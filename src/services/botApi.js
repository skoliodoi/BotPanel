import config from "../helpers/siteConfig";

export async function checkBotAvailability(urlParam) {
  console.log(urlParam)
  const res = await fetch(
    `${config.apiBaseUrl}/${config.apiPanelListUrl}/list-public`,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const botFound = data.find((e) => e.name === urlParam);

  const botName = botFound?.name;
  if (!botName) {
    throw new Error("Nie ma bota");
  }
  return botName;
}

// function createDateString(dateOne, dateTwo, param) {
//   let dateString;
//   if (dateOne) {
//     dateString = `&${param}=${dateOne}`;
//   } else if (dateTwo) {
//     dateString = `&${param}=${dateTwo}`;
//   } else {
//     dateString = "";
//   }
//   return dateString;
// }

function prepareUrlString(
  pageUrl,
  pageNumber,
  pageSize,
  start,
  end,
  botName,
  phoneNumber,
  // filterStart,
  // filterEnd,
  filterStatus,
  filterContent,
  sortArray,
) {
  if (pageUrl) return pageUrl;
  let sortingUrl = "&ordering=";
  for (const param of sortArray) {
    sortingUrl += `${param},`;
  }
  sortingUrl = sortingUrl.replace(/,$/, "");
  const start_date = start;
  const end_date = end;
  const datesString =
    start && end
      ? `&start=${encodeURIComponent(start_date)}&end=${encodeURIComponent(end_date)}`
      : ``;
  const pageSizeString = pageSize == 100 ? "" : `&page_size=${pageSize}`;
  const pageString = pageNumber == 1 ? "" : `&page=${pageNumber}`;
  const phoneNumberString = phoneNumber ? `&number=${phoneNumber}` : "";
  // const startDateString = createDateString(filterStart, filterEnd, "start");
  // const endDateString = createDateString(filterEnd, filterStart, "end");
  const filterStatusString = filterStatus ? `&status=${filterStatus}` : "";
  const filterContentString = filterContent ? `&content=${filterContent}` : "";
  const combinedString = `/${config.apiPanelListUrl}/${botName}/data/?${datesString}${pageSizeString}${pageString}${phoneNumberString}${filterStatusString}${filterContentString}${sortingUrl}`;
  return combinedString;
}

export async function getBotDataFromApi(
  botName,
  token,
  dates,
  selectedPage = 1,
  pageSize = 100,
  pageUrl = null,
  phoneNumber,
  // filterStart,
  // filterEnd,
  filterStatus,
  filterContent,
  sortArray,
) {
  const startDate = dates.startDate;
  const endDate = dates.endDate;

  const urlString = prepareUrlString(
    pageUrl,
    selectedPage,
    pageSize,
    startDate,
    endDate,
    botName,
    phoneNumber,
    // filterStart,
    // filterEnd,
    filterStatus,
    filterContent,
    sortArray,
  );
  try {
    const res = await fetch(
      `${config.apiBaseUrl}${urlString}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      const errorDetail = await res.json();
      console.log(errorDetail);
      throw new Error("Nie działa");
    }
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
