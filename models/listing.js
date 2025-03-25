const mongoose = require('mongoose');
const { Schema } = mongoose;
const review = require('./review.js');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1741091475787-8cf779895451?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        set: (v) => v===""? "https://images.unsplash.com/photo-1741091475787-8cf779895451?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
         {
             type: Schema.Types.ObjectId,
             ref: "Review",
         }
     ] 
})

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await review.deleteMany({_id: {$in: listing.reviews}});         
    }
})

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;

