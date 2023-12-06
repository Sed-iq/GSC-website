import express from "express";
import bcrypt from "bcryptjs";
import { User } from "./schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

var cookieopts = {
  maxAge: 3600000,
  httpOnly: true,
  sameSite: "lax",
};

const app = express();
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.get(
  "/signin",
  (req, res, next) => {
    const { user } = req.cookies;
    if (user) res.redirect("/dashboard");
    else next();
  },
  (req, res) => {
    res.render("signin", { url: "signin", error: req.flash("error") });
  }
);
app.get(
  "/signup",
  (req, res, next) => {
    const { user } = req.cookies;
    if (user) res.redirect("/dashboard");
    else next();
  },
  (req, res) => {
    res.render("signup", { url: null, error: req.flash("error") });
  }
);

app.get(
  "/profile/create",
  (req, res, next) => {
    const { user, temp } = req.cookies;
    if (temp) next();
    else {
      if (user) res.redirect("/dashboard");
      else {
        res.redirect("/signin");
      }
    }
  },
  (req, res) => {
    const { temp } = req.cookies;
    if (temp) {
      res.render("profile-create", { url: "profile", temp });
    } else {
      req.flash("error", "You need to login");
      res.redirect("/signin");
    }
  }
);

app.get(
  "/dashboard",
  (req, res, next) => {
    const { user } = req.cookies;
    if (user) {
      jwt.verify(user, process.env.SECRET, (err, decoded) => {
        if (err) res.redirect("/signin");
        else {
          req.user = decoded.id;
          next();
        }
      });
    } else res.redirect("/signin");
  },
  async (req, res) => {
    const data = await User.findById(req.user);
    res.render("dashboard", { data });
  }
);

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      req.flash("error", "Fill in the correct fields");
      throw "";
    } else {
      User.findOne({ email })
        .then(async (data) => {
          if (!data) {
            req.flash("error", "Incorrect email or password");
            throw "";
          } else {
            const $password = data.password;
            if (!password) throw "";
            else {
              bcrypt
                .compare(password, $password)
                .then((result) => {
                  if (result === true) {
                    const token = jwt.sign(
                      { id: data._id },
                      process.env.SECRET,
                      {
                        expiresIn: "10hrs",
                      }
                    );
                    res.cookie("user", token).redirect("/dashboard");
                  } else throw "";
                })
                .catch((err) => {
                  req.flash("error", "Incorrect email and password");
                  res.redirect("/signin");
                });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/signin");
        });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/signin");
  }
});

app.post("/profile/create", (req, res) => {
  const { name, username, country, date } = req.body;
  if (!name || !username || !country || !date) {
    req.redirect("/profile/create");
  } else {
    const user = new User({
      fullname: name,
      username: username,
      country: country,
      DOB: date,
      email: req.cookies.temp.email,
      password: req.cookies.temp.password,
    });
    user
      .save()
      .then((data) => {
        const token = jwt.sign({ id: data._id }, process.env.SECRET, {
          expiresIn: "10hrs",
        });
        res.cookie("user", token);
        res.redirect("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/profile/create");
      });
  }
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "There is an error");
    res.redirect("/signup");
  } else {
    User.findOne({ email })
      .then(async (data) => {
        if (data) {
          req.flash("error", "User already exists");
          throw "User already exists";
        } else {
          const $password = await bcrypt.hash(password, 10);
          res.cookie("temp", { email, password: $password }, cookieopts);
          res.redirect("/profile/create");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).redirect("/signup");
      });
  }
});

app.use(verify);
app.post("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/signin");
});
app.get("/subscription", (req, res) => {
  const { plan } = req.query;
  res.render("subscription", { plan });
});

app.get("/subscription/payment", (req, res) => {
  res.render("subs-payment");
});
app.get("/subscription/checkout", (req, res) => {
  res.render("sub-checkout");
});
app.get("/subscription/:type", (req, res) => {
  const { type } = req.params;
  const { billType } = req.query;
  // console.log(type);
  if (type == "gold" || type == "silver" || type == "platinum") {
    res.render("sub-confirm", { type, billType });
  } else {
    res.redirect("/subscription");
  }
});

app.get("/dashboard/events", (req, res) => {
  res.render("events");
});
app.get("/dashboard/pay", (req, res) => {
  res.render("event-pay");
});
app.get("/dashboard/pay/details", (req, res) => {
  res.render("event-confirm");
});
app.get("/dashboard/events/event1", (req, res) => {
  // individual events
  res.render("event");
});

export default app;
function verify(req, res, next) {
  const { user } = req.cookies;
  if (user) next();
  else res.redirect("/signin");
}
