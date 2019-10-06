import path from "path";
import { fileURLToPath } from "url";

import tsconfig from "../tsconfig.json";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const { rootDir, outDir } = tsconfig.compilerOptions;

export const INPUT_DIR = path.resolve(__dirname, "..", rootDir);
export const OUTPUT_DIR = path.resolve(__dirname, "..", outDir);

export const BUNDLE_NAME = "bundle.js";
export const AUTO_REFRESH_MODULE = "autoRefresh.mjs";

export const PORT_NUMBER = 8080;