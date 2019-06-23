<template>
  <section class="container">
    <div>
      <h1>Get symbol</h1>
      <p>symbol={{ symbol }}</p>
      <button @click="addCount">Count up</button>
      <button @click="getSymbol">Count up</button>
    </div>
  </section>
</template>

<script>
import Web3 from 'web3'

const account = '0xcee700fc6424742185d1f98e242a339d04968a80'
const contractConst = {
  address: '0x6c2385a84ad8f51267a983f0d7b7af19c3941c5a',
  abi: [
    {
      constant: false,
      inputs: [
        {
          name: '_to',
          type: 'address'
        },
        {
          name: '_tokenId',
          type: 'uint256'
        }
      ],
      name: 'approve',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_name',
          type: 'string'
        },
        {
          name: '_privilege',
          type: 'string'
        },
        {
          name: '_method',
          type: 'uint8'
        },
        {
          name: '_fee',
          type: 'uint256'
        }
      ],
      name: 'createBadge',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_badgeId',
          type: 'uint256'
        }
      ],
      name: 'payment',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'tokenId',
          type: 'uint256'
        },
        {
          name: '_data',
          type: 'bytes'
        }
      ],
      name: 'safeTransferFrom',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'approved',
          type: 'bool'
        }
      ],
      name: 'setApprovalForAll',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_tokenId',
          type: 'uint256'
        }
      ],
      name: 'takeOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_to',
          type: 'address'
        },
        {
          name: '_tokenId',
          type: 'uint256'
        }
      ],
      name: 'transfer',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: '_from',
          type: 'address'
        },
        {
          name: '_to',
          type: 'address'
        },
        {
          name: '_tokenId',
          type: 'uint256'
        }
      ],
      name: 'transferBySuperUser',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'to',
          type: 'address'
        },
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'transferFrom',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'withdraw',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'badgeId',
          type: 'uint256'
        },
        {
          indexed: false,
          name: 'name',
          type: 'string'
        },
        {
          indexed: false,
          name: 'creater',
          type: 'address'
        }
      ],
      name: 'NewBadge',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 'balance',
          type: 'uint256'
        }
      ],
      name: 'Withdraw',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'previousOwner',
          type: 'address'
        },
        {
          indexed: true,
          name: 'newOwner',
          type: 'address'
        }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'from',
          type: 'address'
        },
        {
          indexed: true,
          name: 'to',
          type: 'address'
        },
        {
          indexed: true,
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          name: 'approved',
          type: 'address'
        },
        {
          indexed: true,
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address'
        },
        {
          indexed: true,
          name: 'operator',
          type: 'address'
        },
        {
          indexed: false,
          name: 'approved',
          type: 'bool'
        }
      ],
      name: 'ApprovalForAll',
      type: 'event'
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      name: 'badges',
      outputs: [
        {
          name: 'name',
          type: 'string'
        },
        {
          name: 'privilege',
          type: 'string'
        },
        {
          name: 'creater',
          type: 'address'
        },
        {
          name: 'paymentMethod',
          type: 'uint8'
        },
        {
          name: 'fee',
          type: 'uint256'
        },
        {
          name: 'previousPayment',
          type: 'uint32'
        },
        {
          name: 'nextPayment',
          type: 'uint32'
        },
        {
          name: 'isDeleted',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      name: 'badgeToOwner',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'balanceOf',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'getApproved',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address'
        },
        {
          name: 'operator',
          type: 'address'
        }
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'ownerOf',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'interfaceId',
          type: 'bytes4'
        }
      ],
      name: 'supportsInterface',
      outputs: [
        {
          name: '',
          type: 'bool'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'index',
          type: 'uint256'
        }
      ],
      name: 'tokenByIndex',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'owner',
          type: 'address'
        },
        {
          name: 'index',
          type: 'uint256'
        }
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        {
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'tokenURI',
      outputs: [
        {
          name: '',
          type: 'string'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          name: '',
          type: 'uint256'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ]
}

export default {
  data() {
    return {
      symbol: ''
    }
  },
  methods: {
    async getSymbol(e) {
      if (window.web3) {
        const web3js = new Web3(window.web3.currentProvider)
        const contract = new web3js.eth.Contract(
          contractConst.abi,
          contractConst.address
        )
        // web3呼び出し
        this.symbol = await contract.methods.symbol().call({
          from: account
        })
      }
    }
  }
}
</script>
