import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required(),
  dob: Joi.date().required(),
  photoUrl: Joi.string().required(),
});
