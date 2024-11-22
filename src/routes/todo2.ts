import micro from "micro";

import Router from "router";

import { ioc } from "src/lib";

const router = Router({
  params: true
});

router.get("/api/v1/todo2", async (req, res) => {
  return await micro.send(
    res,
    200,
    await ioc.todo2DbService.findAll(),
  );
});

router.get("/api/v1/todo2/:id", async (req, res) => {
  return await micro.send(
    res,
    200,
    await ioc.todo2DbService.findById(req.params.id)
  );
});

router.post("/api/v1/todo2", async (req, res) => {
  const { data } = <any>await micro.json(req);
  return await micro.send(
    res,
    200,
    await ioc.todo2DbService.create(data)
  );
});

router.put("/api/v1/todo2/:id", async (req, res) => {
  const { data } = <any>await micro.json(req);
  return await micro.send(
    res,
    200,
    await ioc.todo2DbService.update(req.params.id, data)
  );
});

export default router;
