"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serve_static_1 = __importDefault(require("serve-static"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookModule_1 = __importDefault(require("./models/bookModule"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const uri = "mongodb://localhost:27017/books";
mongoose_1.default.connect(uri, { useNewUrlParser: true }, (err) => {
    if (err)
        console.log("error");
    else
        console.log("connected to database successfully");
});
//Midlewares
app.use(serve_static_1.default("public"));
app.use(body_parser_1.default.json());
//routes
app.get("/", (req, resp) => {
    resp.send("helloo ");
});
//get All books from db (mongodb)
app.get("/books", (req, resp) => {
    bookModule_1.default.find((error, books) => {
        if (error)
            resp.status(500).send(error);
        else
            resp.send(books);
    });
});
//get All books from db using pagination
app.get("/pbooks", (req, resp) => {
    const p = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    bookModule_1.default.paginate({}, { page: p, limit: size }, (error, result) => {
        if (error)
            resp.status(500).send(error);
        else
            resp.send(result);
    });
});
//get All books from db using pagination
app.get("/books-search", (req, resp) => {
    const p = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const kw = req.query.kw || "";
    bookModule_1.default.paginate({ title: { $regex: ".*(?i)" + kw + ".*" } }, { page: p, limit: size }, (error, result) => {
        if (error)
            resp.status(500).send(error);
        else
            resp.send(result);
    });
});
//get one book by id
app.get("/books/:id", (req, resp) => {
    const id = req.params.id;
    bookModule_1.default.findById(id, (error, book) => {
        if (error)
            resp.status(500).send(error);
        else
            resp.send(book);
    });
});
//add book 
app.post("/books", (req, resp) => {
    let book = new bookModule_1.default(req.body);
    book.save((error) => {
        if (error)
            resp.status(500).send(error);
        else
            resp.send(book);
    });
});
//update book
app.put("/books/:id", (req, resp) => {
    bookModule_1.default.findByIdAndUpdate(req.params.id, req.body, (error) => {
        if (error)
            resp.status(500).send(error);
        else
            resp.send("update successfuly");
    });
});
//delete book
app.delete("/books/:id", (req, resp) => {
    bookModule_1.default.findByIdAndDelete(req.params.id, (error) => {
        if (error)
            resp.status(500).send(error);
        else
            resp.send("deleted successfuly");
    });
});
//server listning 
app.listen(8080, () => {
    console.log("server running");
});
