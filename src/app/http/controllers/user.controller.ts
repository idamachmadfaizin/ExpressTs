import { IUser } from './../../models/database/user.database';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import USER from '../../models/database/user.database';
import { BaseResponse } from '../../models/response/base-response.model';
import { BadRequest } from '../middleware/error/bad-request';

export class UserController {
  /**
   * Get all roles
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await USER.find();
      return res.status(StatusCodes.OK).json(new BaseResponse(users));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Find role by id
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await USER.findById(id);
      return res.status(StatusCodes.OK).json(new BaseResponse(user));
    } catch (err) {
      next(err);
    }
  }


  /**
   * Update role
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const roleReq: IUser = req.body;
      const { id } = req.params;

      if (!roleReq?._id || !id || roleReq?._id !== id) throw new BadRequest();

      /** check exist */
      const roleExist = await USER.findById(roleReq._id);
      if (!roleExist) throw new BadRequest('Role is Required');

      const updated = await roleExist.updateOne(roleReq);

      return res
        .status(StatusCodes.OK)
        .json(new BaseResponse({ role: roleExist.id }, 'Role updated'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete role
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequest();

      const role = await USER.findById(id);
      if (!role) throw new BadRequest('Role notfound');

      await role.deleteOne();
      return res
        .status(StatusCodes.OK)
        .json(new BaseResponse({ role: id }, 'Successfully deleted'));
    } catch (err) {
      next(err);
    }
  }
}
