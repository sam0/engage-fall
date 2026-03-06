// Azure Function: /api/search
// Uses Microsoft Graph API for Viva Engage
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

  const accessToken = process.env.ENGAGE_ACCESS_TOKEN;

  if (!accessToken) {
    context.res = {
      status: 500,
      body: { error: 'Server configuration error' }
    };
    return;
  }

  try {
    // Use Microsoft Graph API to search for Engage/Yammer messages
    // Note: Graph API for Viva Engage might be in beta or have limited support
    // We'll try the employeeExperience endpoints

    const searchUrl = `https://graph.microsoft.com/beta/search/query`;

    const searchBody = {
      requests: [
        {
          entityTypes: ["message"],
          query: {
            queryString: query
          },
          from: 0,
          size: 25
        }
      ]
    };

    context.log('Searching Graph API for:', query);

    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchBody)
    });

    const searchData = await searchResponse.json();
    context.log('Graph API response:', JSON.stringify(searchData));

    // Extract posts from Graph API response
    const hits = searchData?.value?.[0]?.hitsContainers?.[0]?.hits || [];

    const posts = hits.slice(0, 20).map(hit => {
      const resource = hit.resource;
      return {
        author: resource?.from?.emailAddress?.name || resource?.createdBy?.user?.displayName || 'Unknown User',
        title: 'Team Member', // Graph API might not have job title in message search
        body: resource?.body?.content || resource?.bodyPreview || '',
        time: resource?.createdDateTime || new Date().toISOString(),
        reactions: 0, // Graph API message search might not include reaction counts
        comments: 0
      };
    });

    context.log(`Found ${posts.length} posts`);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { posts }
    };

  } catch (error) {
    context.log.error('Error:', error);
    context.log.error('Stack:', error.stack);
    context.res = {
      status: 500,
      body: { error: error.message, details: error.stack }
    };
  }
};
