import express from 'express';
import authenticationToken from "../middleware/authenticationToken.js"; // import the authenticationToken middleware to protect the goals entry routes
import {generateManifestation,getManifestations,deleteManifestation,createManifestation } from "../controllers/manifestation.mjs"

const router = express.Router()

// ** Get all manifestations route
router.get('/',authenticationToken,getManifestations);
// ** Generate manifestation route
router.post('/generate-manifestation',authenticationToken,generateManifestation);
// ** POST manifestation route
router.post('/new-manifestation',authenticationToken, createManifestation);

// ** DELETE manifestation route
router.delete('/:id',authenticationToken,deleteManifestation);

export default router
