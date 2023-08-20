import path from "path";

export function getOutputFilePath(
  inputFilePath: string,
  extension: string
): string {
  return path.join(
    path.dirname(inputFilePath),
    path.basename(inputFilePath, path.extname(inputFilePath)) + extension
  );
}
