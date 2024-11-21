import micro from "micro";
import Router from "router";

import { randomString } from "functools-kit";

import UrlPattern from "url-pattern";

import type { IncomingMessage, ServerResponse } from "http";

import { parse as parseQuery } from "querystring";

import { OlxClientSesssionService, ioc } from "src/lib";
import { CC_OLX_CLIENT_ID } from "src/lib/config/params";

const URL_PATTERN = "/:requestId/:apartmentId";
const REQUEST_ID_COOKIE = `REC_REQUEST_ID_${randomString()}`;
const APARTMENT_ID_COOKIE = `REC_APARTMENT_ID_${randomString()}`;

const router = Router();
const matcher = new UrlPattern(URL_PATTERN);

const parseCookies = (cookieHeader) => {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookies[name] = decodeURIComponent(value);
  });
  return cookies;
};

router.get(
  URL_PATTERN,
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const { requestId, apartmentId } = matcher.match(req.url);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Set-Cookie", [
      `${REQUEST_ID_COOKIE}=${requestId}; Path=/; HttpOnly`,
      `${APARTMENT_ID_COOKIE}=${apartmentId}; Path=/; HttpOnly`,
    ]);
    return micro.send(
      res,
      200,
      `<meta http-equiv="refresh" content="0; url=/">`
    );
  }
);

router.get(
  "/",
  async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const { [REQUEST_ID_COOKIE]: requestId, [APARTMENT_ID_COOKIE]: apartmentId } = <any>parseCookies(req.headers.cookie);

    const searchParams = req.url.slice(req.url.indexOf("?") + 1);
    const { code } = parseQuery(searchParams);

    ioc.loggerService.log("olx endpoint recieved", {
        url: req.url,
        requestId,
        apartmentId,
    });

    return await OlxClientSesssionService.runInContext(
      async () => {
        ioc.olxClientSesssionService.setOlxCode(code as string);

        if (ioc.olxClientSesssionService.clientStep === "fetch-code") {
          res.setHeader("Content-Type", "text/html");
          return micro.send(
            res,
            200,
            `<meta http-equiv="refresh" content="0; url=https://www.olx.uz/oauth/authorize/?client_id=${CC_OLX_CLIENT_ID}&response_type=code&scope=read+write+v2">`
          );
        }

        if (ioc.olxClientSesssionService.clientStep === "publishing") {
          res.setHeader("Content-Type", "text/html");
          res.setHeader("Set-Cookie", [
            `${REQUEST_ID_COOKIE}=; Path=/; HttpOnly`,
            `${APARTMENT_ID_COOKIE}=; Path=/; HttpOnly`,
          ]);
          return micro.send(
            res,
            200,
            `Publishing... The window can be closed.<script>window.close()</script>`
          );
        }

        if (ioc.olxClientSesssionService.clientStep === "invalid") {
          res.setHeader("Content-Type", "text/html");
          return micro.send(res, 200, `Ann exception aquired while publishing`);
        }

        return micro.send(res, 500, `500`);
      },
      requestId,
      apartmentId
    );
  }
);

export default router;
