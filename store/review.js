import ReviewService from '../services/review'
import makeCrudModule from './crud'

export default makeCrudModule({
  service: ReviewService,
})
