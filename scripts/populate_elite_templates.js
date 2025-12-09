const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/templates.json');

// Read existing templates
let templates = [];
try {
  const data = fs.readFileSync(filePath, 'utf8');
  templates = JSON.parse(data);
} catch (err) {
  console.error('Error reading existing templates:', err);
  process.exit(1);
}

// Find the highest ID to increment from
let maxId = templates.reduce((max, t) => Math.max(max, parseInt(t.id)), 0);

const newTemplates = [
  // --- GENERATIVE AI & LLMs ---
  {
    title: "LLM Fine-Tuning Pipeline (God Mode)",
    description: "End-to-end LLM engineering. Focuses on QLoRA, PEFT, and dataset preparation.",
    tags: ["GenAI", "Level 5", "Python", "PyTorch", "HuggingFace"],
    prompt: `**System Role**: You are a Principal AI Engineer.\n**Objective**: Build a robust pipeline to Fine-Tune Llama-3-8b on a custom dataset using QLoRA.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **VRAM Optimization**: You must use \`bitsandbytes\` for 4-bit quantization. Explain memory constraints in your thinking.\n2.  **Tracking**: Integrate \`wandb\` (Weights & Biases) for loss visualization.\n\n**Phase 1: Dataset Prep**\n* Load a JSONL dataset.\n* Format prompts into the instruction format: \`### Instruction: ... ### Response: ...\`.\n* Tokenize using the Llama tokenizer with padding/truncation.\n\n**Phase 2: Training Loop**\n* Load Model in 4-bit.\n* Apply LoRA adapters (Rank 64, Alpha 16).\n* Use \`SFTTrainer\` from \`trl\` library.\n* **Hyperparameters**: Learning rate 2e-4, Cosine scheduler.\n\n**Verification**:\n* Run inference on a held-out test prompt. Compare base model vs fine-tuned model outputs.`
  },
  {
    title: "Stable Diffusion ControlNet Interface",
    description: "Generative Art Application. Focuses on conditioning image generation with Canny edges.",
    tags: ["GenAI", "Level 4", "Python", "Diffusers", "Gradio"],
    prompt: `**System Role**: You are a Creative Technologist.\n**Objective**: Build a Web UI for Stable Diffusion with ControlNet support.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Pipeline**: Use \`StableDiffusionControlNetPipeline\`.\n2.  **Preprocessing**: Implement a Canny edge detector using OpenCV.\n\n**Phase 1: Backend**\n* Python script using \`diffusers\` and \`accelerate\`.\n* Load SDXL and ControlNet-Canny.\n* Function: \`generate(prompt, input_image) -> output_image\`.\n\n**Phase 2: Frontend (Gradio)**\n* Create a Gradio block.\n* Input: Image Upload + Text Prompt.\n* Output: Generated Image.\n\n**Verification**:\n* Upload a sketch of a cat. Prompt \"Realistic cat\". The output must match the sketch outlines.`
  },
  {
    title: "AI Agent with Tool Use (ReAct Pattern)",
    description: "Agentic AI System. Implements the Reason+Act loop from scratch without frameworks.",
    tags: ["GenAI", "Level 5", "Python", "OpenAI", "System Design"],
    prompt: `**System Role**: You are an AGI Researcher.\n**Objective**: Build a ReAct (Reason + Act) Agent from scratch.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **No Frameworks**: Do NOT use LangChain. Implement the loop manually to understand the internals.\n2.  **Tools**: Define two tools: \`search_wikipedia(query)\` and \`calculate(expression)\`.\n\n**Phase 1: The Loop**\n* Prompt Engineering: Create a system prompt that enforces \`Thought: ... Action: ... Observation: ...\` format.\n* **Parser**: Regex to extract the Action and Input.\n* **Execution**: Call the Python function corresponding to the tool.\n* **History**: Append the Observation back to the context and loop.\n\n**Verification**:\n* Ask: \"What is the population of France times 5?\". Agent should Search -> Calculate -> Answer.`
  },

  // --- WEB3 & BLOCKCHAIN ---
  {
    title: "DAO Governance Dashboard",
    description: "Web3 Application. Focuses on voting mechanisms and on-chain data visualization.",
    tags: ["Web3", "Level 4", "Next.js", "Ethers.js", "The Graph"],
    prompt: `**System Role**: You are a DAO Architect.\n**Objective**: Build a Governance Dashboard for a DAO.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Indexing**: Use The Graph protocol to fetch proposal data. Do not query the blockchain directly for lists.\n\n**Phase 1: Subgraph**\n* Define schema: \`Proposal\`, \`Vote\`.\n* Write mappings for \`ProposalCreated\` and \`VoteCast\` events.\n\n**Phase 2: Frontend**\n* Connect Wallet (RainbowKit).\n* Display Proposals with a progress bar (For vs Against).\n* **Interaction**: \"Vote\" button calls the smart contract.\n\n**Verification**:\n* Cast a vote on a testnet DAO. Ensure the progress bar updates after the block confirms.`
  },
  {
    title: "Flash Loan Arbitrage Bot",
    description: "DeFi Engineering. Focuses on atomic transactions and gas optimization.",
    tags: ["Web3", "Level 5", "Solidity", "Aave", "MEV"],
    prompt: `**System Role**: You are a MEV Searcher.\n**Objective**: Build a Flash Loan contract to perform arbitrage between Uniswap and Sushiswap.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Atomicity**: The transaction must revert if profit <= 0.\n2.  **Security**: Only the owner can call the execution function.\n\n**Phase 1: Contract**\n* Inherit from \`FlashLoanReceiverBase\` (Aave).\n* **Logic**: \n    1. Borrow 1000 USDC.\n    2. Buy ETH on Uniswap.\n    3. Sell ETH on Sushiswap.\n    4. Repay 1000 USDC + Premium.\n    5. Keep difference.\n\n**Verification**:\n* Fork Mainnet using Hardhat. Simulate a price discrepancy. Execute the tx.`
  },

  // --- DEVOPS & CLOUD ---
  {
    title: "Self-Healing Kubernetes Cluster",
    description: "Advanced DevOps. Focuses on Prometheus monitoring and automated remediation.",
    tags: ["DevOps", "Level 5", "Python", "Kubernetes", "Prometheus"],
    prompt: `**System Role**: You are a Platform Engineer.\n**Objective**: Build a \"Self-Healing\" system that restarts pods when latency spikes.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Event Loop**: Poll Prometheus every 10s. Do not rely on K8s liveness probes alone.\n\n**Phase 1: Monitoring**\n* Deploy Prometheus.\n* Expose a custom metric \`http_request_duration_seconds\` in a sample app.\n\n**Phase 2: The Healer Bot**\n* Python script running in the cluster.\n* Query Prometheus: \`rate(http_request_duration_seconds_sum[1m]) > 0.5\`.\n* If true: Use \`kubernetes-client\` to delete the pod (forcing a restart).\n\n**Verification**:\n* Artificially delay responses in the app. Watch the Healer kill the pod.`
  },
  {
    title: "CI/CD Pipeline Generator",
    description: "DevOps Tooling. Focuses on GitHub Actions and Docker registry integration.",
    tags: ["DevOps", "Level 3", "YAML", "GitHub Actions", "Docker"],
    prompt: `**System Role**: You are a DevOps Consultant.\n**Objective**: Create a robust GitHub Actions pipeline for a Node.js app.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Caching**: You MUST cache \`node_modules\` to speed up builds.\n2.  **Security**: Scan the Docker image for vulnerabilities using Trivy.\n\n**Phase 1: Build & Test**\n* Trigger: Push to \`main\`.\n* Steps: Checkout -> Setup Node -> Install -> Lint -> Test.\n\n**Phase 2: Publish**\n* Login to DockerHub (secrets).\n* Build & Push image tagged with Commit SHA.\n\n**Verification**:\n* Push a commit. Verify the image appears in DockerHub with the correct tag.`
  },

  // --- SYSTEM DESIGN & BACKEND ---
  {
    title: "Distributed Key-Value Store",
    description: "System Design. Recreating a simplified version of DynamoDB/Cassandra.",
    tags: ["Backend", "Level 5", "Go", "Distributed Systems", "Consistent Hashing"],
    prompt: `**System Role**: You are a Database Internals Engineer.\n**Objective**: Build a Distributed KV Store with replication.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Partitioning**: Implement Consistent Hashing to distribute keys across N nodes.\n2.  **CAP Theorem**: Prioritize Availability (AP system). Implement \"Sloppy Quorum\".\n\n**Phase 1: The Node**\n* HTTP Server: \`GET /key\`, \`PUT /key\`.\n* Storage: In-memory Map (with Write-Ahead Log for durability).\n\n**Phase 2: The Cluster**\n* **Gossip Protocol**: Nodes periodically ping each other to detect failures.\n* **Replication**: When writing a key, forward it to the next 2 nodes in the ring.\n\n**Verification**:\n* Start 3 nodes. Kill Node B. Write to Node A. Start Node B. Read from Node B (should eventually sync).`
  },
  {
    title: "Event Sourcing Engine",
    description: "Backend Architecture. Focuses on CQRS and immutable event logs.",
    tags: ["Backend", "Level 5", "Node.js", "Kafka", "CQRS"],
    prompt: `**System Role**: You are a Software Architect.\n**Objective**: Build a Banking Ledger using Event Sourcing.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Immutability**: Never update a balance directly. Only append events (\`MoneyDeposited\`, \`MoneyWithdrawn\`).\n2.  **Replay**: The current state must be derivable by replaying all events.\n\n**Phase 1: Write Side (Command)**\n* Accept \`DepositCommand\`.\n* Validate.\n* Append event to Kafka topic \`account-events\`.\n\n**Phase 2: Read Side (Query)**\n* Consumer listens to Kafka.\n* Updates a Redis cache with the current balance.\n\n**Verification**:\n* Wipe Redis. Replay the Kafka topic. Redis should contain the correct balance.`
  },
  {
    title: "gRPC Microservices Mesh",
    description: "Backend Communication. Focuses on Protobufs and inter-service communication.",
    tags: ["Backend", "Level 4", "Go", "gRPC", "Protobuf"],
    prompt: `**System Role**: You are a Microservices Engineer.\n**Objective**: Build a Product-Order microservice system using gRPC.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Contract**: Define \`service.proto\` first. Strictly typed.\n\n**Phase 1: Product Service**\n* RPC \`GetProduct(id)\`. Returns Name, Price.\n\n**Phase 2: Order Service**\n* RPC \`CreateOrder(productId)\`.\n* **Logic**: Calls Product Service to check availability.\n\n**Verification**:\n* Use \`grpcurl\` to call CreateOrder. Verify it internally calls GetProduct.`
  },

  // --- FLUTTER & MOBILE ---
  {
    title: "Flutter E-commerce App",
    description: "Mobile App. Focuses on Clean Architecture and BLoC pattern.",
    tags: ["Flutter", "Level 4", "Dart", "BLoC", "Clean Architecture"],
    prompt: `**System Role**: You are a Senior Flutter Developer.\n**Objective**: Build a scalable E-commerce app.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Separation**: Use Clean Architecture (Domain, Data, Presentation layers).\n2.  **State**: Use \`flutter_bloc\`.\n\n**Phase 1: Domain Layer**\n* Define \`Product\` entity.\n* Define \`ProductRepository\` abstract class.\n\n**Phase 2: Presentation**\n* **ProductListBloc**: Events (\`LoadProducts\`), States (\`Loading\`, \`Loaded\`, \`Error\`).\n* **UI**: GridView with Hero animations for product images.\n\n**Verification**:\n* Trigger an error in the repository. Ensure the UI shows a Snackbar, not a crash.`
  },
  {
    title: "Social Media Feed (Infinite Scroll)",
    description: "Mobile UI/UX. Focuses on performance and pagination.",
    tags: ["Flutter", "Level 3", "Dart", "Pagination", "UI"],
    prompt: `**System Role**: You are a Mobile UI Engineer.\n**Objective**: Build an Instagram-style feed with infinite scrolling.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Performance**: Use \`ListView.builder\`. Do not render off-screen items.\n2.  **Pagination**: Fetch next page when user scrolls to 80%.\n\n**Phase 1: Data Source**\n* Mock API returning 20 items per page.\n\n**Phase 2: UI**\n* Render Post Card (Image + Caption + Like Button).\n* **ScrollController**: Listen to scroll position.\n* Show a loading spinner at the bottom when fetching more.\n\n**Verification**:\n* Scroll quickly. Ensure memory usage remains stable.`
  },

  // --- DATA SCIENCE & ML ---
  {
    title: "Transformer from Scratch",
    description: "Deep Learning Theory. Implementing the 'Attention is All You Need' paper.",
    tags: ["Deep Learning", "Level 5", "PyTorch", "Research"],
    prompt: `**System Role**: You are an AI Researcher.\n**Objective**: Implement a Transformer model from scratch in PyTorch.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **No Shortcuts**: Do not use \`nn.Transformer\`. Build \`MultiHeadAttention\` manually.\n2.  **Shapes**: Comment the tensor shape at every step (e.g., \`# [Batch, Seq, Dim]\`).\n\n**Phase 1: Components**\n* \`SelfAttention\`: Query, Key, Value projections. Scaled Dot-Product.\n* \`FeedForward\`: Linear -> ReLU -> Linear.\n* \`EncoderBlock\`: Attention + Add & Norm + FeedForward.\n\n**Phase 2: Assembly**\n* Stack N EncoderBlocks.\n* Add Positional Encodings.\n\n**Verification**:\n* Pass a random tensor through the model. Ensure output shape matches input shape.`
  },
  {
    title: "Real-time Object Detection API",
    description: "Computer Vision. Focuses on YOLO and video stream processing.",
    tags: ["Deep Learning", "Level 4", "Python", "YOLO", "OpenCV"],
    prompt: `**System Role**: You are a Computer Vision Engineer.\n**Objective**: Build a Real-time Object Detection system.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Model**: Use YOLOv8 (Ultralytics).\n2.  **FPS**: Optimize for speed. Resize frames before inference.\n\n**Phase 1: Inference**\n* Open Webcam stream using OpenCV.\n* Run YOLO inference on each frame.\n* Draw bounding boxes.\n\n**Phase 2: Optimization**\n* Skip frames (process every 3rd frame) to increase FPS.\n\n**Verification**:\n* Hold up a bottle. Ensure it detects "Bottle" with >80% confidence.`
  },
  {
    title: "Recommendation System (Collaborative Filtering)",
    description: "Data Science. Focuses on Matrix Factorization.",
    tags: ["Data Science", "Level 4", "Python", "Pandas", "Scikit-learn"],
    prompt: `**System Role**: You are a Data Scientist.\n**Objective**: Build a Movie Recommendation System.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Algorithm**: Use SVD (Singular Value Decomposition) or User-User Collaborative Filtering.\n\n**Phase 1: Data Prep**\n* Create a User-Item interaction matrix from the MovieLens dataset.\n\n**Phase 2: Model**\n* Compute Cosine Similarity between users.\n* Predict rating for unseen movies.\n\n**Verification**:\n* For a user who likes "Star Wars", ensure the top recommendation is Sci-Fi.`
  },

  // --- COMPLEX APPS ---
  {
    title: "Collaborative Code Editor",
    description: "Complex Web App. Focuses on Operational Transformation (OT) or CRDTs.",
    tags: ["Complex Apps", "Level 5", "React", "Monaco Editor", "Yjs"],
    prompt: `**System Role**: You are a Frontend Architect.\n**Objective**: Build a Google Docs-style Code Editor.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Sync**: Use \`Yjs\` + \`y-websocket\` for conflict resolution.\n2.  **Editor**: Integrate \`Monaco Editor\` (VS Code core).\n\n**Phase 1: Setup**\n* React app with Monaco Editor component.\n* Connect to Yjs Websocket provider.\n\n**Phase 2: Binding**\n* Bind the Yjs Text type to the Monaco model.\n* Show remote cursors with user names.\n\n**Verification**:\n* Type in Tab A. See text appear character-by-character in Tab B.`
  },
  {
    title: "Video Streaming Server (HLS)",
    description: "Backend/Media. Focuses on FFmpeg and adaptive bitrate streaming.",
    tags: ["Backend", "Level 4", "Node.js", "FFmpeg", "HLS"],
    prompt: `**System Role**: You are a Media Engineer.\n**Objective**: Build a Video on Demand (VOD) streaming server.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Transcoding**: Use FFmpeg to convert MP4 to HLS (.m3u8 + .ts segments).\n2.  **Resolutions**: Generate 360p, 720p, 1080p variants.\n\n**Phase 1: Ingest**\n* Upload endpoint accepts MP4.\n* Spawns FFmpeg process to chunk the video.\n\n**Phase 2: Playback**\n* Serve static HLS files.\n* Frontend: Use \`video.js\` to play the stream.\n\n**Verification**:\n* Network throttle to 3G. Player should auto-switch to 360p.`
  },
  {
    title: "Zoom Clone (WebRTC)",
    description: "Real-time Communication. Focuses on Peer-to-Peer video.",
    tags: ["Complex Apps", "Level 5", "WebRTC", "Socket.io", "React"],
    prompt: `**System Role**: You are a VoIP Engineer.\n**Objective**: Build a Video Chat app using WebRTC.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Signaling**: Use Socket.io to exchange SDP offers/answers and ICE candidates.\n2.  **Mesh Topology**: Connect every peer to every other peer (Mesh).\n\n**Phase 1: Signaling Server**\n* Relay messages between Client A and Client B.\n\n**Phase 2: Client**\n* \`navigator.mediaDevices.getUserMedia()\`.\n* Create \`RTCPeerConnection\`.\n* Handle \`ontrack\` to display remote video.\n\n**Verification**:\n* Connect 2 devices on different networks (requires STUN/TURN server, use public STUN for dev).`
  },
  {
    title: "Stock Trading Engine",
    description: "FinTech. Focuses on Order Matching logic.",
    tags: ["Backend", "Level 5", "C++ / Rust", "High Performance"],
    prompt: `**System Role**: You are a High-Frequency Trading Engineer.\n**Objective**: Build an Order Matching Engine.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Data Structure**: Use two Binary Heaps (Min-Heap for Asks, Max-Heap for Bids).\n2.  **Speed**: Logic must be O(1) or O(log N).\n\n**Phase 1: The Order Book**\n* \`add_order(type, price, quantity)\`.\n* **Match Logic**: While (BestBid >= BestAsk): Execute trade.\n\n**Verification**:\n* Add Buy 100 @ $10. Add Sell 50 @ $9. Result: Trade 50 @ $10 (or $9 depending on rule), 50 Buy remaining.`
  },
  {
    title: "Search Engine Indexer",
    description: "System Design. Focuses on Inverted Indices and Web Crawling.",
    tags: ["Backend", "Level 4", "Python", "Elasticsearch", "Scrapy"],
    prompt: `**System Role**: You are a Search Engineer.\n**Objective**: Build a mini Search Engine.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Data Structure**: Build an Inverted Index (Word -> List of DocIDs) manually or use Elasticsearch.\n\n**Phase 1: Crawler**\n* Use \`Scrapy\` to crawl a documentation site.\n* Extract Title and Body.\n\n**Phase 2: Indexer**\n* Tokenize, Stem, Remove Stopwords.\n* Store in Index.\n\n**Phase 3: Query**\n* TF-IDF ranking.\n* Return top 5 documents.\n\n**Verification**:\n* Search for a unique term. Ensure the correct page is Rank 1.`
  },
  {
    title: "GraphQL API Gateway",
    description: "Backend. Focuses on Schema Stitching and Resolvers.",
    tags: ["Backend", "Level 3", "Node.js", "Apollo Server", "GraphQL"],
    prompt: `**System Role**: You are a Backend Developer.\n**Objective**: Build a Unified GraphQL API over REST endpoints.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **N+1 Problem**: Use \`DataLoader\` to batch requests.\n\n**Phase 1: Schema**\n* Types: \`User\`, \`Post\`.\n\n**Phase 2: Resolvers**\n* \`User.posts\`: Fetch from \`/api/posts?userId=X\`.\n* Implement DataLoader to fetch all posts for a list of users in one query.\n\n**Verification**:\n* Query 10 users and their posts. Check network tab. Should be 2 REST calls, not 11.`
  },
  {
    title: "Custom Programming Language",
    description: "Compilers. Focuses on Lexing, Parsing, and Evaluation.",
    tags: ["System Design", "Level 5", "Rust/Python", "Compilers"],
    prompt: `**System Role**: You are a Language Designer.\n**Objective**: Build an interpreter for a toy language \"ToyLang\".\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Pipeline**: Source -> Lexer -> Parser (AST) -> Evaluator.\n\n**Phase 1: Lexer**\n* Tokenize: \`let x = 10;\` -> \`[LET, IDENT(x), ASSIGN, INT(10), SEMICOLON]\`.\n\n**Phase 2: Parser**\n* Recursive Descent Parser.\n* Output Abstract Syntax Tree (AST).\n\n**Phase 3: Evaluator**\n* Walk the AST and execute.\n* Support variables and arithmetic.\n\n**Verification**:\n* Run \`let a = 5; let b = 10; print(a + b);\`. Output should be 15.`
  },
  {
    title: "3D Game Engine (WebGL)",
    description: "Graphics Programming. Focuses on Shaders and Matrix Math.",
    tags: ["Web", "Level 5", "WebGL", "JavaScript", "Linear Algebra"],
    prompt: `**System Role**: You are a Graphics Programmer.\n**Objective**: Build a basic 3D renderer from scratch (No Three.js).\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Shaders**: Write raw Vertex and Fragment shaders in GLSL.\n2.  **Math**: Implement Model-View-Projection matrices manually.\n\n**Phase 1: Setup**\n* Get WebGL context.\n* Compile Shaders.\n\n**Phase 2: Rendering**\n* Define a Cube (vertices, indices).\n* Loop: Clear screen -> Update Rotation Matrix -> Draw Elements.\n\n**Verification**:\n* You should see a spinning colored cube.`
  },
  {
    title: "Password Manager (CLI)",
    description: "Security. Focuses on Encryption and Key Derivation.",
    tags: ["Security", "Level 3", "Python", "Cryptography", "CLI"],
    prompt: `**System Role**: You are a Security Engineer.\n**Objective**: Build a secure Password Manager CLI.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Encryption**: Use AES-GCM (Authenticated Encryption).\n2.  **Key Derivation**: Use Argon2 to derive the key from the Master Password. NEVER store the master password.\n\n**Phase 1: Storage**\n* JSON file storing \`{ site: \"google\", iv: \"...\", ciphertext: \"...\", tag: \"...\" }\`.\n\n**Phase 2: Logic**\n* \`add(site, password)\`: Encrypt and save.\n* \`get(site)\`: Ask for master password, derive key, decrypt.\n\n**Verification**:\n* Check the JSON file. It should look like garbage data.`
  },
  {
    title: "Discord Bot (Music)",
    description: "Bot Development. Focuses on Voice API and Queues.",
    tags: ["Backend", "Level 3", "Node.js", "Discord.js", "Voice"],
    prompt: `**System Role**: You are a Bot Developer.\n**Objective**: Build a Music Bot for Discord.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Voice**: Use \`@discordjs/voice\`.\n2.  **Queue**: Implement a Linked List or Array for the song queue.\n\n**Phase 1: Commands**\n* \`!play <url>\`: Join channel, download audio (ytdl-core), play.\n* \`!skip\`: Stop current, play next.\n\n**Verification**:\n* Join a voice channel. Command the bot. Hear audio.`
  },
  {
    title: "Chrome Extension (Ad Blocker)",
    description: "Browser Extension. Focuses on Manifest V3 and Declarative Net Request.",
    tags: ["Web", "Level 3", "JavaScript", "Chrome API"],
    prompt: `**System Role**: You are a Browser Engineer.\n**Objective**: Build a simple Ad Blocker.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Manifest V3**: Use \`declarativeNetRequest\`, not the blocking webRequest API (deprecated).\n\n**Phase 1: Rules**\n* Define a JSON rule to block requests to \`*://*.doubleclick.net/*\`.\n\n**Phase 2: Popup**\n* Simple UI to toggle the blocker On/Off.\n\n**Verification**:\n* Load the unpacked extension. Visit a site with ads. Verify network requests are blocked.`
  },
  {
    title: "Redis Clone",
    description: "System Design. Focuses on TCP Servers and Serialization.",
    tags: ["Backend", "Level 4", "Go/Python", "TCP", "Protocol"],
    prompt: `**System Role**: You are a Systems Programmer.\n**Objective**: Build a Redis-compatible server.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Protocol**: Implement RESP (Redis Serialization Protocol).\n2.  **Concurrency**: Handle multiple clients using Goroutines or AsyncIO.\n\n**Phase 1: Server**\n* Listen on TCP port 6379.\n* Parse RESP: \`*2\\r\\n$3\\r\\nGET\\r\\n$3\\r\\nkey\\r\\n\`.\n\n**Phase 2: Commands**\n* Implement \`SET\`, \`GET\`, \`DEL\`.\n* Store data in a global Hash Map (Thread-safe).\n\n**Verification**:\n* Connect using the official \`redis-cli\`. Run \`SET foo bar\`. Run \`GET foo\`.`
  },
  {
    title: "Web Scraper API",
    description: "Data Engineering. Focuses on Headless Browsers and Anti-Bot evasion.",
    tags: ["Backend", "Level 3", "Puppeteer", "Express"],
    prompt: `**System Role**: You are a Data Engineer.\n**Objective**: Build an API that scrapes dynamic websites.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Headless**: Use Puppeteer or Playwright.\n2.  **Stealth**: Rotate User-Agents.\n\n**Phase 1: The Scraper**\n* Function \`scrape(url)\`: Launch browser, wait for selector, extract text.\n\n**Phase 2: API**\n* \`POST /scrape { url: \"...\" }\`.\n* Return JSON data.\n\n**Verification**:\n* Scrape a Single Page Application (SPA) that loads data via JS.`
  },
  {
    title: "Markdown Blog (SSG)",
    description: "Web Development. Focuses on Static Site Generation logic.",
    tags: ["Web", "Level 3", "Node.js", "SSG"],
    prompt: `**System Role**: You are a Web Developer.\n**Objective**: Build a Static Site Generator from scratch.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **No Frameworks**: Do not use Next.js/Gatsby. Write the build script manually.\n\n**Phase 1: Content**\n* Folder \`content/\` with \`.md\` files (Frontmatter + Body).\n\n**Phase 2: Build Script**\n* Read files.\n* Parse Frontmatter (\`gray-matter\`).\n* Render Markdown to HTML (\`marked\`).\n* Inject into a Handlebars template.\n* Write to \`dist/\`.\n\n**Verification**:\n* Run \`node build.js\`. Open \`dist/index.html\`.`
  },
  {
    title: "Neural Network Library",
    description: "Deep Learning. Building 'Micrograd' - a tiny Autograd engine.",
    tags: ["AI", "Level 5", "Python", "Math"],
    prompt: `**System Role**: You are a Research Scientist.\n**Objective**: Build a tiny Autograd engine (like PyTorch) from scratch.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Backprop**: Implement the chain rule manually for Add, Mul, Pow, ReLU.\n\n**Phase 1: Value Object**\n* Class \`Value\` stores data and gradient.\n* Implement \`__add__\`, \`__mul__\`.\n* Implement \`backward()\` to propagate gradients.\n\n**Phase 2: Neuron**\n* Implement \`Neuron\`, \`Layer\`, \`MLP\` classes.\n\n**Verification**:\n* Train a small MLP to solve XOR. Loss should go to 0.`
  },
  {
    title: "File Sharing App (P2P)",
    description: "WebRTC. Focuses on Data Channels.",
    tags: ["Web", "Level 4", "WebRTC", "React"],
    prompt: `**System Role**: You are a Network Engineer.\n**Objective**: Build a Peer-to-Peer file transfer app.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Privacy**: Data must go directly Peer-to-Peer, never stored on server.\n2.  **Data Channel**: Use WebRTC DataChannel for binary transfer.\n\n**Phase 1: Signaling**\n* Exchange IDs.\n\n**Phase 2: Transfer**\n* Chunk file.\n* Send chunks over DataChannel.\n* Reassemble on receiver side.\n\n**Verification**:\n* Send a 100MB video file between two tabs.`
  },
  {
    title: "Load Balancer",
    description: "System Design. Focuses on Round Robin and Reverse Proxying.",
    tags: ["Backend", "Level 4", "Go/Node.js", "Networking"],
    prompt: `**System Role**: You are a Site Reliability Engineer.\n**Objective**: Build a Layer 7 Load Balancer.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **Algorithm**: Implement Round Robin.\n2.  **Health Check**: Periodically ping backends. Remove dead ones.\n\n**Phase 1: Proxy**\n* Listen on port 80.\n* List of backends: \`['localhost:8081', 'localhost:8082']\`.\n* Forward request to current backend.\n\n**Phase 2: Rotation**\n* Increment counter % N.\n\n**Verification**:\n* Spin up 2 servers returning \"A\" and \"B\". Hit LB. Should see A, B, A, B.`
  },
  {
    title: "Snake Game (Reinforcement Learning)",
    description: "AI/RL. Focuses on Q-Learning.",
    tags: ["AI", "Level 5", "Python", "PyGame", "Reinforcement Learning"],
    prompt: `**System Role**: You are an AI Researcher.\n**Objective**: Train an AI to play Snake using Q-Learning.\n\n**CRITICAL INSTRUCTIONS**:\n1.  **State**: Define state as [Danger Straight, Danger Right, Danger Left, Direction, Food Location].\n2.  **Reward**: +10 Food, -10 Death.\n\n**Phase 1: The Game**\n* Build Snake in PyGame (controlled by API).\n\n**Phase 2: The Agent**\n* Q-Table or Deep Q-Network (DQN).\n* Training Loop: Action -> Step -> Reward -> Update Q.\n\n**Verification**:\n* Watch the snake eventually learn to avoid walls and seek food.`
  }
];

// Append new templates
newTemplates.forEach((t, index) => {
  templates.push({
    id: (maxId + index + 1).toString(),
    title: t.title,
    description: t.description,
    tags: t.tags,
    prompt: t.prompt,
    author: "Santhosh Sachin",
    createdAt: new Date().toISOString()
  });
});

fs.writeFileSync(filePath, JSON.stringify(templates, null, 2));
console.log(`Successfully appended ${newTemplates.length} ELITE templates. Total: ${templates.length}`);
