const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, "[]");
    }
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }

  addProduct(product) {
    const id =
      this.products.length > 0
        ? Math.max(...this.products.map((p) => p.id)) + 1
        : 1;
    this.products.push({ ...product, id });
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return console.log("success");
  }

  updateProduct(id, fields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index != -1) {
      this.products[index] = { ...this.products[index], ...fields };
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("success");
    } else {
      console.log("id not defined");
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((p) => p.id === id);
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    } else {
      console.log("id not defined");
    }
  }
}

const product = new ProductManager("./products.json");

// product.addProduct({
//   title: "a",
//   description: "b",
//   price: 200,
//   thumbnail: "./img.jpg",
//   code: 1234,
//   stock: 9,
// });

// // product.deleteProduct(1);

// product.updateProduct(7, { stock: 5 });

// console.log(product.getProducts());
