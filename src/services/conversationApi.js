import config from "../helpers/siteConfig";

export async function getConversationDataFromApi(botName, token, mongoId) {
  try {
    const res = await fetch(
      `${config.apiBaseUrl}/${config.apiPanelListUrl}/${botName}/data/?mongo_id=${mongoId}`,

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
