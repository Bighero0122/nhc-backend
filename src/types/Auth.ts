import { Request } from "express";

import { UserEntity } from "entities";

export interface AuthRequest<Param, ResBody, ReqBody, ReqQuery>
    extends Request<Param, ResBody, ReqBody, ReqQuery> {
        user:UserEntity;
    }