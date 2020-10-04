'use strict'

import express from 'express'
const router = express.Router()


router.get('/',(req,res)=>{
    res.send('berhasil').status(200)
})

export default router