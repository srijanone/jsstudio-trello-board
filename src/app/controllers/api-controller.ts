import { Request, Response, NextFunction } from 'express';
import { api } from '../../index';

export default class UserController {
  public static async  getBoards(req: Request, res: Response, next: NextFunction) {
    const { fields } = req.body;
    try {
      const { data } = await api.get("/members/me/boards", {
        params: { fields: fields },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async  getCards(req: Request, res: Response, next: NextFunction) {
    const { startDate, endDate } = req.body;
    const { idBoard } = req.params;
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
    const { fields, startDate, endDate } = req.body;
    const { idBoard } = req.params;

    try {
      const { data } = await api.get(`/boards/${idBoard}/lists`, {
        params: {
          fields: fields,
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
    const { fields } = req.body;
    const { idBoard } = req.params;
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
    const { fields } = req.body;
    const { idBoard } = req.params;
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
  
  public static async  getBoardsWithAction(req: Request, res: Response, next: NextFunction) {
    const { idBoard } = req.params;
    try {
      const { data } = await api.get(`/api/boards/${idBoard}/actions?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}&limit=1000`)
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  public static async  getLabels(req: Request, res: Response, next: NextFunction) {
    const { fields } = req.body;
    const { idBoard } = req.params;

    try {
      const { data } = await api.get(`/boards/${idBoard}/labels`, { params: { fields: fields } })
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  public static async  getListOfBoards(req: Request, res: Response, next: NextFunction) {
    const { idBoard } = req.params;
    try {
      const { data } = await api.get(`/boards/${idBoard}/lists?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`)
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  public static async  getListOfBoardsWithMembers(req: Request, res: Response, next: NextFunction) {
    const { idBoard } = req.params;
    try {
      const { data } = await api.get(`/boards/${idBoard}/members?fields=fullName,avatarUrl,initials&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`)
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}