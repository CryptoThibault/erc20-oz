const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token', async function () {
  let owner, Token, token;
  const NAME = 'Token';
  const SYMBOL = 'TKN';
  const INITIAL_SUPPLY = ethers.utils.parseEther('1000000');
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Token = await ethers.getContractFactory('Token');
    token = await Token.connect(owner).deploy(INITIAL_SUPPLY);
    await token.deployed();
  });

  it(`Should have name ${NAME}`, async function () {
    expect(await token.name()).to.equal(NAME);
  });
  it(`Should have symbol ${SYMBOL}`, async function () {
    expect(await token.symbol()).to.equal(SYMBOL);
  });
  it(`Should have total supply ${INITIAL_SUPPLY.toString()}`, async function () {
    expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
  });
  it(`Should mint initial supply ${INITIAL_SUPPLY.toString()} to owner`, async function () {
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
  });
});
