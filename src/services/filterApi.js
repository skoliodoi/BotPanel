import config from "../helpers/siteConfig";

function prepareUrlString(botName, phoneNumber, start, end) {
  const start_date = start;
  const end_date = end;
  const startDateString = start
    ? `&start=${encodeURIComponent(start_date)}`
    : "";
  const endDateString = end ? `&end=${encodeURIComponent(end_date)}` : "";
  const phoneNumberString = phoneNumber ? `&number=${phoneNumber}` : "";
  const combinedString = `/${config.apiPanelListUrl}/${botName}/data/?${startDateString}${endDateString}${phoneNumberString}`;
  return combinedString;
}

export async function getFilteredDataFromApi(
  botName,
  token,
  phoneNumber,
  start,
  end,
) {
  const urlString = prepareUrlString(botName, phoneNumber, start, end);
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
    console.log(error.status);
  }
}
