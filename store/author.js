import AuthorService from '../services/author'
import makeCrudModule from './crud'

export default makeCrudModule({
  service: AuthorService,
})
