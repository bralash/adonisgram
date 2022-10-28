import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';

export default class HomeController {
    public async index(ctx: HttpContextContract) {
        const posts = await Post.query().preload('user');
        return ctx.view.render("welcome", { title: "Welcome to AdonisGram", posts});
      }
}
