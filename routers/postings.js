const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express');

const router = express.Router();

router.get('/postings',async(req, res)=>{
    const postings = await prisma.$queryRaw`
    SELECT 
        id,
        user_id,
        contents,
        DateInserted,
        postingType,
        likes
    FROM postings;
    `
    res.json({ data: postings });
});


router.get('/postings/:id',async(req, res)=>{
    const {id} = req.params;
    const [posting] = await prisma.$queryRaw`
    SELECT 
        id,
        user_id,
        contents,
        DateInserted,
        postingType,
        likes
    FROM postings
    WHERE id = ${id};
    `
    res.json({ data: posting }); 
});

router.post('/postings',async(req, res)=>{
    const { userId, contents, postingType ,likes} = req.body;
    
    await prisma.$queryRaw`
    INSERT INTO
        postings(user_id, contents, postingType,likes)
    VALUES 
        (${userId}, ${contents},${postingType},${likes});
    `
    res.status(201).json({ message: 'SUCCESS'});
    
});


router.put('/postings/:id',async(req, res)=>{
    const {id} = req.params;
    const { userId, contents} = req.body

    await prisma.$queryRaw`
    UPDATE
        postings
    SET
        user_id = ${userId},
        contents = ${contents}
    WHERE
        id = ${id}
    `;
    res.json({message: 'SUCCESS'});
});
router.delete('/postings/:id',async(req, res)=>{
    const {id} = req.params;
    await prisma.$queryRaw`
    DELETE     
    FROM postings
    WHERE id = ${id};
    `
    res.json({message: 'SUCCESS'});
});


module.exports = router;

