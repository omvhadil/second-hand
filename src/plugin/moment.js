import Moment from "moment";

export function formatDate(val) {
  if (!val) {
    return "-";
  }
  return Moment(val).format("DD MMM YYYY");
  // return Moment(val).format("DD MMM YYYY HH:mm");
}
