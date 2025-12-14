const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
const fs = require("fs"); 
const os = require("os"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parse } = require("csv-parse/sync"); 

// --- CONFIGURATION ---
const genAI = new GoogleGenerativeAI("AIzaSyC3Ai_zxU97kiSYTtj58mmzmzpDx9Enzhk");

// --- LOAD BONTOK LEXICON AT STARTUP ---
let bontocContext = "";
try {
    const csvPath = path.join(__dirname, "bontoc_lexicon.csv"); 
    if (fs.existsSync(csvPath)) {
        console.log("Loading Bontoc Dictionary...");
        const csvContent = fs.readFileSync(csvPath, 'utf8');
        
        // Parse CSV to Objects
        const records = parse(csvContent, {
            columns: true,
            skip_empty_lines: true
        });

        // Create a text block for the AI to learn from
        bontocContext = records.map(r => 
            `Word: ${r['BONTOK WORD']} | Meaning: ${r['DEFINITION']} | Usage: ${r['EXAMPLE SENTENCE']}`
        ).join('\n');
        
        console.log(`Dictionary loaded! (${records.length} words ready).`);
    } else {
        console.warn("WARNING: bontoc_lexicon.csv not found. AI will not speak Bontoc.");
    }
} catch (error) {
    console.error("Error loading dictionary:", error);
}

let latestUpload = null;

// Increase limit to handle Base64 images
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// --- 1. Helper Function to get Local IP ---
function getLocalIPv4() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '127.0.0.1';
}
const localIP = getLocalIPv4();

// --- 2. INTERCEPT ROUTE ---
app.get("/html/QRUpload.html", (req, res) => {
    const uploadPagePath = path.join(__dirname, "MasterImage", "View", "html", "QRUpload.html");
    fs.readFile(uploadPagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading QRUpload.html:', err);
            return res.status(404).send('Page not found');
        }
        const scriptToInject = `<script>var injectedIP = "${localIP}";</script>`;
        const modifiedHtml = data.replace('</head>', `${scriptToInject}\n</head>`);
        res.send(modifiedHtml);
    });
});

// --- 3. Static Middleware ---
app.use(express.static(path.join(__dirname, "MasterImage", "View")));

// --- 4. Routes ---
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "MasterImage", "View", "html", "Index.html"));
});

app.get("/html/Index.html", (req, res) => {
    res.redirect("/");
});

// --- 5. Upload Logic ---
const storage = multer.diskStorage({
    destination: './MasterImage/View/assets/uploads/',
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

app.post('/upload-endpoint', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send("No file received");
    console.log("File uploaded:", req.file.filename);
    latestUpload = req.file.filename;
    res.status(200).send("File uploaded successfully.");
});

app.get('/check-status', (req, res) => {
    if (latestUpload) {
        res.json({ status: 'found', filename: latestUpload });
        latestUpload = null; 
    } else {
        res.json({ status: 'waiting' });
    }
});

app.post('/save-final-image', (req, res) => {
    const { imageBase64 } = req.body;
    const base64Data = imageBase64.replace(/^data:image\/png;base64,/, "");
    const finalFilename = `final_${Date.now()}.png`;
    const filePath = path.join(__dirname, "MasterImage", "View", "assets", "uploads", finalFilename);

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save image' });
        }
        res.json({ filename: finalFilename });
    });
});

// --- 6. AI Caption Generation Route (UPDATED) ---
app.post('/generate-captions', async (req, res) => {
    try {
        // We now accept 'language' from the client
        const { imageBase64, language } = req.body; 
        
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        
        // Use gemini-1.5-flash
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        let prompt = "";

        // --- CHECK LANGUAGE SELECTION ---
        if (language === 'bontok' || language === 'bontoc') {
            console.log("Generating BONTOC captions...");
            prompt = `
                You are a helper that speaks the Bontoc language (Central Bontoc).
                Here is a dictionary of Bontoc words you know:
                ${bontocContext}

                Task: Look at this photo. Generate 3 short, heartwarming, and sentimental stories/captions.
                
                Rules:
                1. Write the captions primarily in Bontoc using the provided dictionary.
                2. Make it look like a caption that could be printed on a photo frame that perfectly describes the photo.
                3. Make it 3 to 5 sentences long. 
                4. Do not number them. 
                5. Separate them ONLY with a pipe character "|".
                
                Example Output: 
                Gawis ay agew. Nan layad mi et adi katinggang. | Caption 2... | Caption 3...
            `;
        } else {
            // DEFAULT ENGLISH PROMPT
            console.log("Generating ENGLISH captions...");
            prompt = `
                Look at this photo. Generate 3 short, heartwarming, and sentimental stories 
                suitable for a souvenir. 
                Make it look like a caption that could be printed on a photo frame that perfectly describes the photo.
                Make it 3 to 5 sentences. 
                Do not number them. 
                Separate them ONLY with a pipe character "|".
                Example output: Sentence 1 | Sentence 2 | Sentence 3
            `;
        }

        const result = await model.generateContent([
            prompt,
            { inlineData: { data: base64Data, mimeType: "image/png" } },
        ]);

        const response = await result.response;
        const text = response.text();
        const captions = text.split('|').map(s => s.trim());

        res.json({ captions: captions });

    } catch (error) {
        console.error("Google AI Error:", error);
        res.json({ captions: [] });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://${localIP}:${PORT}`));