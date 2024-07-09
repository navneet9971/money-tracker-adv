const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    datetime: {type: String, required: true},
    debit: {type: Number, required: true},
    credit: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true}  // ref is used to link this schema to another schema. Here, it is linked to the Auth schema.  // required: true ensures that the userId field is always present in the Transaction document.  // type: mongoose.Schema.Types.ObjectId ensures that
});

const TransactionModel = model('Transaction', TransactionSchema);

module.exports = TransactionModel;