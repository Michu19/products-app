import { setupServer } from 'msw/node';
import { RequestHandler } from 'msw';

const allMockedHandlers: RequestHandler[] = [];
export const server = setupServer(...allMockedHandlers);
