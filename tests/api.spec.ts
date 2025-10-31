import {expect, test} from '../fixtures/fixtureBase';
import {BASE_API_URL} from '../config/env';

// Quick REST API smoke test using public JSONPlaceholder API
test('API - GET /posts/1 returns a post with id 1', async ({request, baseApiURL}) => {
    // use baseApiURL fixture which is provided from env
    const apiRoot = baseApiURL ?? BASE_API_URL;
    const resp = await request.get(`${apiRoot}/posts/1`);
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.id).toBe(1);
});
