import moment from 'moment'
import 'moment/locale/nb'
// moment.locale('nb')

export const getDate = date => {
  return moment(date).fromNow()
}

export const postDateFormat = date => {
  const now = new moment()
  const then = new moment(date)
  const duration = moment.duration(now.diff(then))

  // Return date format if it's more than 5 days ago
  if (duration.as('hours') / 24 > 5) {
    return moment(date).format('DD. MMMM YYYY')
  } else {
    // Returns dager/minutter/sekunder siden
    return then.fromNow()
  }
}
