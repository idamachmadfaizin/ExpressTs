import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRole } from '../../models/database';
import ROLE from '../../models/database/role.database';
import { BaseResponse } from '../../models/response/base-response.model';
import { BadRequest } from '../middleware/error/bad-request';

export class RoleController {
  /**
   * Get all roles
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await ROLE.find();
      return res.status(StatusCodes.OK).json(new BaseResponse(roles));
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
      const role = await ROLE.findById(id);
      return res.status(StatusCodes.OK).json(new BaseResponse(role));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Insert role
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async insert(req: Request, res: Response, next: NextFunction) {
    try {
      /**
       * TODO: change role name to lower case
       */
      const roleReq: IRole = req.body;

      const roleExist = await ROLE.findOne({ name: roleReq.name });
      if (roleExist) throw new BadRequest('Role already exists');

      const role = new ROLE(roleReq);
      const savedRole = await role.save();

      return res
        .status(StatusCodes.CREATED)
        .json(new BaseResponse({ role: savedRole.id }, 'Role created'));
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
      const roleReq: IRole = req.body;
      const { id } = req.params;

      if (!roleReq?._id || !id || roleReq?._id !== id) throw new BadRequest();

      /** check exist */
      const roleExist = await ROLE.findById(roleReq._id);
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

      const role = await ROLE.findById(id);
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
