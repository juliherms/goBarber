import User from '../models/user';
import File from '../models/file';

class ProviderController {

    //list all users with provider equals true
    async index(req,res){
        const providers = await User.findAll({
            where: { provider: true },
            attributes: ['id','name','email','avatar_id'], //fields from return
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name','path','url'] //fields from select
                }
            ],
        });

        return res.json(providers);
    }
    
}

export default new ProviderController();