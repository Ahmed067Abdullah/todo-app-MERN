const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodosSchema = new Schema({
    text : String
});

const Todo = mongoose.model('todos',TodosSchema);

module.exports = Todo;
