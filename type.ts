export type Request = {
  "method": string;
  "headers": {
    [key: string]: string;
  };
  "body": {
    curl: string;
  };
  "url": string;
  [key: string]: string | object;
};

export type displayType = {
  [key: string]: string | object;
}

export interface CURL {
  curl: string;
  name: string;
  date: Date;
}
