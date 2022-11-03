import Application from "@ioc:Adonis/Core/Application";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class PostsController {
  public async create(ctx: HttpContextContract) {
    return ctx.view.render("posts/create", { title: "New Post" });
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        image: schema.file({ size: "2mb", extnames: ["jpg", "png", "jpeg"] }),
        caption: schema.string({}, [rules.minLength(3)]),
      }),
      messages: {
        "caption.required": "Caption is required",
        "image.required": "Image is required",
      },
    });

    const user = auth.user;
    const image = req.image;

    const imageName = new Date().getTime().toString() + `.${image.extname}`;
    await image.move(Application.publicPath("images"), {
      name: imageName,
    });
    const post = new Post();
    post.image = `images/${imageName}`;
    post.caption = req.caption;
    post.userId = user!.id;

    await post.save();
    return response.redirect(`/${user?.username}`);
  }
}
