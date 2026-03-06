// Azure Function: /api/search
// Uses Yammer REST API (works better than Graph for now)
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
    // Use Yammer REST API to search for messages
    // Search by hashtag or keyword
    const searchUrl = `https://www.yammer.com/api/v1/messages/search.json?search=${encodeURIComponent(query)}&limit=20`;

    context.log('Searching Yammer API for:', query);

    const searchResponse = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      context.log.error('Yammer API error:', searchResponse.status, errorText);
      throw new Error(`Yammer API returned ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    context.log('Yammer API response keys:', Object.keys(searchData));

    // Extract messages and users from Yammer response
    const messages = searchData.messages || [];
    const references = searchData.references || [];

    // Create user lookup map
    const users = {};
    references.forEach(ref => {
      if (ref.type === 'user') {
        users[ref.id] = ref;
      }
    });

    context.log(`Found ${messages.length} messages`);

    // Transform to our format
    const posts = messages.slice(0, 20).map(msg => {
      const sender = users[msg.sender_id] || {};

      return {
        author: sender.full_name || 'Unknown User',
        title: sender.job_title || 'Team Member',
        body: msg.body?.plain || msg.body?.parsed || '',
        time: msg.created_at || new Date().toISOString(),
        reactions: msg.liked_by?.count || 0,
        comments: msg.replied_to_id ? 1 : 0 // Yammer API doesn't return comment count directly
      };
    });

    context.log(`Returning ${posts.length} posts`);

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { posts }
    };

  } catch (error) {
    context.log.error('Error:', error.message);
    context.log.error('Stack:', error.stack);
    context.res = {
      status: 500,
      body: { error: error.message, details: error.stack }
    };
  }
};
