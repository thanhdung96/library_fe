import BookService from '../services/book'
import makeCrudModule from './crud'

export default makeCrudModule({
  service: BookService,
})
