const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookcontroller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', authMiddleware, addBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
