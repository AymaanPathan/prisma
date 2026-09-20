import { prisma } from "../lib/prisma.js";
// Add Account

export const addAccountController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { accountName, balance } = req.body;

    if (!userId) {
      return res.status(404).json({
        status: 404,
        message: "No user found to add account",
      });
    }

    if (!accountName || !balance) {
      return res.status(400).json({
        status: 400,
        message: "Account Name or Balance Not provided",
      });
    }

    const newAccount = await prisma.account.create({
      data: {
        userId: userId,
        accountName: accountName,
        balance: Number(balance),
      },
    });

    return res.status(201).json({
      status: 201,
      newAccount,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while creating account",
      error,
    });
  }
};


// Get Accounts Info for specific user
export const getUserAccounts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const accounts = await prisma.account.findMany({
      where: {
        userId: userId,
      },
      select: {
        accountName: true,
        balance: true,
        user: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
    });

    if (accounts.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "No account found for this user",
      });
    }

    return res.status(200).json({
      status: 200,
      accounts,
      message: "Account fetched successfully",
    });
  } catch (error) {
    console.log("Internal Server Error while getting user accounts", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server error while getting user accounts",
      error,
    });
  }
};

// Rename Account
export const renameAccount = async (req, res) => {
  const userId = req.user.userId;
  const { accountId, newAccountName } = req.body;

  try {
    const updatedAccount = await prisma.account.updateMany({
      where: {
        userId: userId,
        id: accountId,
      },
      data: {
        accountName: newAccountName,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Account Updated successfully",
      updatedAccount,
    });
  } catch (error) {
    console.log("Internal Server Error while Renaming account", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: 404,
        message: "No Account Found with this account id",
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Internal Server error while Renaming account",
      error,
    });
  }
};

// Delete Account
export const deleteAccount = async (req, res) => {
  const userId = req.user.userId;
  const accountId = req.params.accountId;
  try {
    const account = await prisma.account.deleteMany({
      where: {
        userId: userId,
        id: accountId,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Account Deleted Successfully",
      deletedAccount: account,
    });
  } catch (error) {
    console.log("Internal Server Error while Deleting account", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: 404,
        message: "No Account Found with this account id",
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Internal Server error while Deleting account",
      error,
    });
  }
};
