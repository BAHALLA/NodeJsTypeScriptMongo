import express, { Response } from 'express';
import serveStatic from 'serve-static';
import mongoose from 'mongoose';
import { Request } from 'express';
import Book from './models/bookModule';
import bodyParser from 'body-parser';

const app = express();

const uri= "mongodb://localhost:27017/books";
mongoose.connect(uri, { useNewUrlParser: true }, (err)=> {

    if(err) console.log("error");
    else console.log("connected to database successfully");
});

//Midlewares
app.use(serveStatic("public"));
app.use(bodyParser.json());


//routes
app.get("/", (req, resp) => {
    resp.send("helloo ");
});

//get All books from db (mongodb)
app.get("/books", (req: Request, resp: Response) => {

    Book.find((error, books) => {
        if(error) resp.status(500).send(error);
        else resp.send(books);
    });
});

//get All books from db using pagination
app.get("/pbooks", (req: Request, resp: Response) => {

    const p = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    Book.paginate({}, {page: p, limit: size}, (error, result) => {
        if(error) resp.status(500).send(error);
        else resp.send(result);
    })
});
//get All books from db using pagination
app.get("/books-search", (req: Request, resp: Response) => {

    const p = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const kw = req.query.kw || "";
    Book.paginate({title :{$regex: ".*(?i)"+kw+".*"} }, {page: p, limit: size}, (error, result) => {
        if(error) resp.status(500).send(error);
        else resp.send(result);
    })
});

//get one book by id
app.get("/books/:id", (req: Request, resp: Response) => {

    const id = req.params.id;
    Book.findById(id, (error, book) => {
        if(error) resp.status(500).send(error);
        else resp.send(book);
    });
});

//add book 
app.post("/books", (req: Request, resp: Response) => {

    let book = new Book(req.body);
    book.save((error) => {

        if(error) resp.status(500).send(error);
        else resp.send(book);

    });
});
//update book
app.put("/books/:id", (req: Request, resp: Response) => {

    Book.findByIdAndUpdate(req.params.id,req.body, (error) => {
        if(error) resp.status(500).send(error);
        else resp.send("update successfuly");
    })
});

//delete book
app.delete("/books/:id", (req: Request, resp: Response) => {

    Book.findByIdAndDelete(req.params.id, (error) => {
        if(error) resp.status(500).send(error);
        else resp.send("deleted successfuly");
    })
});

//server listning 
app.listen(8080, () => {
    console.log("server running");
});