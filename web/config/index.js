
import get from 'lodash.get'
import values from './values'
export default function getConfig(path) {
  return get(values, path)
}
