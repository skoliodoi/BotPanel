function filterRowData(
  data,
  dateRange = { startDate: null, endDate: null },
) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter((el) => {
    // const zapis = Array.isArray(el.zapis) ? el.zapis : [];
    // const searchTextMatch = searchText
    //   ? zapis.filter((z) => z.t.includes(searchText)).length > 0
    //   : true;
    let dateMatch = true;

    if (dateRange.startDate || dateRange.endDate) {
      const elDate = new Date(el.start_time);
      const startDate = dateRange.startDate
        ? new Date(new Date(dateRange.startDate).setHours(0, 0, 0, 0))
        : new Date(-8640000000000000);
      const endDate = dateRange.endDate
        ? new Date(new Date(dateRange.endDate).setHours(23, 59, 59, 999))
        : new Date(8640000000000000);
      dateMatch = elDate >= startDate && elDate <= endDate;
    }

    return dateMatch;
  });
}

export { filterRowData };
