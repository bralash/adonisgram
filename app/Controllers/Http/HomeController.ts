import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class HomeController {
  public async index({ view, auth,response }: HttpContextContract) {
    if(!auth.isAuthenticated) {
      return response.redirect('/login')
    }
    await auth.user?.preload("followings");
    const followings = auth.user?.followings.map((f) => f.followingId);
    const userIds = [auth.user?.id, ...(followings ?? [])];
  
    const posts = await Post.query()
      .whereIn("user_id", userIds)
      .preload("user").orderBy('created_at','desc')
      // return followings
    return view.render("welcome", { title: "Welcome to AdonisGram", posts });
  }
}
