import User from '../models/user';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

/**
 * Class responsible to authentication.
 */
class SessionController {

    async store(req,res){

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        });


/*      Juliherms -- VERIFICAR 
         if(!(await schema.isValid(red.body))){
            return res.status(400).json({ error : 'Validation fails' });
        }*/


        const { email, password } = req.body;

        //verify user by email
        const user = await User.findOne({ where : { email } });

        if(!user){
            return res.status(401).json({ error: 'User not found' });
        }

        if(!await user.checkPassword(password)){
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name } = user;

        return res.json({
            user : {
                id,
                name,
                email
            },
            token: jwt.sign({ id },
                            authConfig.secret,
                            {
                                expiresIn: authConfig.expiresIn,
                            }),
        })
    }
}

export default new SessionController();