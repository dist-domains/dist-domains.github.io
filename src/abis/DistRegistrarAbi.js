export const distRegistrarAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "domain",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "CreateURI",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tldContract",
          "type": "address"
        }
      ],
      "name": "setTldContact",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "domainContract",
          "type": "address"
        }
      ],
      "name": "setDomainContact",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "isRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "registered",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "domainHash",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "tld",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "ref",
          "type": "address"
        }
      ],
      "name": "commitDomain",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "domainHash",
          "type": "uint256"
        }
      ],
      "name": "abandonDomain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "sld",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tld",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "useSafeMint",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "ref",
          "type": "address"
        }
      ],
      "name": "mintDomain",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "sld",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tld",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "useSafeMint",
          "type": "bool"
        }
      ],
      "name": "revealDomain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "label",
          "type": "string"
        }
      ],
      "name": "mintSubdomain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "domain",
          "type": "string"
        }
      ],
      "name": "getSubdomains",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "subdomainLabels",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];