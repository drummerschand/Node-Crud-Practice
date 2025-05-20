const request = require("supertest");
const chai = require("chai");
chai.should();
const app = require("../app");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");

const TEST_USER_ID = "111";
let token; // will assign inside before()

before(async function () {
  this.timeout(10000);

  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/nodecrudapp");

  // Ensure JWT_SECRET is available
  const JWT_secret = process.env.JWT_SECRET;
  if (!JWT_secret) throw new Error("JWT_SECRET not defined");

  token = jwt.sign({ user_id: TEST_USER_ID }, JWT_secret, { expiresIn: "1h" });
});

describe("GET /api/users/", () => {
  it("should return all users when no user_id is passed", async function () {
    const res = await request(app)
      .get("/api/users/")
      .set("Authorization", `Bearer ${token}`);
    
    res.status.should.equal(200);
    res.body.should.be.an("array");
  });

  it("should return a single user when user_id is passed as query", async function () {
    const res = await request(app)
      .get(`/api/users/?user_id=${TEST_USER_ID}`)
      .set("Authorization", `Bearer ${token}`);

    res.status.should.equal(200);
    console.log("Body →", res.body);
    res.body.should.be.an("object").that.has.all.keys("user_id", "name", "email");
  });

  it("should return 401 if token is missing", async function () {
    const res = await request(app).get("/api/users/");
    res.status.should.equal(401);
  });
});

after(async function () {
  await mongoose.disconnect();
});
