import { Commune.Repository } from './commune.repository';

describe('Commune.Repository', () => {
  it('should be defined', () => {
    expect(new Commune.Repository()).toBeDefined();
  });
});
