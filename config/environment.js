const secret = process.env.SECRET || 'Zge{T*g._&;(gCaQ2mcn=-mR'
const dbUri = process.env.MONGODB_URI  || 'mongodb+srv://dev-server:dev-server_123@nal-dev-moqfu.mongodb.net/NAL'
const port = process.env.PORT || 4000

module.exports = { secret, dbUri, port }
