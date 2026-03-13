import { Request } from "express";

type TypedRequest<T> = Request<unknown, unknown, T>;

export default TypedRequest;
