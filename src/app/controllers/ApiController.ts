import { Request, Response, NextFunction } from 'express';
const axios = require("axios").default;

const api = axios.default.create({
  baseURL: process.env.REACT_APP_API_PATH,
});

api.interceptors.request.use((config: any) => {
  config.params = config.params || {};
  config.params["key"] = process.env.REACT_APP_API_KEY;
  config.params["token"] = process.env.REACT_APP_API_TOKEN;
  return config;
});

export default class UserController {
  public static async  getBoards(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = await api.get("/members/me/boards/", {
        params: { fields: "" },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async  getCards(req: Request, res: Response, next: NextFunction) {
    const { idBoard, startDate, endDate } = req.body;
    try {
      const { data } = await api.get(`/boards/${idBoard}/cards`, {
        params: {
          since: startDate,
          before: endDate,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async getLists(req: Request, res: Response, next: NextFunction) {
    const { idBoard, startDate, endDate } = req.body;
    try {
      const { data } = await api.get(`/boards/${idBoard}/lists`, {
        params: {
          fields: "",
          since: startDate,
          before: endDate,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async  getMembers(req: Request, res: Response, next: NextFunction) {
    const { idBoard, fields } = req.body;
    try {
      const { data } = await api.get(`/boards/${idBoard}/members`, {
        params: { fields: fields },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async  getActions(req: Request, res: Response, next: NextFunction) {
    const { idBoard, fields } = req.body;
    try {
      const { data } = await api.get(`/boards/${idBoard}/actions/`, {
        params: {
          fields: fields,
          limit: 1000,
          before: '2020-05-14T23:59:59.999Z',
          filter: 'deleteCard'
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async  getLabels(req: Request, res: Response, next: NextFunction) {
    const { idBoard, fields } = req.body;
    try {
      const { data } = await api.get(`/boards/${idBoard}/labels`, { params: { fields: fields } })
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
