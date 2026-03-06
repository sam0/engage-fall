// Azure Function: /api/search
const fetch = require('node-fetch');

module.exports = async function (context, req) {
  const query = req.query.q;

  if (!query) {
    context.res = {
      status: 400,
      body: { error: 'Missing query parameter' }
    };
    return;
  }

  // Get access token from environment variable
  const accessToken = process.env.ENGAGE_ACCESS_TOKEN;

  if (!accessToken) {
    context.res = {
      status: 500,
      body: { error: 'Server configuration error' }
    };
    return;
  }

  try {
    // Step 1: Search for threads by hashtag
    const searchQuery = `
      query {
        search(query: "${query}", categories: THREADS, limit: 25) {
          results {
            ... on ThreadSearchResultConnection {
              items {
                databaseId
                author
                preview
                createdAt
              }
            }
          }
        }
      }
    `;

    const searchResponse = await fetch('https://www.yammer.com/api/v1/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: searchQuery })
    });

    const searchData = await searchResponse.json();
    const threads = searchData.data?.search?.results?.[0]?.items || [];

    // Step 2: Enrich with full thread details (job titles)
    const posts = await Promise.all(
      threads.slice(0, 20).map(async (thread) => {
        const threadQuery = `
          query {
            thread(databaseId: "${thread.databaseId}") {
              threadStarter {
                sender {
                  ... on User {
                    displayName
                    jobTitle
                  }
                }
                body {
                  text
                }
                createdDateTime
                likeCount
                replyCount
              }
            }
          }
        `;

        const threadResponse = await fetch('https://www.yammer.com/api/v1/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: threadQuery })
        });

        const threadData = await threadResponse.json();
        const starter = threadData.data?.thread?.threadStarter;

        return {
          author: starter?.sender?.displayName || thread.author || 'Anonymous',
          title: starter?.sender?.jobTitle || 'Team Member',
          body: starter?.body?.text || thread.preview || '',
          time: starter?.createdDateTime || thread.createdAt || new Date().toISOString(),
          reactions: starter?.likeCount || 0,
          comments: starter?.replyCount || 0
        };
      })
    );

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { posts }
    };

  } catch (error) {
    context.log.error('Error:', error);
    context.res = {
      status: 500,
      body: { error: error.message }
    };
  }
};
