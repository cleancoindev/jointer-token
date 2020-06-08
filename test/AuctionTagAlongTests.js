//It is still not done. will update soon
const {
  constants,
  expectEvent,
  expectRevert,
  BN,
} = require("@openzeppelin/test-helpers");
const {ZERO_ADDRESS} = constants;

const {expect} = require("chai");

const AuctionTagAlong = artifacts.require("AuctionTagAlong");
const AuctionRegisty = artifacts.require("TestAuctionRegistery");
const ERC20 = artifacts.require("TestERC20");

contract("~auction tag Along works", function (accounts) {
  const [
    other1,
    primaryOwner,
    systemAddress,
    multiSigPlaceHolder,
    liquidityPlaceHolder,
    contributer1,
  ] = accounts;
  beforeEach(async function () {
    //contract that has address of all the contracts
    this.auctionRegistery = await AuctionRegisty.new(
      systemAddress,
      multiSigPlaceHolder,
      {from: primaryOwner}
    );
    await this.auctionRegistery.registerContractAddress(
      web3.utils.fromAscii("LIQUADITY"),
      liquidityPlaceHolder,
      {from: primaryOwner}
    );
    this.tagAlong = await AuctionTagAlong.new(
      systemAddress,
      multiSigPlaceHolder,
      this.auctionRegistery.address,
      {from: primaryOwner}
    );
    this.erc20 = await ERC20.new({from: other1});
  });
  it("should initialize correctly", async function () {
    expect(await this.tagAlong.systemAddress()).to.equal(systemAddress);
    expect(await this.tagAlong.primaryOwner()).to.equal(primaryOwner);
    expect(await this.tagAlong.authorityAddress()).to.equal(
      multiSigPlaceHolder
    );
    expect(await this.tagAlong.contractsRegistry()).to.equal(
      this.auctionRegistery.address
    );
    expect(await this.tagAlong.liquadityAddress()).to.equal(
      liquidityPlaceHolder
    );
    expect(await this.tagAlong.liquadityRatio()).to.be.bignumber.equal("100");
    expect(await this.tagAlong.contributionRatio()).to.be.bignumber.equal(
      "100"
    );
  });
  describe("All the functions", async function () {
    //maybe first test the depositToken and then other functions
    it("should deposite token correctly", async function () {});
    it("contribute Toward Liquadity should work", async function () {
      //this function is incomplete
      let initialBalance = new BN(1000000);
      await this.tagAlong.sendTransaction({
        from: other1,
        value: initialBalance,
      });
      let amount = new BN(1000);
      await expectRevert(
        this.tagAlong.contributeTowardLiquadity(amount, {from: other1}),
        "ERR_ONLY_LIQUADITY_ALLWOED"
      );

      await this.tagAlong.contributeTowardLiquadity(amount, {
        from: liquidityPlaceHolder,
      });

      expect(
        await web3.eth.getBalance(this.tagAlong.address)
      ).to.be.bignumber.equal(initialBalance.sub(amount));
    });
    it("should tranfer token liquidity", async function () {
      let initialBalance = new BN("1000000");
    });
    it("should return funds correctly", async function () {});
  });
});
