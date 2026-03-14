class PgNativeShim {
  constructor() {
    throw new Error(
      "pg-native is not available in this Cloudflare deployment. Use the standard pg client instead."
    )
  }
}

module.exports = PgNativeShim
module.exports.default = PgNativeShim
