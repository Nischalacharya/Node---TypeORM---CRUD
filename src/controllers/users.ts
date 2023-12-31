// 

import { Any, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/user'; // Assuming the entity class is named User

import * as dotenv from 'dotenv';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const SECRET_KEY = process.env.SECRET_OR_KEY;

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userRepository = getRepository(User);
  const existingUser = await userRepository.findOne({
    email
  });

  if (existingUser) {
    return res.status(400).send({
      message: 'Email already taken'
    });
  } else {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword
    });

    await userRepository.save(newUser);

    return res.send({ message: 'User created' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    email
  });

  if (!user) {
    return res.status(400).send({ message: 'Invalid email or password' });
  } else {
    const isSuccess = await bcrypt.compare(password, user.password);

    if (isSuccess) {
      const payload = {
        id: user.id,
        name: user.name
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
      return res.status(200).send({ token });
    } else {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
  }
};
