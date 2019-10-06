import jsdom from "jsdom";

import { BUNDLE_NAME, AUTO_REFRESH_MODULE } from "./dev-config.mjs";
import getRuntimeScripts from "./getRuntimeScripts.mjs";

export default indexFile =>
  Promise.all([jsdom.JSDOM.fromFile(indexFile), getRuntimeScripts()]).then(
    ([dom, runTimeScripts]) => {
      const { window } = dom;
      const { document } = window;

      const script = document.createElement("script");
      script.textContent = `process={env:${JSON.stringify(process.env)}}`;
      document.head.append(script);

      document.head.append(
        ...[BUNDLE_NAME, AUTO_REFRESH_MODULE]
          .map(name => `./${name}`)
          .concat(runTimeScripts.map(([url]) => url))
          .map(relativePath => {
            const scriptTag = document.createElement("script");
            scriptTag.type = "module";
            scriptTag.src = relativePath;
            return scriptTag;
          })
      );
      return dom.serialize();
    }
  );