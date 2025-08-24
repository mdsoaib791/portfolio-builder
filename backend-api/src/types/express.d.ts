declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string;
      [key: string]: any;
    }
    interface Request {
      clientId?: string;
      user: User;
    }
  }
}

export { };

