interface KeyValue {
  [key: string]: number | boolean | string | any[] | KeyValue;
}

interface Request {
  requestURL: string;
  requestMethod: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  queryParams: KeyValue;
  body: KeyValue;
}

interface Response {
  statusCode: number;
  response: KeyValue | KeyValue[];
}

export interface API {
  description?: string;
  request: Request;
  response: Response;
}
