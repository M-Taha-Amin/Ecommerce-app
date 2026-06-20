const z = require('zod');
const { PRODUCTS_PER_PAGE } = require('../constants/index');

// Validation Schema for URL Query Params for Get All Products Route
// e.g: /api/v1/products?name=mobile&price_lte=20000
exports.queryParamSchema = z.object({
  name: z.string().optional(),
  price_gte: z.coerce.number().optional(),
  price_lte: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
  skip: z.coerce.number().default(0),
  limit: z.coerce.number().default(PRODUCTS_PER_PAGE),
});

// Validation Schema for creating new product
exports.createSchema = z.object({
  name: z.string().trim(),
  description: z.string(),
  price: z.coerce.number(),
  category: z.string(),
  images: z.array().optional(),
  stock: z.coerce.number().optional(),
});

// Validation Schema for updating a product
exports.updateSchema = z
  .object({
    name: z.string().trim().optional(),
    description: z.string().optional(),
    price: z.coerce.number().min(0).optional(),
    category: z.string().optional(),
    images: z
      .array(
        z.object({
          public_id: z.string(),
          url: z.url(),
        }),
      )
      .optional(),
    stock: z.coerce.number().min(0).optional(),
  })
  // ensures that the update DTO contains at least one value
  .refine(inputObj => Object.keys(inputObj).length > 0);
