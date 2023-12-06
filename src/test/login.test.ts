import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import { Elysia } from "elysia";
import { googleAuth, facebookAuth } from "../controllers/login";

describe('Elysia', () => {

    beforeEach(() => {
        console.log("running test.");
    });

    afterEach(() => {
        console.log("done with test.");
    });

    it('return a response', async () => {
        facebookAuth.getAuthorizationUrl();
        googleAuth.getAuthorizationUrl();
        const serverMessage = "Elysia server running!";
        const app = new Elysia()
            .get('/', () => serverMessage)
        const response = await app.handle(
            new Request('http://localhost/')
        ).then(res => res.text())
        expect(response).toBe(serverMessage);
        expect(response).toMatchSnapshot();
    })
})