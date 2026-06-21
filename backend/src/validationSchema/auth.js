const z = require('zod');

exports.registerUserSchema = z.object({
  name: z.string().min(4).max(30),
  email: z.email(),
  password: z.string().min(8),
  avatar: z
    .object({
      public_id: z.string(),
      url: z.url(),
    })
    .optional(),
});

exports.loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
