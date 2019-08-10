import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

let bookShema = new  mongoose.Schema({
    title: {type : String, required: true},
    author: {type: String, required: true},
    price: {type: Number, required: true},
    publishedDate: {type: Date, required: true, default: new Date()},
    avaible: {type: Boolean, required: true, default: true},
    quantity: {type: Number, required: true, default: 0}
});

bookShema.plugin(mongoosePaginate);

const Book = mongoose.model("book",bookShema);

export default Book;