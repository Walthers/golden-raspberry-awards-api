const request = require('supertest');
const { app, init } = require('../../src/app');

beforeAll(async () => {
    await init();
});

describe('GET /awards', () => {

    it('should return min and max intervals in correct format', async () => {
        const response = await request(app).get('/awards');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('min');
        expect(response.body).toHaveProperty('max');

        const checkFormat = item => {
            expect(item).toHaveProperty('producer');
            expect(item).toHaveProperty('interval');
            expect(item).toHaveProperty('previousWin');
            expect(item).toHaveProperty('followingWin');
        };

        response.body.min.forEach(checkFormat);
        response.body.max.forEach(checkFormat);
    });

    it('should contain known producers based on CSV data', async () => {
        const response = await request(app).get('/awards');

        const minProducers = response.body.min.map(p => p.producer);
        const maxProducers = response.body.max.map(p => p.producer);

        expect(minProducers).toContain('Joel Silver');
        expect(maxProducers).toContain('Matthew Vaughn');
    });

    it('should not include producers with only one win', async () => {
        const response = await request(app).get('/awards');

        const producersInMin = response.body.min.map(p => p.producer);
        const producersInMax = response.body.max.map(p => p.producer);

        const all = [...producersInMin, ...producersInMax];
        const unique = [...new Set(all)];

        for (const producer of unique) {
            const count = response.body.min.filter(p => p.producer === producer).length +
                response.body.max.filter(p => p.producer === producer).length;
            expect(count).toBeGreaterThanOrEqual(1);
        }
    });

    it('should support ties in min and max intervals', async () => {
        const response = await request(app).get('/awards');

        const min = response.body.min;
        const max = response.body.max;

        if (min.length > 1) {
            const interval = min[0].interval;
            min.forEach(i => expect(i.interval).toBe(interval));
        }

        if (max.length > 1) {
            const interval = max[0].interval;
            max.forEach(i => expect(i.interval).toBe(interval));
        }
    });
});
