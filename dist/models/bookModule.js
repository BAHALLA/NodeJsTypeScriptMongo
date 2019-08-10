"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let bookShema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    publishedDate: { type: Date, required: true, default: new Date() },
    avaible: { type: Boolean, required: true, default: true },
    quantity: { type: Number, required: true, default: 0 }
});
bookShema.plugin(mongoose_paginate_1.default);
const Book = mongoose_1.default.model("book", bookShema);
exports.default = Book;
