import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Following from "App/Models/Following";

export default class FollowsController {
  public async store({ params, response, auth }: HttpContextContract) {
    const follow = new Following
    follow.followingId = params.userId
    follow.userId = auth.user.id
    await follow.save()
    return response.redirect().back();
  }
}
