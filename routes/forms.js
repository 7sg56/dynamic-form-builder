const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Response = require('../models/Response');

router.post('/create', (req, res) => {
    const formId = uuidv4();
    res.json({ formId });
});

router.post('/submit', async (req, res) => {
    try {
        const { formId, formTitle, responses } = req.body;
        
        const newResponse = new Response({
            formId,
            formTitle,
            responses
        });
        
        await newResponse.save();
        res.status(201).json({ 
            success: true, 
            message: "Responses saved successfully",
            responseId: newResponse._id,
            formId 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error saving responses" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existingResponses = await Response.findOne({ formId: id });
        
        if (existingResponses) {
            res.render('form', { formId: id, formTitle: existingResponses.formTitle });
        } else {
            res.render('form', { formId: id, formTitle: null });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving form");
    }
});

router.get('/:id/responses', async (req, res) => {
    try {
        const { id } = req.params;
        const responses = await Response.find({ formId: id }).sort({ createdAt: -1 });
        
        if (responses.length > 0) {
            res.render('responses', { 
                formId: id, 
                formTitle: responses[0].formTitle,
                responses 
            });
        } else {
            res.render('responses', { 
                formId: id, 
                formTitle: "Unknown Form",
                responses: [] 
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving responses");
    }
});

router.get('/:id/thanks', (req, res) => {
    const { id } = req.params;
    res.render('thanks', { formId: id });
});

module.exports = router;