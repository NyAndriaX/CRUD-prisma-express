import express, { Application } from "express";
import morgan from "morgan";
import { destroyProduct, getProductByID, getProducts, patchProduct, postProduct } from "@product/product.controller";

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.post("/api/products", postProduct); 
app.get("/api/products", getProducts);
app.get("/api/products/:id", getProductByID);
app.patch("/api/products/:id", patchProduct);
app.delete("/api/products/:id", destroyProduct);

app.listen(port);