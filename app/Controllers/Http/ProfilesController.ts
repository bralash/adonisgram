import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class ProfilesController {
  public async index({ view, params }: HttpContextContract) {
    const user = await User.findBy("username", params.username);
    if (!user) {
      return view.render("errors/not-found", { title: "404 - Page not found" });
    }
    return view.render("profile", { title: `${user.name} - Profile` });
  }

  public async edit({ view }: HttpContextContract) {
    return view.render("accounts/edit");
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const user = auth.user;
    const avatar = request.file("avatar");
    if (avatar) {
      const imageName = new Date().getTime().toString() + `.${avatar.extname}`;
      await avatar.move(Application.publicPath("images"), {
        name: imageName,
      });
      user.avatar = `images/${imageName}`;
    }

    user.bio = request.input("bio");
    await user?.save();
    return response.redirect(`/${user?.username}`);
  }
}
