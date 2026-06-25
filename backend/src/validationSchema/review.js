const z = require('zod');

// Validation Schema for adding review to a product
exports.addReviewSchema = z
  .object({
    rating: z.coerce.number().min(0).max(5),
    comment: z.string().min(2),
  })
  .refine(inputObj => Object.keys(inputObj).length > 0);