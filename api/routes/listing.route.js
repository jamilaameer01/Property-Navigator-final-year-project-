import express from 'express'
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  addFavouriteProperty,
  removeFavouriteProperty,
  getFavourite,
  getAllFavourites
} from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.post('/update/:id', verifyToken, updateListing)
router.get('/get/:id', getListing)
router.get('/get', getListings)
router.post('/add', verifyToken, addFavouriteProperty)
router.post('/remove', verifyToken, removeFavouriteProperty)
router.get('/getfavourite/:id', verifyToken, getFavourite)
router.get('/getallfavourites/:id', verifyToken, getAllFavourites)

export default router
