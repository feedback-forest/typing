type ValueType = string | number | boolean;

export type Union<
  T extends { [key: string]: ValueType } | ReadonlyArray<ValueType>,
> =
  T extends ReadonlyArray<ValueType>
    ? T[number]
    : T extends { [key: string]: infer U }
      ? U
      : never;

export type Payload<
  Header = undefined,
  Query = undefined,
  Body = undefined,
  Response = undefined,
> = {
  Request: {
    header: Header;
    query: Query;
    body: Body;
  };
  Response: Response;
};
