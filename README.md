# gatsby-source-chatwork-messages

[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm.svg)


Source plugin for pulling data into Gatsby from [chatwork.com](https://go.chatwork.com/) using the [ChatWork API](http://developer.chatwork.com/ja/index.html).

## Install

`npm install --save gatsby-source-chatwork-messages`

or

`yarn add gatsby-source-chatwork-messages`


## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-chatwork-messages`,
      options: {
        // You can get an access token following https://help.chatwork.com/hc/ja/articles/115000172402-API%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E7%99%BA%E8%A1%8C%E3%81%99%E3%82%8B.
        accessToken: `YOUR_PERSONAL_ACCESS_TOKEN`,
        // You can check a room_id following https://help.chatwork.com/hc/ja/articles/360000142942-%E3%83%AB%E3%83%BC%E3%83%A0ID%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B
        roomID: `TARGET_ROOM_ID`,
        // Search term (optional)
        // See docs: http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-messages
        f: 1
      }
    }
  ]
}
```


## How to query

```graphql
{
  allChatWorkPost {
    edges {
      node {
       message_id,
        account {
          account_id
          name
          avatar_image_url
        },
        body,
        send_time,
        update_time
       } 
      }
    }
  }
```
