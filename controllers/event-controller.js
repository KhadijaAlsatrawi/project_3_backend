const Event = require("../models/Event");
const Type = require("../models/Type");
const Category = require("../models/Category");


async function createOneEvent(req, res) {
    try {

        const newEvent = await Event.create({
            name: req.body.name,
            dateTime: req.body.dateTime,
            location: req.body.location,
            numberOfAttendees: req.body.numberOfAttendees,
            type: req.body.type,
            category: req.body.category,
            guests: req.body.guests,
            creator: req.user._id,

        })
        res.status(201).json(newEvent)


    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message })

        }



        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })

    }


}


async function getAllEvents(req, res) {
    try {

        const allEvents = await Event.find().populate('type').populate('category').populate('guests').populate('attendees')
        res.status(200).json(allEvents)


    } catch (err) {
        
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })

    }


}




async function getAllMyEvents(req, res) {
    try {

        const MyEvents = await Event.find({creator:req.user._id}).populate('type').populate('category').populate('guests').populate('attendees')
        res.status(200).json(MyEvents)


    } catch (err) {
        
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })

    }


}



async function getOneEvent(req, res) {
    try {

        const oneEvent = await Event.findById(req.params.eventId).populate('type').populate('category').populate('guests').populate('attendees')
        if (!oneEvent){
            res.status(403).json({message: 'Event Not found'})
        }
        res.status(200).json(oneEvent)


    } catch (err) {
        
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })

    }


}


async function updateOneEvent(req, res) {
    try {
        const oneEvent = await Event.findById(req.params.eventId).populate('type').populate('category').populate('guests').populate('attendees')
        if (!oneEvent){
            res.status(403).json({message: 'Event Not found'})
        }

        if(!oneEvent.creator.equals(req.user._id)){
            res.status(403).json({message: 'Cannot Update This Event'})
        }

        const updateEvent = await Event.findByIdAndUpdate(req.params.eventId, {
            name: req.body.name,
            dateTime: req.body.dateTime,
            location: req.body.location,
            numberOfAttendees: req.body.numberOfAttendees,
            type: req.body.type,
            category: req.body.category,
            guests: req.body.guests,
            creator: req.user._id,
        }, { new: true, runValidators: true })
        res.status(200).json(updateEvent)


    } catch (err) {
        console.log(err)

    }
}

async function deleteOneEvent(req, res) {
    try {
        const foundEvent = await Event.findById(req.params.eventId)
        if (!foundEvent) {
            return res.status(404).json({ message: 'Event Not Found' })

        }

        if (!foundEvent.creator.equals(req.user._id)) {
            return res.status(403).json({ message: 'Cannot Delete This Event' })

        }

        await Event.findByIdAndDelete(req.params.eventId)
        res.status(204).send()


    } catch (err) {
        console.log(err)

    }
}