const mongoose = require('mongoose');

// Define your existing schema with auction_history as an array of objects
const itemschema = mongoose.Schema({
    name: String,
    person: String,
    pid: String,
    url: String,
    base_price: Number,
    current_bidder: String,
    current_bidder_id: String,
    current_price: String,
    type: String,
    class: String, 
    auction_active: Boolean,
    visited_users: [{ id: String, email: String }],
    auction_history: [{
        bidder: String,
        price: String
    }]
});

// Connect to your MongoDB instance
mongoose.connect("mongodb://127.0.0.1:27017/project");

// Define your model
const Item = mongoose.model('Item', itemschema);

// Define an async function to update the documents
async function updateDocuments() {
    try {
        // Update all existing documents to add the auction_history field as an empty array
        const result = await Item.updateMany({}, { $set: { auction_history: [] } });
        console.log('Successfully added auction_history field to existing documents.');
        console.log('Number of documents updated:', result.nModified);
    } catch (error) {
        console.error('Error updating documents:', error);
    }
}

// Call the async function to update the documents
updateDocuments();
