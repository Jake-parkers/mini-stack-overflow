import UserModel, { User } from "./usersSchema";

class UsersDAL {
    async getUsers() {
        return UserModel.find({});
    }

    async getUserById(id: string) {
        return UserModel.findOne({id})
    }

    async getUserByEmail(email: string) {
        try {
            const user = await UserModel.findOne({email});
            return !user ? null : await user.toObject();
        } catch (error) {
            throw error;
        }
    }

    async save(user: User) {
        const newUser = new UserModel(user);
        try {
            return await (await newUser.save()).toObject();
        } catch(error) {
            throw error;
        }
    }

    async findUsersByName(query: string, page: number, limit: number) {
        try {
            return await UserModel.find({
                displayName: { $regex: '(?i).*' + query + '.*' } 
            }).select("-password").limit(limit).skip((page - 1) * limit)
        } catch (error) {
            throw error;
        }
    }

    async totalUsersByName(query: string) {
        try {
            return await UserModel.find({
                displayName: { $regex: '(?i).*' + query + '.*' } 
            }).select("-password").countDocuments()
        } catch (error) {
            throw error;
        }
    }
}

export default new UsersDAL();