class MResponse {
  status;
  data;
  constructor(status, data = null) {
    this.status = status;
    this.data = data;
  }
}

module.exports = { MResponse };
