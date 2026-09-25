const express = require("express");

const Message = require("../models/Message");

const router = express.Router();


router.post("/", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        if (!name || !email || !message) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const newMessage = new Message({
            name,
            email,
            message
        });

        const savedMessage = await newMessage.save();

        res.status(201).json({
            message: "Message saved successfully",
            data: savedMessage
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to save message"
        });

    }
});


router.get("/", async (req, res) => {

    try {

        const messages = await Message.find()
            .sort({ createdAt: -1 });

        res.json(messages);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch messages"
        });

    }
});


module.exports = router;