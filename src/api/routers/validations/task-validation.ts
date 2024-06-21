import Joi from "joi";
// This would probably need to be a custom validation the same way the Status type should be flexible
const validStatus = ["TODO", "IN PROGRESS", "DONE", "ARCHIVED"];

export const createTaskValidation = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid(...validStatus),
  }),
};

export const jsonPatchSchema = {
  body: Joi.array()
    .items(
      Joi.object({
        op: Joi.string()
          .valid("add", "remove", "replace", "move", "copy", "test")
          .required(),
        path: Joi.string()
          .valid("/title", "/description", "/status")
          .required(),

        value: Joi.when("path", {
          is: "/status",
          then: Joi.string()
            .valid(...validStatus)
            .required(),
        }), // Include if applicable to the operation
        from: Joi.string().when("op", {
          is: "move",
          then: Joi.string().required(),
        }),
      }).required()
    )
    .min(1)
    .required(),
};
