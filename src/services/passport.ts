import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { getRepository } from 'typeorm';
import { user } from '../entity/user';

const SECRET_KEY = process.env.SECRET_OR_KEY;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

passport.use(
  'jwt-authentication',
  new Strategy(options, async (payload, done) => {
    const userRepository = getRepository(user);
    const user = await userRepository.findOne({
      id: payload.id
    });

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
);
