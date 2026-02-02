require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("dotenv").config();

// التحقق من المتغيرات البيئية الأساسية
if (process.env.REPORT_GAS === "true" && !process.env.COINMARKETCAP_API_KEY) {
  console.warn("⚠️  WARNING: COINMARKETCAP_API_KEY is not set for gas reporter");
}

if (!process.env.PRIVATE_KEY && process.env.NODE_ENV !== "test") {
  console.warn("⚠️  WARNING: PRIVATE_KEY is not set. Using default zero key.");
}

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "";
const SEPOLIA_ALCHEMY_RPC_URL = process.env.SEPOLIA_ALCHEMY_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: true,
          yulDetails: {
            stackAllocation: true,
            optimizerSteps: "dhfoDgvulfnTUtnIf"
          }
        }
      },
      viaIR: true,
      evmVersion: "paris",
    },
  },
  
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: MAINNET_RPC_URL,
        enabled: false,
        blockNumber: 19000000, // رقم بلوك محدد لضمان النتائج المتسقة
      },
      mining: {
        auto: true,
        interval: 5000, // مللي ثانية - مفيد للاختبار
      },
      allowUnlimitedContractSize: process.env.ALLOW_UNLIMITED_SIZE === "true",
    },
    
    sepolia: {
      url: SEPOLIA_ALCHEMY_RPC_URL || SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
      gasPrice: "auto",
      timeout: 60000, // زيادة المهلة للشبكات البطيئة
    },
    
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
      gasPrice: "auto",
      timeout: 60000,
    },
    
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1,
      blockConfirmations: 2, // يمكن تقليله للشبكة الرئيسية لتوفير الغاز
      gasPrice: "auto",
      timeout: 120000,
    },
    
    // إضافة شبكات اختبار إضافية
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      timeout: 120000,
    },
  },
  
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      polygon: ETHERSCAN_API_KEY, // إذا كنت ستستخدم Polygon
      polygonMumbai: ETHERSCAN_API_KEY,
      arbitrumOne: ETHERSCAN_API_KEY,
      arbitrumSepolia: ETHERSCAN_API_KEY,
      base: ETHERSCAN_API_KEY,
      baseSepolia: ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  },
  
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    outputFile: "gas-report.txt",
    noColors: true,
    token: "ETH",
    gasPrice: 50, // سعر الغاز الافتراضي للتقرير
    excludeContracts: ["mocks/", "test/"], // استبعاد العقود التجريبية
    src: "./contracts", // مجلد العقود الرئيسي فقط
  },
  
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: process.env.RUN_CONTRACT_SIZER === "true", // التحكم بالميزة
    strict: true,
    only: [":ERC20$", ":ERC721$", ":ERC1155$"], // تضييق النطاق إذا لزم الأمر
    except: ["mock", "test", "Mock"], // استبعاد العقود التجريبية
  },
  
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  
  mocha: {
    timeout: 200000,
    color: true,
    bail: process.env.MOCHA_BAIL === "true", // إيقاف عند أول فشل
    parallel: process.env.MOCHA_PARALLEL === "true", // تشغيل متوازي
  },
  
  // إضافة لتحسين الأداء
  watcher: {
    compilation: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    },
    test: {
      tasks: [{ command: "test", params: { testFiles: ["{path}"] } }],
      files: ["./test/**/*"],
      verbose: true,
    },
  },
};