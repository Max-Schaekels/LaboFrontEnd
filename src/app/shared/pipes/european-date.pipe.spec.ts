import { EuropeanDatePipe } from './european-date.pipe';

describe('EuropeanDatePipe', () => {
  it('create an instance', () => {
    const pipe = new EuropeanDatePipe();
    expect(pipe).toBeTruthy();
  });
});
