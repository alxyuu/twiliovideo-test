module.exports = {
  async rewrites() {
    return [
      {
        source: '/room/:room*',
        destination: '/',
      },
    ]
  },
}
