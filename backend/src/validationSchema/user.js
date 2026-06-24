const z = require('zod');

exports.queryParamSchema = z.object({
  excludeSelf: z
    .enum(['true', 'false'])
    .transform(val => val === 'true')
    .optional(),
});

exports.updatePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

exports.updateProfileSchema = z
  .object({
    name: z.string().min(4).max(30).optional(),
    email: z.email().optional(),
    avatar: z
      .object({
        public_id: z.string(),
        url: z.url(),
      })
      .optional(),
  })
  // ensures that the update DTO contains at least one value
  .refine(inputObj => Object.keys(inputObj).length > 0);

exports.updateRoleSchema = z.object({
  role: z.enum(['admin', 'user']),
});
