const express = require('express');
const router = express.Router();
const { 
    getFavsItems, 
    addToFavs, 
    removeFavsItem 
} = require('../controllers/favController');

// GET   /api/favs          → obtener favoritos
// POST  /api/favs          → agregar a favoritos
// DELETE /api/favs/:id_favorito → eliminar favorito
router.get('/', getFavsItems);
router.post('/', addToFavs);
router.delete('/', removeFavsItem);

module.exports = router;