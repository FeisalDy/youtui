/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const BooksController = () => import('#controllers/books_controller')
const EnBooksController = () => import('#controllers/en_books_controller')
const CommentsController = () => import('#controllers/comments_controller')
const TuisController = () => import('#controllers/tuis_controller')
const PixivsController = () => import('#controllers/pixivs_controller')

router.on('/').render('pages/home')
router
  .group(() => {
    router
      .group(() => {
        router.get(`list`, [BooksController, 'index'])
        router.get(`:id`, [BooksController, 'show'])
        router.get('/search/:name', [BooksController, 'search'])
      })
      .prefix('books')
    router
      .group(() => {
        router.get(`list/:page?`, [EnBooksController, 'index'])
        router.get(`:id`, [EnBooksController, 'show'])
        router.get('/search/:name', [EnBooksController, 'search'])
        router.get('/des-search/:description', [EnBooksController, 'des_search'])
      })
      .prefix('en-books')
    router
      .group(() => {
        router.get(`:id`, [CommentsController, 'index'])
      })
      .prefix('comments')
    router
      .group(() => {
        router.get(`/list`, [CommentsController, 'en_list'])
        router.get(`:id`, [CommentsController, 'en_index'])
        router.get('/search/:message', [CommentsController, 'show'])
      })
      .prefix('en-comments')
    router
      .group(() => {
        router.post('scrape-comments', [TuisController, 'scrape_comments'])
        router.get('booklist/book/', [TuisController, 'book_with_booklist'])
        router.get('booklist/:id', [TuisController, 'show_booklist'])
        router.get('booklist', [TuisController, 'index_booklist'])
        router.post('scrape', [TuisController, 'scrape_booklist'])
        router.get('tags', [TuisController, 'tag_search'])
        router.get('list', [TuisController, 'index'])
        router.get(':uniquebook', [TuisController, 'show'])
      })
      .prefix('tuis')
    router
      .group(() => {
        router.get('/', [PixivsController, 'index'])
      })
      .prefix('pixiv')
  })
  .prefix('api')
