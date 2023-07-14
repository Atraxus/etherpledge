// ESM syntax is used
import express from 'express';
import cors from 'cors';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file);
const defaultData = { campaigns: [] };
const db = new Low(adapter, defaultData);

// Create an Express application
const app = express();

// Allow CORS
app.use(cors());

// Define API endpoint
app.get('/api/campaigns', async (req, res) => {
    // Read data from JSON file, this will set db.data content
    // If JSON file doesn't exist, defaultData is used instead
    await db.read();

    // Get the campaigns data
    const campaigns = db.data.campaigns;

    // Send it as response
    res.json(campaigns);

    // Finally write db.data content to file
    await db.write();
});

app.listen(3000, () => console.log('Server is running on port 3000'));
