class MResponse {
  status;
  data;
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}

module.exports = { MResponse };
