import axios from 'axios'
import crypto from 'crypto'

const createContentDigest = obj =>
    crypto
        .createHash(`md5`)
        .update(JSON.stringify(obj))
        .digest(`hex`)

exports.sourceNodes = async ({
                                 boundActionCreators,
                                 createNodeId
                             }, {
                                 accessToken,
                                 roomID,
                                 f = 1
                             }) => {

    if (!accessToken) {
        throw 'You need to set an accessToken.'
    }

    if (!roomID) {
        throw 'You need to set an roomID.'
    }

    const {createNode} = boundActionCreators

    const client = axios.create({
        baseURL: 'https://api.chatwork.com/v2',
    })

    client.interceptors.request.use((config) => {
        config.headers['X-ChatWorkToken'] = accessToken
        return config
    })

    const {data} = await client.request({
        method: 'get',
        url: `/rooms/${roomID}/messages`,
        params: {
            force: f,
        }
    })

    data.forEach((post, index) => {
        const contentDigest = createContentDigest(post)
        const nodeId = createNodeId(`ChatWorkPost${index}`)

        createNode({
            ...post,
            id: nodeId,
            children: [],
            parent: null,
            internal: {
                type: 'ChatWorkPost',
                contentDigest,
            }
        })
    })

    return
}