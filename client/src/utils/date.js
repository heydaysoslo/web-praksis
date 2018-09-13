import moment from 'moment'
import 'moment/locale/nb'
// moment.locale('nb')

export const getDate = date => {
  return moment(date).fromNow()
}

export const postDateFormat = date => {
  return moment(date).format('DD. MMMM YYYY')
}
