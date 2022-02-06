export interface IRequestParamsBase {
    request: IRequest;
}
export interface IRequest {
    serviceId: string;
    requestParams?: any;
}

