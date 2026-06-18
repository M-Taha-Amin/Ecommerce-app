class ProductController {
  constructor(productService) {
    this.productService = productService;
  }
  getAllProducts(req, res, next) {
    return res.json({ message: 'Product Route works' });
  }
}

module.exports = ProductController;
