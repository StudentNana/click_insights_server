import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus('http://localhost:8055').with(rest());
// const url: string = process.env.DIRECTUS_URL;
// const directus = createDirectus('https://b3df-2a02-8109-9303-a400-3dbe-9f0a-cd9b-e2db.ngrok-free.app').with(rest());

export default directus;
