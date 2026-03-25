const crypto = require("crypto");
const fs = require("fs");

// 生成 Ed25519 密钥对
const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519", {
  privateKeyEncoding: { format: "pem", type: "pkcs8" },
  publicKeyEncoding: { format: "pem", type: "spki" },
});

// 保存到文件
fs.writeFileSync("ed25519-private.pem", privateKey);
fs.writeFileSync("ed25519-public.pem", publicKey);

console.log("✅ 密钥对已生成：ed25519-private.pem 和 ed25519-public.pem");
