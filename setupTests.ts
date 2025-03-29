import '@testing-library/jest-dom';
import { server } from './src/mocks/server';

beforeAll(() => {
  server.listen();
  console.log('Mock server started');
});

afterEach(() => {
  server.resetHandlers();
  console.log('Mock server handlers reset');
});

afterAll(() => {
  server.close();
  console.log('Mock server stopped');
});
