import { prisma } from "../lib/prisma.js";

// Transfer funds from one account to another
export const transferFundsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fromAccountId, toAccountId, amount } = req.body;

    const transferFundsRes = await prisma.$transaction(async (tx) => {
      // 1 get sender account
      const senderAcc = await tx.account.findFirst({
        where: {
          id: fromAccountId,
          userId: userId,
        },
      });

      if (!senderAcc) {
        throw new Error("No Sender Acc Found of this user");
      }
      // 2 get receiver account
      const receiverAcc = await tx.account.findFirst({
        where: {
          id: toAccountId,
        },
      });
      if (!receiverAcc) {
        throw new Error("No Receiver Acc Found");
      }
      if (senderAcc.balance < amount) {
        throw new Error("Insufficient balance");
      }
      // 3  Debit money from sender account
      await tx.account.update({
        where: {
          id: fromAccountId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });
      // 4 credit money from receiver account
      await tx.account.update({
        where: {
          id: toAccountId,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });
      return {
        fromAccountId,
        toAccountId,
        amount,
      };
    });
    return res.status(200).json({
      status: 200,
      message: "fund transfered successfully",
      transferFundsRes,
    });
  } catch (error) {
    console.log("Internal server error while transfering funds", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
