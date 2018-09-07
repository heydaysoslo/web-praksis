import * as moment from 'moment'
import 'moment/locale/nb'

export function getDate(date) {
  return moment(date).fromNow()
}
