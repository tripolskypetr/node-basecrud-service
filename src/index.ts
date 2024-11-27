import micro from "micro";
import http from "http";
import Router from "router";
import finalhandler from "finalhandler";
import serveHandler from "serve-handler";

import todo1 from './routes/todo1';
import todo2 from './routes/todo2';
import todo3 from './routes/todo3';

const router = Router({
  params: true
});

router.all("/api/v1/todo1/*", (req, res) => {
  return todo1(
    req,
    res,
    finalhandler(req, res),
  );
});

router.all("/api/v1/todo2/*", (req, res) => {
  return todo2(
    req,
    res,
    finalhandler(req, res),
  );
});

router.all("/api/v1/todo3/*", (req, res) => {
  return todo3(
    req,
    res,
    finalhandler(req, res),
  );
});

router.get("/*", (req, res) => serveHandler(req, res, {
  public: "./public",
}));

const server = new http.Server(
  micro.serve(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    return router(
      req,
      res,
      finalhandler(req, res),
    );
  })
);

server.listen(80);

console.log("Server listening on http://localhost:80")
