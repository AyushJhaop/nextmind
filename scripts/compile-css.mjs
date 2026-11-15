import fs from "fs";
import path from "path";
import { compile, optimize } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";

const rootDir = process.cwd();
const inputPath = path.join(rootDir, "src/app/tailwind-source.css");
const outputPath = path.join(rootDir, "src/app/globals.css");

async function buildCss() {
  const sourceCss = fs.readFileSync(inputPath, "utf8");
  const compiler = await compile(sourceCss, {
    from: inputPath,
    base: path.dirname(inputPath),
    shouldRewriteUrls: true,
    onDependency: () => {},
  });

  const sources = [
    { base: path.join(rootDir, "src"), pattern: "**/*", negated: false },
  ];
  const scanner = new Scanner({ sources });
  const candidates = scanner.scan();

  const rawCss = compiler.build(candidates);
  const optimized = optimize(rawCss, { minify: false }).code;
  fs.writeFileSync(outputPath, optimized, "utf8");
  console.log(
    `Compiled Tailwind v4 CSS (${candidates.length} candidates) -> src/app/globals.css`
  );
}

buildCss().catch((err) => {
  console.error("Failed to compile CSS:", err);
  process.exit(1);
});
