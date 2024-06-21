export interface DataBaseWrapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insertMany(docs: any): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  find(query: object): Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insertOne(doc: any): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findById(id: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(id: string, query: object): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateMany(filter: object, query: object, options: object): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replace(filter: object, replacement: object): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aggregate(stages: object[]): Promise<any>;
}
