const Guest = require('../models/Guest')

async function createOneGuest(req, res) {
    try {
        const { fullName, email, phoneNumber, profileImage } = req.body
        const createdGuest = await Guest.create({ fullName, email, phoneNumber, profileImage, creator: req.user._id })

        res.status(201).json(createdGuest)
    } catch (err) {
        console.log(err);
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function getAllGuest(req, res) {
    try {
        const allGuests = await Guest.find({ creator: req.user._id })
        res.status(200).json(allGuests)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

async function getOneGuest(req, res) {
    try {
        const foundGuest = await Guest.findById(req.params.guestId)

        if (!foundGuest) {
            return res.status(404).json({ message: 'Guest Not Found' })
        }

        res.status(200).json(foundGuest)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

async function updateOneGuest(req, res) {
    try {
        const foundGuest = await Guest.findById(req.params.guestId)

        if (!foundGuest) {
            return res.status(404).json({ message: 'Guest Not Found' })
        }

        if(!foundGuest.creator.equals(req.user._id)){
            return res.status(403).json({ message: 'Cannot Update This Guest' })
        }

        const { fullName, email, phoneNumber, profileImage } = req.body
        const updatedGuest = await Guest.findByIdAndUpdate(req.params.guestId, { fullName, email, phoneNumber, profileImage })

        res.status(200).json(updatedGuest)
    } catch (err) {
        console.log(err);
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function deleteOneGuest(req, res) {
    try {
        const foundGuest = await Guest.findById(req.params.guestId)

        if (!foundGuest) {
            return res.status(404).json({ message: 'Guest Not Found' })
        }

        if(!foundGuest.creator.equals(req.user._id)){
            return res.status(403).json({ message: 'Cannot Delete This Guest' })
        }

        await Guest.findByIdAndDelete(req.params.guestId)
        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    createOneGuest,
    getAllGuest,
    getOneGuest,
    updateOneGuest,
    deleteOneGuest
}