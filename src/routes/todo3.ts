import micro from "micro";

import Router from "router";

import { ioc } from "src/lib";

const router = Router({
  params: true
});

router.get("/api/v1/todo3", async (req, res) => {
  return await micro.send(
    res,
    200,
    await ioc.todo3DbService.findAll(),
  );
});

router.get("/api/v1/todo3/:id", async (req, res) => {
  return await micro.send(
    res,
    200,
    await ioc.todo3DbService.findById(req.params.id)
  );
});

router.post("/api/v1/todo3", async (req, res) => {
  const { data } = <any>await micro.json(req);
  return await micro.send(
    res,
    200,
    await ioc.todo3DbService.create(data)
  );
});

router.put("/api/v1/todo3/:id", async (req, res) => {
  const { data } = <any>await micro.json(req);
  return await micro.send(
    res,
    200,
    await ioc.todo3DbService.update(req.params.id, data)
  );
});

export default router;
