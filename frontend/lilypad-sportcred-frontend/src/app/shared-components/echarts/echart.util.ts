import { ACSHistory } from 'src/app/zone/subpages/profile/profile.types';
import { FormatedChartData } from './echart.types';
/**
 * this function takes in raw acs history data from the api call
 * fills in all holes where there is no date
 * returns a list of aligned dates and a list of aligned data points
 */
export function alignHistoryToFormat(history: ACSHistory[]): FormatedChartData {
  if (history.length === 0)
    return {
      dates: [],
      data: [],
    };

  let dates = datesTillToday(history[0]?.date ?? '');

  let data = new Array(dates.length);
  let rawIndex = 0;
  let propagatingPoint = 0;
  for (let i = 0; i < dates.length; i++) {
    if (rawIndex < history.length && dates[i] === history[rawIndex].date) {
      propagatingPoint = history[rawIndex].score;
      rawIndex++;
    }
    data[i] = propagatingPoint;
  }
  return {
    dates,
    data,
  };
}

/**
 * returns a list of dates from startDate to today, incrementing by 1 day
 * datesTillToday('2019-01-01')
 * => [2019-01-01, 2019-01-02, ... , 2020-...]
 *
 * @param startDate starting day to start the list
 */
function datesTillToday(startDate) {
  let dateArray = new Array();
  let currentDate = startDate;
  let today = new Date().toISOString();

  while (currentDate <= today) {
    dateArray.push(currentDate.slice(0, 10));
    let newDate = new Date(currentDate.valueOf());
    newDate.setDate(newDate.getDate() + 1);
    currentDate = newDate.toISOString();
  }
  return dateArray;
}
