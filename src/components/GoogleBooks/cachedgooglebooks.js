import GoogleBooks from './googlebooks';

export default class CachedGoogleBooks extends GoogleBooks {
  constructor(props) {
    super(props);

    this.cache = {};
  }

  async findAll(q) {
    if (!this.cache[q]) this.cache[q] = super.findAll(q);
    return this.cache[q];
  }

  async findOne(q) {
    if (!this.cache[q]) this.cache[q] = super.findOne(q);
    return this.cache[q];
  }
}
