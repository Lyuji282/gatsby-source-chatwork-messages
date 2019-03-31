"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createContentDigest = obj => _crypto.default.createHash(`md5`).update(JSON.stringify(obj)).digest(`hex`);

exports.sourceNodes = async ({
  boundActionCreators,
  createNodeId
}, {
  accessToken,
  roomID,
  f = 1
}) => {
  if (!accessToken) {
    throw 'You need to set an accessToken.';
  }

  if (!roomID) {
    throw 'You need to set an roomID.';
  }

  const {
    createNode
  } = boundActionCreators;

  const client = _axios.default.create({
    baseURL: 'https://api.chatwork.com/v2'
  });

  client.interceptors.request.use(config => {
    config.headers['X-ChatWorkToken'] = accessToken;
    return config;
  });
  const {
    data
  } = await client.request({
    method: 'get',
    url: `/rooms/${roomID}/messages`,
    params: {
      force: f
    }
  });
  data.forEach((post, index) => {
    const contentDigest = createContentDigest(post);
    const nodeId = createNodeId(`ChatWorkPost${index}`);
    createNode({ ...post,
      id: nodeId,
      children: [],
      parent: null,
      internal: {
        type: 'ChatWorkPost',
        contentDigest
      }
    });
  });
  return;
};