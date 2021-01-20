import Web3 from 'web3'

// let prevSelectedAccount = null
export const getWeb3 = () => {
  // Modern dapp browsers
  if (window.ethereum) {
    return new Web3(window.ethereum) // eslint-disable-line
  }
  // Legacy dapp browsers
  else if (window.web3) {
    return new Web3(window.web3.currentProvider) // eslint-disable-line
  }
  return false
}

export const hasMetamask = () => {
  // Modern dapp browsers
  if (window.ethereum) {
    return window.ethereum.isMetaMask
  }
  // Legacy dapp browsers
  else if (window.web3) {
    return window.web3.currentProvider.isMetaMask
  }
  return false
}

export const getAccount = () =>
  new Promise(async (resolve, reject) => {
    // Modern dapp browsers
    if (window.ethereum) {
      try {
        // Request account access if needed}
        const accounts = await window.ethereum.enable()
        resolve(accounts ? accounts[0] : null) // eslint-disable-line
        // resolve(new Web3(window.ethereum)) // eslint-disable-line
      } catch (error) {
        // User denied access
        reject(error)
      }
    }
    // Legacy dapp browsers
    else if (window.web3) {
      const localWeb3 = getWeb3()
      setInterval(() => {
        const accounts = localWeb3.eth.accounts
        // if (prevSelectedAccount !== selectedAccount) {
        // prevSelectedAccount = selectedAccount
        resolve(accounts[0])
        // }
      }, 100)
      // resolve(new Web3(web3.currentProvider)) // eslint-disable-line
    }
    return resolve(null)
  })

export const setupWeb3 = cbk => {
  getAccount().then(cbk)
}

export const signMessage = async account => {
  const message = `Login in Santiment with address ${account}`
  const localWeb3 = getWeb3()
  const messageHash = localWeb3.sha3(
    '\x19Ethereum Signed Message:\n' + message.length + message
  )
  return new Promise((resolve, reject) => {
    localWeb3.personal.sign(
      localWeb3.fromUtf8(message),
      account,
      (error, signature) => {
        if (!error) {
          resolve({
            messageHash,
            signature
          })
        } else {
          reject(error)
        }
      }
    )
  })
}
