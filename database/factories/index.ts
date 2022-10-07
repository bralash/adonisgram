import Factory from "@ioc:Adonis/Lucid/Factory";
import Post from "App/Models/Post";
import User from "App/Models/User";
import { DateTime } from "luxon";

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    bio: faker.lorem.sentences(),
    email_verified_at: DateTime.local(),
    avatar: faker.image.avatar(),
  };
})
  .relation("posts", () => PostFactory)
  .build();

export const PostFactory = Factory.define(Post, ({ faker }) => {
  return {
    image: faker.image.animals(),
    caption: faker.lorem.paragraph(),
  };
})
  .relation("user", () => UserFactory)
  .build();
