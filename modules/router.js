import express from "express";
const app = express();
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/signin", (req, res) => {
  res.render("signin", { url: "signin" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { url: null });
});

app.get("/profile/create", (req, res) => {
  res.render("profile-create", { url: "profile" });
});

app.get("/dashboard/welcome", (req, res) => {
  // Welcome
  res.render("welcome");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
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

app.post("/profile/create", (req, res) => {
  res.redirect("/dashboard/welcome");
});
app.post("/signup", (req, res) => {
  res.redirect("/profile/create");
});
export default app;
