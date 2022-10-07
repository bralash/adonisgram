import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { DateTime } from "luxon";
import User from "App/Models/User";

export default class EmailsController {
  public async verifyEmail({ auth, response }: HttpContextContract) {
    auth.user?.sendVerificationEmail();
    return response.redirect().back();
  }

  public async confirmEmail({
    request,
    response,
    params,
  }: HttpContextContract) {
    const user = await User.findByOrFail("email", params.email);
    if (request.hasValidSignature()) {
      user.email_verified_at = DateTime.local();
      user.save();
      return response.redirect(`/${user.username}`);
    }
    return "Invalid Token";
  }
}
