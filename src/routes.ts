import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
    return res.send("Ola");
});

export default routes;