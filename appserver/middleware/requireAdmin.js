import { clerkClient, getAuth } from "@clerk/express";

const requireAdmin = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
        }

        const user  = await clerkClient.users.getUser(userId);
        const role = user.publicMetadata?.role;


        if (role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        next();

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to verify admin status',
            error: err.message,
        });
    }
};

export default requireAdmin;