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
       url:String,
       filename:String,
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
     ] ,
    owner:{
        type: Schema.Types.ObjectId,
        ref: "user"
    } 
})

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await review.deleteMany({_id: {$in: listing.reviews}});         
    }
})

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;

