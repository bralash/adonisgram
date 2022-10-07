import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class AuthController {
  public async index(ctx: HttpContextContract) {
    return ctx.view.render("welcome", { title: "Welcome to AdonisGram" });
  }

  public async showSignup(ctx: HttpContextContract) {
    return ctx.view.render("auth/signup", { title: "Sign Up" });
  }

  public async showLogin(ctx: HttpContextContract) {
    return ctx.view.render("auth/login", { title: "Login" });
  }

  public async showProfile(ctx: HttpContextContract) {
    return ctx.view.render("profile", { title: "Profile" });
  }

  public async signup({ request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.confirmed()]),
        username: schema.string({}, [rules.maxLength(25), rules.minLength(3)]),
      }),
      messages: {
        "name.required": "Name is required to sign up",
        "email.required": "Email is required to sign up",
        "password.required": "Password is required to sign up",
        "username.required": "Username is required to sign up",
      },
    });

    const user = new User();
    user.name = req.name;
    user.email = req.email;
    user.password = req.password;
    user.username = req.username;
    await user.save();

    user.sendVerificationEmail();

    return response.redirect("/login");
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const rememberMe =
      (await request.input("remember-me")) === "on" ? true : false;
    const req = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}),
      }),
      messages: {
        "email.required": "Email cannot be empty",
        "password.required": "Password cannot be empty",
        "password.minLength": "Password must be at least 8 characters long",
      },
    });

    const user = await auth.attempt(req.email, req.password, rememberMe);
    return response.redirect(`/${user.username}`);
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect("/");
  }
}
