const useIPFS = (hash, filename) => {
  return `https://cf-ipfs.com/ipfs/${hash}?filename=${filename}`;
};

export default useIPFS;
